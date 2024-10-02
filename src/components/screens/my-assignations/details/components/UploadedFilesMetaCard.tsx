import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { DownloadFileButton } from "@/components/core/DownloadFileButton";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useRemoveFileToAssignationMutation } from "../../data/queries";
import { CHECKLIST_ITEM_EVENT, ChecklistItem, UploadedFile } from "../../types";
import { bytesToSize } from "../lib";

dayjs.locale("es");

type UploadedFilesMetaCardProps = {
  assignationId: number;
  item: ChecklistItem;
};

export enum ChecklistFileStatus {
  ACCEPTED = 1,
  REJECTED = 2,
}

export const UploadedFilesMetaCard = (props: UploadedFilesMetaCardProps) => {
  const { mutateAsync, isPending } = useRemoveFileToAssignationMutation(props.assignationId);

  const handleRemove = async (uploadedFile: UploadedFile) => {
    mutateAsync({ assignationUploadedFileId: uploadedFile.id });
  };

  const fileAccepted = (file: UploadedFile) =>
    file.status.event === CHECKLIST_ITEM_EVENT.ADMIN_ACCEPTED_FILE;

  const fileRejected = (file: UploadedFile) =>
    file.status.event === CHECKLIST_ITEM_EVENT.ADMIN_REJECTED_FILE;

  const nonDeletedFiles = props.item?.uploadedFiles?.filter(
    (item) =>
      item.status.event !== CHECKLIST_ITEM_EVENT.USER_REMOVED_FILE &&
      item.status.event !== CHECKLIST_ITEM_EVENT.ADMIN_REMOVED_FILE,
  );

  return (
    <>
      {nonDeletedFiles && (
        <div className="mt-5 flex flex-col gap-2 relative">
          <AbsoluteCenteredLoader isLoading={isPending} />

          {nonDeletedFiles.map((file) => (
            <div
              className={`border border-gray-300 border-dashed p-1 relative overflow-hidden ${fileRejected(file) && "bg-red-500 bg-opacity-20 border-yellow-500"}
               ${fileAccepted(file) && "bg-green-500 bg-opacity-10 border-green-500"}`}
            >
              <DownloadFileButton
                file={{
                  mimetype: file.upload.mimeType,
                  name: file.upload.name,
                  slug: file.upload.slug,
                }}
              />
              <p>{bytesToSize(file.upload.size)}</p>
              <p className="capitalize">
                Subido: {dayjs(file.upload.createdAt).format("dddd DD/MM/YYYY")}
              </p>

              {file.comment && fileRejected(file) && (
                <>
                  <p className="capitalize mt-5 text-lg font-bold">Comentario: {file.comment}</p>
                  <p className="mt-2">
                    <i>
                      Atiende los comentario, elimina el archivo y vuelve a subir uno nuevo con los
                      cambios solicitados, por favor
                    </i>
                  </p>
                </>
              )}

              {!fileAccepted(file) && (
                <Popconfirm
                  title="Borrar archivo?"
                  description="¿Estas seguro de borrar este archivo?"
                  onConfirm={() => handleRemove(file)}
                  onCancel={() => { }}
                  okText="Si"
                  cancelText="No"
                >
                  <Button className="absolute top-2 right-2" icon={<DeleteOutlined />} danger />
                </Popconfirm>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
