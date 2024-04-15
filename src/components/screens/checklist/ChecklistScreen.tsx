import { Link } from "@tanstack/react-router";
import { Button } from "antd";
import { Suspense } from "react";
import { ChecklistList } from "./list/ChecklistList";

const ChecklistScreenHeader = () => {
  return (
    <div className="px-5 w-full flex">
      <div className="flex items-center justify-between">
        <h3 className="!mb-0 text-white text-2xl">Requerimientos (Checklists)</h3>
      </div>
      <Button className="ml-auto text-white" type="primary">
        <Link to="/admin/file-checklist/create">Crear</Link>
      </Button>
    </div>
  );
};

export const ChecklistScreen = () => {
  return (
    <main>
      <Suspense fallback={<>Loading...</>}>
        <ChecklistList header={<ChecklistScreenHeader />} />
      </Suspense>
    </main>
  );
};
