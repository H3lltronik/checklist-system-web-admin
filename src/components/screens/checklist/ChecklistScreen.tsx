import { Link } from "@tanstack/react-router";
import { Button, Typography } from "antd";
import { Suspense } from "react";
import { ChecklistList } from "./list/ChecklistList";

const ChecklistScreenHeader = () => {
  return (
    <div className="px-2 md:px-5 w-full flex items-center">
      <div className="flex items-center justify-between py-2">
        <Typography.Title level={3} className="!m-0 !text-white">
          Requerimientos (Checklists)
        </Typography.Title>
      </div>
      <Link className="ml-auto" to="/admin/file-checklist/create">
        <Button className="ml-auto text-white" type="primary">
          Crear
        </Button>
      </Link>
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
