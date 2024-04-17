import { Link } from "@tanstack/react-router";
import { Button } from "antd";
import { Suspense } from "react";
import { AssignationList } from "./list/AssignationList";

const AssignationListScreenHeader = () => {
  return (
    <div className="px-5 w-full flex">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-white text-2xl">Asignaciones</h3>
      </div>
      <Link className="ml-auto" to="/admin/assignations/create">
        <Button className="text-white" type="primary">
          Crear
        </Button>
      </Link>
    </div>
  );
};

export const AssignationListScreen = () => {
  return (
    <main>
      <Suspense fallback={<>Loading...</>}>
        <AssignationList header={<AssignationListScreenHeader />} />
      </Suspense>
    </main>
  );
};
