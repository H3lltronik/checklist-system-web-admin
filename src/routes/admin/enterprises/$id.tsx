import { Enterprise } from "@/@types/api/entities";
import { queryClient } from "@/components/core/queryClient";
import { EnterpriseDetailsScreen } from "@/components/screens/enterprise/EnterpriseDetailsScreen";
import { buildEnterpriseDetailsQueryOptions } from "@/components/screens/enterprise/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const data = await queryClient.ensureQueryData(
    buildEnterpriseDetailsQueryOptions(Number(params.id)),
  );
  return data;
};

export const Route = createFileRoute("/admin/enterprises/$id")({
  component: () => <AdminEnterpriseDetailsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
});

function AdminEnterpriseDetailsScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildEnterpriseDetailsQueryOptions(Number(id))) as {
    data: Enterprise;
  };

  return <EnterpriseDetailsScreen data={data} />;
}
