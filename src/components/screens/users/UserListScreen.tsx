import { Link } from "@tanstack/react-router";
import { Button } from "antd";
import { Suspense } from "react";
import { UserList } from "./list/UserList";

const UserListScreenHeader = () => {
  return (
    <div className="px-5 w-full flex">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-white text-2xl">Usuarios</h3>
      </div>
      <Link className="ml-auto" to="/admin/credentials/users/create">
        <Button className="ml-auto text-white" type="primary">
          Crear
        </Button>
      </Link>
    </div>
  );
};

export const UserListScreen = () => {
  return (
    <main>
      <Suspense fallback={<>Loading...</>}>
        <UserList header={<UserListScreenHeader />} />
      </Suspense>
    </main>
  );
};
