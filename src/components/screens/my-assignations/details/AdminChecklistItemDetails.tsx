import { ParsedChecklistItem } from "@/@types/common";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Card, Progress, Spin } from "antd";
import { AdminUploadedFilesMetaCard } from "./components/AdminUploadedFilesMetaCard";
import { DescriptionMetaCard } from "./components/DescriptionMetaCard";
import { FormatsMetaCard } from "./components/FormatsMetaCard";
import { MaxFilesMetaCard } from "./components/MaxFilesMetaCard";
import { MaxSizeMetaCard } from "./components/MaxSizeMetaCard";

type AdminChecklistItemDetailsProps = {
  assignationId: number;
} & ParsedChecklistItem;

export const AdminChecklistItemDetails = (props: AdminChecklistItemDetailsProps) => {
  const hasRejected = (props.rejectedFiles?.length ?? 0) > 0;
  const progress =
    (((props.acceptedFiles?.length ?? 0) + (props.pendingFiles?.length ?? 0)) /
      (props.maxFiles ?? 1)) *
    100;

  return (
    <Card className="w-full max-w-[350px] relative rounded-md overflow-hidden">
      {false && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black bg-opacity-20 z-10">
          <Spin />
        </div>
      )}

      <Card.Meta
        className="flex items-center"
        title={props.title}
        avatar={
          <>
            {(props.pendingFiles?.length ?? 0) + (props.acceptedFiles?.length ?? 0) <=
              (props.maxFiles ?? 1) &&
              !hasRejected && <Progress type="circle" percent={progress} size="small" />}
            {hasRejected && <CloseCircleOutlined className="text-red-500 text-5xl" />}
          </>
        }
      />

      {(props.pendingFiles?.length ?? 0) + (props.acceptedFiles?.length ?? 0) <=
        (props.maxFiles ?? 1) && (
        <p className="text-center text-xs text-gray-400">
          {props.pendingFiles?.length ?? 0} archivo(s) subidos
        </p>
      )}

      <FormatsMetaCard item={props} />
      <MaxSizeMetaCard item={props} />
      <DescriptionMetaCard item={props} />
      <MaxFilesMetaCard item={props} />

      <AdminUploadedFilesMetaCard assignationId={props.assignationId} item={props} />
    </Card>
  );
};
