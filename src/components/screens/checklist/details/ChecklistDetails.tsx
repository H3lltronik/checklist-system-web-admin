// import { Route as AdminProfileDetailsRoute } from "@/routes/admin/credentials/profiles/$id";
// import { useSuspenseQuery } from "@tanstack/react-query";
import { Typography } from "antd";
// import { buildChecklistDetailsQueryOptions } from "../checklist-queries";

export const ChecklistDetails = () => {
  // const { id } = AdminProfileDetailsRoute.useParams();
  // const { data } = useSuspenseQuery(buildChecklistDetailsQueryOptions(Number(id)));

  return (
    <div>
      <Typography.Title level={2}>Detales de Checklist</Typography.Title>
    </div>
  );
};
