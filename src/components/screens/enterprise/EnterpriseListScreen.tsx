import { Link } from "@tanstack/react-router";
import { Button } from "antd";
import { Suspense } from "react";
import { EnterpriseList } from "./list/EnterpriseList";

const EnterpriseListScreenHeader = () => {
  return (
    <div className="px-5 w-full flex">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-white text-2xl">Empresas</h3>
      </div>
      <Link className="ml-auto" to="/admin/enterprises/create">
        <Button className="ml-auto text-white" type="primary">
          Crear
        </Button>
      </Link>
    </div>
  );
};

export const EnterpriseListScreen = () => {
  return (
    <main>
      <Suspense fallback={<>Loading...</>}>
        <EnterpriseList header={<EnterpriseListScreenHeader />} />
      </Suspense>
    </main>
  );
};
