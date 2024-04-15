import { Assignation } from "@/@types/api/entities";
import { WarningOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { ChecklistItemDetails } from "./ChecklistItemDetails";
import { ChecklistFileStatus } from "./components/UploadedFilesMetaCard";
import { parseChecklistItems } from "./lib";

type MyAssignationDetailsScreenProps = {
  data: Assignation;
};

export const MyAssignationDetailsScreen = (props: MyAssignationDetailsScreenProps) => {
  // const filesLength = props.data.files?.length ?? 0;
  const checklistIds = props.data.files.map((file) => file.checklistItemId);
  const uniqueChecklistIds = [...new Set(checklistIds)];
  const filesLength = uniqueChecklistIds.length;

  const checklistItemsLength =
    props.data.fileChecklist?.checklistItems?.map(() => 1).reduce((a, b) => a + b, 0) ?? 0;

  const completedPercentage = Math.round((filesLength / checklistItemsLength) * 100);
  const checklistItems = parseChecklistItems(props.data);
  const hasOneRejected = props.data.files?.some(
    (uploadedFile) => uploadedFile.assignationUploadedFileStatusId === ChecklistFileStatus.REJECTED,
  );

  return (
    <div>
      <div className="flex gap-5 items-center">
        {!hasOneRejected && <Progress type="circle" percent={completedPercentage} />}
        {hasOneRejected && (
          <div className="w-[120px] h-[120px] bg-yellow-500 rounded-full flex items-center justify-center">
            <WarningOutlined className="text-white text-7xl" />
          </div>
        )}
        <div className="">
          <h3 className="text-3xl">{props.data.name}</h3>
          <p className="text-lg">{props.data.description}</p>
          <p className="text-md italic">
            {props.data.period.name} - {props.data.period.year}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h3 className="text-3xl mb-5">Requerimientos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 ">
          {checklistItems.map((item) => (
            <ChecklistItemDetails key={item.id} assignationId={props.data.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};
