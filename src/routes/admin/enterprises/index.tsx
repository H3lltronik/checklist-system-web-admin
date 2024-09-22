import { EnterpriseListScreen } from "@/components/screens/enterprise/EnterpriseListScreen";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  // const data = await queryClient.ensureQueryData(enterpriseQueryOptions);
  // return data;
};

export const Route = createFileRoute("/admin/enterprises/")({
  component: AdminChecklistScreen,
  loader,
});

function AdminChecklistScreen() {
  return <EnterpriseListScreen />;
}
