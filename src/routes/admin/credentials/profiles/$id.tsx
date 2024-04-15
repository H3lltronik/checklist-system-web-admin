import { queryClient } from "@/components/core/queryClient";
import { buildRoleDetailsQueryOptions } from "@/components/screens/profile/data/role/queries";
import { ProfileDetailsScreen } from "@/components/screens/profile/details/ProfileDetailsScreen";
import { createFileRoute } from "@tanstack/react-router";

const loadRoleDetails = async (id: number) => {
  const queryOptions = buildRoleDetailsQueryOptions(id);
  const data = await queryClient.ensureQueryData(queryOptions);
  console.log("[loderTest] details data", data);
  return data;
};

export const Route = createFileRoute("/admin/credentials/profiles/$id")({
  component: AdminProfileDetailsScreen,
  loader: ({ params: { id } }) => loadRoleDetails(Number(id)),
});

function AdminProfileDetailsScreen() {
  return <ProfileDetailsScreen />;
}
