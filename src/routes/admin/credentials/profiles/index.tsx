import { queryClient } from "@/components/core/queryClient";
import { roleQueryOptions } from "@/components/screens/profile/data/role/queries";
import { ProfilesScreen } from "@/components/screens/profile/ProfilesScreen";
import { createFileRoute } from "@tanstack/react-router";

type SearchParams = {
  status: "active" | "inactive" | "all";
};

const loder = async () => {
  const data = await queryClient.ensureQueryData(roleQueryOptions);
  return data;
};

export const Route = createFileRoute("/admin/credentials/profiles/")({
  component: AdminProfileScreen,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      status: search.status as SearchParams["status"],
    };
  },
  loaderDeps: ({ search }) => ({ status: search.status }),
  loader: loder,
});

function AdminProfileScreen() {
  return <ProfilesScreen />;
}
