import { WarningOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { AdminChecklistItemDetails } from "../my-assignations/details/AdminChecklistItemDetails";
import { Assignation, CHECKLIST_ITEM_EVENT } from "../my-assignations/types";

type MyAssignationDetailsScreenProps = {
  data: Assignation;
};

export const AssignationDetailsScreen = (props: MyAssignationDetailsScreenProps) => {
  const hasRejected = props.data.checklistItems.some((item) =>
    item.uploadedFiles.some(
      (file) => file.status?.event === CHECKLIST_ITEM_EVENT.ADMIN_REJECTED_FILE,
    ),
  );
  const completedPercentage = props.data.progress;
  const checklistItems = props.data.checklistItems;

  return (
    <div>
      <div className="flex gap-5 items-center">
        {!hasRejected && <Progress type="circle" percent={completedPercentage} />}
        {hasRejected && (
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
        <div className="grid lg:grid-cols-4 grid-cols-5 gap-[20px] ">
          {checklistItems.map((item) => (
            <AdminChecklistItemDetails key={item.id} assignationId={props.data.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};
