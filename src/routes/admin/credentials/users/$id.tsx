import { UserWEnterprises } from '@/@types/api/user';
import { queryClient } from '@/components/core/queryClient';
import { buildUserDetailsQueryOptions } from '@/components/screens/users/data/queries';
import { UserDetailsScreen } from '@/components/screens/users/UserDetailsScreen';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

// @ts-expect-error TODO: fix this
const loader = async (params) => {
  if (!params.id) return null;
  const data = await queryClient.ensureQueryData(buildUserDetailsQueryOptions(Number(params.id)));
  return data;
};

export const Route = createFileRoute('/admin/credentials/users/$id')({
  component: () => <AdminUserDetailsScreen />,
  loader,
  pendingComponent: () => <div>Loading...</div>,
})

function AdminUserDetailsScreen() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(buildUserDetailsQueryOptions(Number(id))) as {
    data: UserWEnterprises;
  };

  return <UserDetailsScreen data={data} />
}