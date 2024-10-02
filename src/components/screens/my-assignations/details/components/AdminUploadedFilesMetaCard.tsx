import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { DownloadFileButton } from "@/components/core/DownloadFileButton";
import {
  AssignationFileRejectModal,
  RejectModalHandle,
} from "@/components/screens/assignation/forms/AssignationFileRejectModal";
import { useAdminAssignationFilesMutation } from "@/components/screens/assignation/queries";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import { CHECKLIST_ITEM_EVENT, ChecklistItem, UploadedFile } from "../../types";
import { bytesToSize } from "../lib";

dayjs.locale("es");

type AdminUploadedFilesMetaCardProps = {
  assignationId: number;
  item: ChecklistItem;
};

export const AdminUploadedFilesMetaCard = (props: AdminUploadedFilesMetaCardProps) => {
  const modalRef = useRef<RejectModalHandle>(null);

  const { acceptFileMutation: {mutateAsync, isPending} } = useAdminAssignationFilesMutation(props.assignationId);

  const pendingFiles = props.item.uploadedFiles.filter((item) => item.status.event === CHECKLIST_ITEM_EVENT.USER_UPLOADED_FILE);
  const acceptedFiles = props.item.uploadedFiles.filter((item) => item.status.event === CHECKLIST_ITEM_EVENT.ADMIN_ACCEPTED_FILE);
  const rejectedFiles = props.item.uploadedFiles.filter((item) => item.status.event === CHECKLIST_ITEM_EVENT.ADMIN_REJECTED_FILE);
  const deletedFiles = props.item.uploadedFiles.filter((item) => item.status.event === CHECKLIST_ITEM_EVENT.USER_REMOVED_FILE);

  const handleAccept = async (file: UploadedFile) => {
    await mutateAsync(file.id);
  };

  const handleRemove = async (file: UploadedFile) => {
    modalRef.current?.open({
      fileName: file.upload.name,
      checklistName: props.item.title,
      uploadedAssignationFileId: file.id,
      assignationId: props.assignationId,
    });
  };

  return (
    <div className="flex flex-col gap-2 pt-5 relative">
      <AbsoluteCenteredLoader isLoading={isPending} />
      <AssignationFileRejectModal ref={modalRef} />

      {pendingFiles && pendingFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos pendientes</h5>

          {pendingFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 overflow-hidden">
              <DownloadFileButton file={{
                mimetype: file.upload.mimeType,
                name: file.upload.name,
                slug: file.upload.slug
              }} />
              <p>{bytesToSize(file.upload.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.upload.createdAt).format("dddd DD/MM/YYYY")}
              </p>

              <Popconfirm
                title="¿Aceptar archivo?"
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

      {acceptedFiles && acceptedFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos aceptados</h5>

          {acceptedFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 bg-green-500 bg-opacity-30">
              <DownloadFileButton file={{
                mimetype: file.upload.mimeType,
                name: file.upload.name,
                slug: file.upload.slug,
              }} />
              <p>{bytesToSize(file.upload.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.upload.createdAt).format("dddd DD/MM/YYYY")}
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

      {rejectedFiles && rejectedFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos Rechazados</h5>
          {rejectedFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 bg-red-500 bg-opacity-20">
              <a href={file.upload.url} target="_blank" className="text-blue-500">
                <strong>{file.upload.name} </strong>(<i>{file.upload.mimeType}</i>)
              </a>
              <p>{bytesToSize(file.upload.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.upload.createdAt).format("dddd DD/MM/YYYY")}
              </p>
            </div>
          ))}
        </>
      )}

      {deletedFiles && deletedFiles.length > 0 && (
        <>
          <h5 className="text-lg font-bold">Archivos Borrados</h5>
          {deletedFiles.map((file) => (
            <div className="border border-gray-300 border-dashed p-1 relative py-3 bg-slate-500 bg-opacity-20">
              <a href={file.upload.url} target="_blank" className="text-blue-500">
                <strong>{file.upload.name} </strong>(<i>{file.upload.mimeType}</i>)
              </a>
              <p>{bytesToSize(file.upload.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.upload.createdAt).format("dddd DD/MM/YYYY")}
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
