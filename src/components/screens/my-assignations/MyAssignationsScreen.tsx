import { GetEnterpriseAssignationListResponse } from "@/@types/api/assignation";
import { EnterpriseAssignationGrid } from "./list/EnterpriseAssignationGrid";

type MyAssignationsScreenProps = {
  data: GetEnterpriseAssignationListResponse;
};

export const MyAssignationsScreen = (props: MyAssignationsScreenProps) => {
  if (!props.data) return null;
  if (!Array.isArray(props.data)) return <div>No hay datos</div>;
  if (props.data.length === 0) return <div>No hay datos</div>;

  return (
    <main>
      <EnterpriseAssignationGrid data={props.data} />
    </main>
  );
};
