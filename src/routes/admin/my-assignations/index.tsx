import { queryClient } from "@/components/core/queryClient";
import { enterpriseAssignationDetailsQueryOptions } from "@/components/screens/my-assignations/data/queries";
import { MyAssignationsScreen } from "@/components/screens/my-assignations/MyAssignationsScreen";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  const data = await queryClient.ensureQueryData(enterpriseAssignationDetailsQueryOptions());
  return data;
};

export const Route = createFileRoute("/admin/my-assignations/")({
  component: () => <AdminMyAssignationsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminMyAssignationsScreen() {
  const { data } = useSuspenseQuery(enterpriseAssignationDetailsQueryOptions());

  if (!data) return <>No data</>;

  return <MyAssignationsScreen data={data} />;
}
