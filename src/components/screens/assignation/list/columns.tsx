import { Assignation } from "@/@types/api/entities";
import { UserPermissions } from "@/@types/auth";
import { ColumnDataTypes } from "@/@types/excel";
import { QueryKeys } from "@/@types/queries";
import { Action, Subjects } from "@/abilities";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { deleteConfirm } from "@/http/delete-confirm";
import { router } from "@/main";
import { deleteAssignation } from "../api";

export interface AssignationListTableRow extends Assignation {}

const buildActionColumns = (permissions: UserPermissions) => createActionsColumn<AssignationListTableRow>({
  view: {
    permission: {
      subject: Subjects.ScreenAdminAssignationDetails,
      action: Action.Read,
    },
    onClick: (record) => {
      router.navigate({
        from: "/admin/file-checklist/",
        to: `/admin/assignations/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {
    permission: {
      subject: Subjects.ScreenAdminAssignationList,
      action: Action.Delete,
    },
    onClick: async (record) => {
      deleteConfirm({
        title: "Eliminar asignación",
        content: `¿Estás seguro de que deseas eliminar la asignación ${record.name}?`,
        deleteFn: async () => await deleteAssignation(record.id),
        recordId: record.id,
        queryKey: QueryKeys.ASSIGNATION_LIST,
      });
    },
  },
  edit: {
    permission: {
      subject: Subjects.ScreenAdminAssignationList,
      action: Action.Update,
    },
    onClick: (record) => {
      router.navigate({
        from: "/admin/assignations",
        to: `/admin/assignations/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
}, permissions);

export const buildAssignationListColumns = (
  permissions?: UserPermissions,
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
        <div className="text-center">{record.enterprise?.email}</div>
      ),
    },
    ...(permissions ? [buildActionColumns(permissions) as AdminDataTableColumn<AssignationListTableRow>] : []),
  ];
};
