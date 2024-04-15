import { FileUploadedResponse } from "@/@types/api/assignation";
import { ParsedChecklistItem } from "@/@types/common";
import { buildAssignationDetailsQueryOptions } from "@/components/screens/assignation/queries";
import { fileUploadRequestWithToken } from "@/lib/files/file-upload";
import { buildAssignationFileValidation } from "@/lib/files/validations";
import { CheckCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Upload, UploadFile } from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import React from "react";

type UploadSectionProps = {
  assignationId: number;
  item: ParsedChecklistItem;
  onSubmit: (serverResponses: FileUploadedResponse[], checklistItemId: number) => void;
};

export const UploadSection = (props: UploadSectionProps) => {
  const [filesUploaded, setFilesUploaded] = React.useState(0);
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [serverResponses, setServerResponses] = React.useState<FileUploadedResponse[]>([]);
  const { data: assignation } = useQuery(buildAssignationDetailsQueryOptions(props.assignationId));

  const handleFileChange = React.useCallback(
    (file: UploadChangeParam<UploadFile<unknown>>) => {
      setFileList(file.fileList);
      console.log("file.file.status", file.file.status);
      if (file.file.status == "done") {
        console.log("filesUploaded + file.fileList.length", filesUploaded + file.fileList.length);
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
      maxSizeInBytes: props.item.maxSizeInBytes,
      allowedMimeTypes: props.item.allowedMimeTypes,
      maxFiles: props.item.maxFiles,
    };
    const validation = buildAssignationFileValidation(validationRules, assignation, props.item);

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

  return (
    <div className="">
      <div className="mt-5 flex justify-center">
        {uploadEnabled && (
          <>
            <Upload
              className="w-full mx-auto"
              action="http://localhost:3002/files/upload"
              listType="picture"
              maxCount={(props.item.maxFiles ?? 1) - (props.item.uploadedFiles?.length ?? 0) ?? 1}
              onChange={handleFileChange}
              onRemove={handleFileRemove}
              accept={props.item.allowedMimeTypes?.join(",") ?? "*/*"}
              beforeUpload={beforeUpload}
              fileList={fileList}
              // @ts-expect-error TODO: fix this
              customRequest={fileUploadRequestWithToken}
            >
              <Button icon={<UploadOutlined />} disabled={!uploadsLimitReached}>
                Upload (Max: {(props.item.maxFiles ?? 1) - (props.item.uploadedFiles?.length ?? 0)})
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
