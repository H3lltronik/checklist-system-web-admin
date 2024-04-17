import { FileChecklist } from "@/@types/api/entities";
import { ChecklistDetails } from "./details/ChecklistDetails";

interface ChecklistDetailsProps {
  data: FileChecklist;
}

export const ChecklistDetailsScreen = (props: ChecklistDetailsProps) => {
  return (
    <div>
      <ChecklistDetails data={props.data} />
    </div>
  );
};
