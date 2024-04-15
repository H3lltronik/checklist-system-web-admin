import { Assignation, FileChecklist } from "@/@types/api/entities";
import { ColumnDataTypes } from "@/@types/excel";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { router } from "@/main";

export interface AssignationListTableRow extends Assignation {}

const actionColumns = createActionsColumn<AssignationListTableRow>({
  view: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/file-checklist/",
        to: `/admin/assignations/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {},
  edit: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/assignations",
        to: `/admin/assignations/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
});

export const buildAssignationListColumns = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: FileChecklist[],
): AdminDataTableColumn<AssignationListTableRow>[] => {
  return [
    {
      title: () => <div className="text-center">Nombre</div>,
      dataIndex: "name",
      key: "name",
      label: "Nombre",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: AssignationListTableRow, b: AssignationListTableRow) =>
        alphabetically(a.name, b.name),
      onFilter: (value, record: AssignationListTableRow) => record.name === value,
    },
    {
      title: () => <div className="text-center">Empresa</div>,
      dataIndex: "name",
      key: "name",
      label: "Empresa",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: AssignationListTableRow, b: AssignationListTableRow) =>
        alphabetically(a.enterprise.name, b.enterprise.name),
      onFilter: (value, record: AssignationListTableRow) => record.enterprise.name === value,
      render: (_, record: AssignationListTableRow) => (
        <div className="text-center">{record.enterprise.name}</div>
      ),
    },
    {
      title: () => <div className="text-center">Email</div>,
      dataIndex: "email",
      key: "email",
      label: "Email",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: AssignationListTableRow, b: AssignationListTableRow) =>
        alphabetically(a.enterprise.email, b.enterprise.email),
      onFilter: (value, record: AssignationListTableRow) => record.enterprise.email === value,
      render: (_, record: AssignationListTableRow) => (
        <div className="text-center">{record.enterprise.email}</div>
      ),
    },
    actionColumns as AdminDataTableColumn<AssignationListTableRow>,
  ];
};
