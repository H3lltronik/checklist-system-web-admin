import { Link } from "@tanstack/react-router";
import { Button } from "antd";
import { Suspense } from "react";
import { ProfileList } from "./list/ProfileList";

const ProfileScreenHeader = () => {
  // const { status } = ProfilesRoute.useSearch();
  // const navigate = useNavigate({ from: ProfilesRoute.fullPath });

  return (
    <div className="px-5 w-full flex">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-white text-2xl">Perfiles</h3>
      </div>
      <Link className="ml-auto" to="/admin/credentials/profiles/create">
        <Button className="text-white" type="primary">
          Crear
        </Button>
      </Link>
      {/* <div className="">
        <Select
          placeholder="Filtrar por estado"
          value={status}
          className="w-[200px]"
          onChange={(value) => navigate({ search: (prev) => ({ ...prev, status: value }) })}
        >
          <Select.Option value="all">Todos</Select.Option>
          <Select.Option value="active">Activos</Select.Option>
          <Select.Option value="inactive">Inactivos</Select.Option>
        </Select>
      </div> */}
    </div>
  );
};

export const ProfilesScreen = () => {
  return (
    <main>
      <Suspense fallback={<>Loading...</>}>
        <ProfileList header={<ProfileScreenHeader />} />
      </Suspense>
    </main>
  );
};
