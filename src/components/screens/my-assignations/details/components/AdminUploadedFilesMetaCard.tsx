import { AssignationUploadedFile } from "@/@types/api/entities";
import { ParsedChecklistItem } from "@/@types/common";
import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { DownloadFileButton } from "@/components/core/DownloadFileButton";
import {
  AssignationFileRejectModal,
  RejectModalHandle,
} from "@/components/screens/assignation/forms/AssignationFileRejectModal";
import { useUpdateAssignationFileStatusMutation } from "@/components/screens/assignation/queries";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import { bytesToSize } from "../lib";
import { ChecklistFileStatus } from "./UploadedFilesMetaCard";

dayjs.locale("es");

type AdminUploadedFilesMetaCardProps = {
  assignationId: number;
  item: ParsedChecklistItem;
};

export const AdminUploadedFilesMetaCard = (props: AdminUploadedFilesMetaCardProps) => {
  const modalRef = useRef<RejectModalHandle>(null);

  const { mutateAsync, isPending } = useUpdateAssignationFileStatusMutation(props.assignationId);

  const handleAccept = async (file: AssignationUploadedFile) => {
    await mutateAsync({
      data: {
        assignationUploadedFileStatusId: ChecklistFileStatus.ACCEPTED,
        comment: "Archivo aceptado por el administrador",
      },
      id: file.id,
    });
  };

  const handleRemove = async (file: AssignationUploadedFile) => {
    modalRef.current?.open({
      fileName: file.uploadedFile.name,
      checklistName: props.item.title,
      uploadedAssignationFileId: file.id,
      assignationId: props.assignationId,
    });
  };

  return (
    <div className="flex flex-col gap-2 pt-5 relative">
      <AbsoluteCenteredLoader isLoading={isPending} />
      <AssignationFileRejectModal ref={modalRef} />

      {props.item.pendingFiles && props.item.pendingFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos pendientes</h5>

          {props.item.pendingFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 overflow-hidden">
              <DownloadFileButton file={file.uploadedFile} />
              <p>{bytesToSize(file.uploadedFile.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.uploadedFile.createdAt).format("dddd DD/MM/YYYY")}
              </p>

              <Popconfirm
                title="Aceptar archivo?"
                description="¿Estas seguro de aceptar este archivo?"
                icon={<CheckOutlined className="!text-green-500" />}
                onConfirm={() => handleAccept(file)}
                onCancel={() => {}}
                okText="Si"
                cancelText="No"
              >
                <Button
                  className="absolute top-2 right-2 bg-green-500 text-white"
                  icon={<CheckOutlined />}
                />
              </Popconfirm>

              <Popconfirm
                title="Rechazar archivo?"
                description="¿Estas seguro de rechazar este archivo?"
                onConfirm={() => handleRemove(file)}
                onCancel={() => {}}
                okText="Si"
                cancelText="No"
              >
                <Button className="absolute bottom-2 right-2" icon={<CloseOutlined />} danger />
              </Popconfirm>
            </div>
          ))}
        </>
      )}

      {props.item.acceptedFiles && props.item.acceptedFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos aceptados</h5>

          {props.item.acceptedFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 bg-green-500 bg-opacity-30">
              <DownloadFileButton file={file.uploadedFile} />
              <p>{bytesToSize(file.uploadedFile.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.uploadedFile.createdAt).format("dddd DD/MM/YYYY")}
              </p>

              <Popconfirm
                title="Rechazar archivo?"
                description="¿Estas seguro de rechazar este archivo?"
                onConfirm={() => handleRemove(file)}
                onCancel={() => {}}
                okText="Si"
                cancelText="No"
              >
                <Button className="absolute bottom-2 right-2" icon={<CloseOutlined />} danger />
              </Popconfirm>
            </div>
          ))}
        </>
      )}

      {props.item.rejectedFiles && props.item.rejectedFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos Rechazados</h5>
          {props.item.rejectedFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 bg-red-500 bg-opacity-20">
              <a href={file.uploadedFile.url} target="_blank" className="text-blue-500">
                <strong>{file.uploadedFile.name} </strong>(<i>{file.uploadedFile.mimetype}</i>)
              </a>
              <p>{bytesToSize(file.uploadedFile.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.uploadedFile.createdAt).format("dddd DD/MM/YYYY")}
              </p>
            </div>
          ))}
        </>
      )}

      {props.item.deletedFiles && props.item.deletedFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos Borrados</h5>
          {props.item.deletedFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 bg-slate-500 bg-opacity-20">
              <a href={file.uploadedFile.url} target="_blank" className="text-blue-500">
                <strong>{file.uploadedFile.name} </strong>(<i>{file.uploadedFile.mimetype}</i>)
              </a>
              <p>{bytesToSize(file.uploadedFile.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.uploadedFile.createdAt).format("dddd DD/MM/YYYY")}
              </p>
              <p className="capitalize">
                Borrado: {dayjs(file.deletedAt).format("dddd DD/MM/YYYY HH:mm A")}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
