import { FileUploadedResponse } from "@/@types/api/assignation";
import { ParsedChecklistItem } from "@/@types/common";
import { AbsoluteCenteredLoader } from "@/components/core/AbsoluteCenteredLoader";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Card, Progress } from "antd";
import { useAddFilesToAssignationMutation } from "../data/queries";
import { DescriptionMetaCard } from "./components/DescriptionMetaCard";
import { FormatsMetaCard } from "./components/FormatsMetaCard";
import { MaxFilesMetaCard } from "./components/MaxFilesMetaCard";
import { MaxSizeMetaCard } from "./components/MaxSizeMetaCard";
import { UploadedFilesMetaCard } from "./components/UploadedFilesMetaCard";
import { UploadSection } from "./components/UploadSection";

type ChecklistItemDetailsProps = {
  assignationId: number;
} & ParsedChecklistItem;

export const ChecklistItemDetails = (props: ChecklistItemDetailsProps) => {
  const { mutateAsync, isPending } = useAddFilesToAssignationMutation(props.assignationId);

  const onSaveChanges = async (
    serverResponses: FileUploadedResponse[],
    checklistItemId: number,
  ) => {
    await mutateAsync({
      files: serverResponses.map((response) => ({
        assignationId: props.assignationId,
        uploadedFileId: response.id,
        checklistItemId: checklistItemId,
      })),
    });
  };

  const hasRejected = (props.rejectedFiles?.length ?? 0) > 0;

  return (
    <Card className="w-full max-w-[350px] relative rounded-md overflow-hidden">
      <AbsoluteCenteredLoader isLoading={isPending} />

      <Card.Meta
        className="flex items-center"
        title={props.title}
        avatar={
          <>
            {(props.uploadedFiles?.length ?? 0) == (props.maxFiles ?? 1) && !hasRejected && (
              <CheckCircleOutlined className="text-green-500 text-3xl" />
            )}
            {(props.uploadedFiles?.length ?? 0) < (props.maxFiles ?? 1) && (
              <Progress
                type="circle"
                percent={((props.uploadedFiles?.length ?? 0) / 1) * 100}
                size="small"
              />
            )}

            {hasRejected && <CloseCircleOutlined className="text-red-500 text-3xl" />}
          </>
        }
      />

      <FormatsMetaCard item={props} />
      <MaxSizeMetaCard item={props} />
      <DescriptionMetaCard item={props} />
      <MaxFilesMetaCard item={props} />

      <UploadedFilesMetaCard assignationId={props.assignationId} item={props} />

      <UploadSection assignationId={props.assignationId} item={props} onSubmit={onSaveChanges} />
    </Card>
  );
};
