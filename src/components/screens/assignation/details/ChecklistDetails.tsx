// import { Route as AdminProfileDetailsRoute } from "@/routes/admin/credentials/profiles/$id";
// import { useSuspenseQuery } from "@tanstack/react-query";
import { Typography } from "antd";
// import { buildChecklistDetailsQueryOptions } from "../../checklist/checklist-queries";

export const ChecklistDetails = () => {
  // const { id } = AdminProfileDetailsRoute.useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { data } = useSuspenseQuery(buildChecklistDetailsQueryOptions(Number(id)));

  return (
    <div>
      <Typography.Title level={2}>Detales de Checklist</Typography.Title>
    </div>
  );
};
