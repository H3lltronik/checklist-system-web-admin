import { Enterprise } from "@/@types/api/entities";
import { UserPermissions } from "@/@types/auth";
import { ColumnDataTypes } from "@/@types/excel";
import { QueryKeys } from "@/@types/queries";
import { Action, Subjects } from "@/abilities";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { deleteConfirm } from "@/http/delete-confirm";
import { router } from "@/main";
import { deleteEnterprise } from "../api";

export interface EnterpriseListTableRow extends Enterprise {}

const buildActionColumns = (permissions: UserPermissions) => createActionsColumn<EnterpriseListTableRow>({
  view: {
    permission: {
      subject: Subjects.ScreenAdminEnterpriseDetails,
      action: Action.Read,
    },
    onClick: (record) => {
      router.navigate({
        from: "/admin/enterprises/",
        to: `/admin/enterprises/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {
    permission: {
      subject: Subjects.ScreenAdminEnterpriseList,
      action: Action.Delete,
    },
    onClick: async (record) => {
      deleteConfirm({
        title: "Eliminar empresa",
        content: `¿Estás seguro de que deseas eliminar la empresa ${record.name}?`,
        deleteFn: async () => await deleteEnterprise(record.id),
        recordId: record.id,
        queryKey: QueryKeys.ENTERPRISE_LIST,
      });
    },
  },
  edit: {
    permission: {
      subject: Subjects.ScreenAdminEnterpriseList,
      action: Action.Update,
    },
    onClick: (record) => {
      router.navigate({
        from: "/admin/enterprises",
        to: `/admin/enterprises/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
}, permissions);

export const buildEnterpriseListColumns = (
  permissions?: UserPermissions,
): AdminDataTableColumn<EnterpriseListTableRow>[] => {
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
      sorter: (a: EnterpriseListTableRow, b: EnterpriseListTableRow) =>
        alphabetically(a.name, b.name),
      onFilter: (value, record: EnterpriseListTableRow) => record.name === value,
    },
    {
      title: () => <div className="text-center">RFC</div>,
      dataIndex: "rfc",
      key: "rfc",
      label: "RFC",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: EnterpriseListTableRow, b: EnterpriseListTableRow) =>
        alphabetically(a.rfc, b.rfc),
      onFilter: (value, record: EnterpriseListTableRow) => record.rfc === value,
    },
    {
      title: () => <div className="text-center">Telefono</div>,
      dataIndex: "phone",
      key: "phone",
      label: "Telefono",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: EnterpriseListTableRow, b: EnterpriseListTableRow) =>
        alphabetically(a.phone, b.phone),
      onFilter: (value, record: EnterpriseListTableRow) => record.phone === value,
    },
    {
      title: () => <div className="text-center">Correo</div>,
      dataIndex: "email",
      key: "email",
      label: "Correo",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: EnterpriseListTableRow, b: EnterpriseListTableRow) =>
        alphabetically(a.email, b.email),
      onFilter: (value, record: EnterpriseListTableRow) => record.email === value,
    },
    ...(permissions ? [buildActionColumns(permissions) as AdminDataTableColumn<EnterpriseListTableRow>] : []),
  ];
};
