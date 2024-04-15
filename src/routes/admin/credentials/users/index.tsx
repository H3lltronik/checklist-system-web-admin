import { queryClient } from "@/components/core/queryClient";
import { userQueryOptions } from "@/components/screens/users/data/queries";
// import { ManageUserScreen } from "@/components/screens/users/ManageUserScreen";
import { UserListScreen } from "@/components/screens/users/UserListScreen";
import { createFileRoute } from "@tanstack/react-router";

const loader = async () => {
  const data = await queryClient.ensureQueryData(userQueryOptions);
  return data;
};

export const Route = createFileRoute("/admin/credentials/users/")({
  component: AdminUsersScreen,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminUsersScreen() {
  return <UserListScreen />;
}
