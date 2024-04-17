import { FileChecklist } from "@/@types/api/entities";
import { RequirementDetails } from "./RequirementDetails";

interface ChecklistDetailsProps {
  data: FileChecklist;
}

export const ChecklistDetails = (props: ChecklistDetailsProps) => {
  return (
    <div>
      <RequirementDetails data={props.data} />
    </div>
  );
};
