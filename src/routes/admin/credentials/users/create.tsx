import { ManageUserScreen } from "@/components/screens/users/ManageUserScreen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/credentials/users/create")({
  component: () => <ManageUserScreen />,
});
