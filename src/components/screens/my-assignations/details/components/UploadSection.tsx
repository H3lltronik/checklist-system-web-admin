import { FileUploadedResponse } from "@/@types/api/assignation";
import { SizeSuffix } from "@/@types/sizes";
import { fileUploadRequestWithToken } from "@/lib/files/file-upload";
import { buildAssignationFileValidation } from "@/lib/files/validations";
import { CheckCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Upload, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import React from "react";
import { buildEnterpriseAssignationDetailsQueryOptions } from "../../data/queries";
import { CHECKLIST_ITEM_EVENT, ChecklistItem } from "../../types";

type UploadSectionProps = {
  assignationId: number;
  item: ChecklistItem;
  onSubmit: (serverResponses: FileUploadedResponse[], checklistItemId: number) => void;
};

export const UploadSection = (props: UploadSectionProps) => {
  const [filesUploaded, setFilesUploaded] = React.useState(0);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [serverResponses, setServerResponses] = React.useState<FileUploadedResponse[]>([]);
  const { data: assignation } = useQuery(
    buildEnterpriseAssignationDetailsQueryOptions(props.assignationId),
  );

  const handleFileChange = React.useCallback(
    (file: UploadChangeParam<UploadFile<unknown>>) => {
      setFileList(file.fileList);
      if (file.file.status == "done") {
        setFilesUploaded(filesUploaded + file.fileList.length);
        setServerResponses([...serverResponses, file.file.response as FileUploadedResponse]);
      }
    },
    [filesUploaded, serverResponses],
  );

  const handleFileRemove = React.useCallback(
    (file: UploadFile) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
      setFilesUploaded(filesUploaded - 1);
    },
    [filesUploaded],
  );

  const handleSubmit = React.useCallback(() => {
    setFileList([]);
    props.onSubmit(serverResponses, props.item.id);
  }, [props, serverResponses]);

  const beforeUpload = (file: RcFile) => {
    if (!assignation) {
      console.error("[UploadSection] assignation not found");
      return false;
    }

    const validationRules = {
      maxSize: props.item.maxSize,
      sizeSuffix: props.item.sizeSuffix as SizeSuffix,
      allowedMimeTypes: props.item.allowedMimeTypes,
      maxFiles: props.item.maxFiles,
    };

    const fileLength = assignation.checklistItems.reduce(
      (acc, item) => acc + (item.uploadedFiles.length ?? 0),
      0,
    );
    const validation = buildAssignationFileValidation(validationRules, fileLength);

    return validation(file);
  };

  if (props.item.uploadedFiles?.length == (props.item.maxFiles ?? 1)) {
    return (
      <div className="flex justify-center mt-5">
        <CheckCircleOutlined className="text-green-500 text-xl" />
      </div>
    );
  }

  const uploadsLimitReached =
    (props.item.uploadedFiles?.length ?? 0) + filesUploaded <= (props.item.maxFiles ?? 0);
  const uploadEnabled = (props.item.uploadedFiles?.length ?? 0) <= (props.item.maxFiles ?? 0);

  const nonDeletedUploadedFiles = props.item.uploadedFiles?.filter(
    (item) =>
      item.status.event !== CHECKLIST_ITEM_EVENT.USER_REMOVED_FILE &&
      item.status.event !== CHECKLIST_ITEM_EVENT.ADMIN_REMOVED_FILE,
  );

  const maxFiles = props.item.maxFiles ?? 0;
  const filesRemaining = maxFiles - (nonDeletedUploadedFiles?.length ?? 0);

  return (
    <div className="">
      <div className="mt-5 flex justify-center">
        {uploadEnabled && (
          <>
            <Upload
              className="w-full mx-auto"
              action="/api/files/upload"
              listType="picture"
              maxCount={filesRemaining}
              onChange={handleFileChange}
              onRemove={handleFileRemove}
              accept={props.item.allowedMimeTypes?.join(",") ?? "*/*"}
              beforeUpload={beforeUpload}
              fileList={fileList}
              // @ts-expect-error TODO: fix this
              customRequest={fileUploadRequestWithToken}
            >
              <Button icon={<UploadOutlined />} disabled={!uploadsLimitReached}>
                Upload (Max: {filesRemaining})
              </Button>
            </Upload>
          </>
        )}
      </div>
      {filesUploaded > 0 && (
        <Button className="mt-5" type="primary" onClick={handleSubmit}>
          Guardar cambios
        </Button>
      )}
    </div>
  );
};
