import { ChecklistItem } from "@/@types/api/entities";
import { UserPermissions } from "@/@types/auth";
import { ColumnDataTypes } from "@/@types/excel";
import { QueryKeys } from "@/@types/queries";
import { Action, Subjects } from "@/abilities";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { deleteConfirm } from "@/http/delete-confirm";
import { router } from "@/main";
import { deleteChecklist } from "../api";

export type ChecklistListTableRow = {
  id: number;
  title: string;
  description: string;
  checklistItems: ChecklistItem[];
};

const buildActionColumns = (permissions: UserPermissions) => createActionsColumn<ChecklistListTableRow>({
  view: {
    permission: {
      subject: Subjects.ScreenAdminFileChecklistDetails,
      action: Action.Read,
    },
    onClick: (record) => {
      router.navigate({
        from: "/admin/file-checklist/",
        to: `/admin/file-checklist/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {
    permission: {
      subject: Subjects.ScreenAdminFileChecklistList,
      action: Action.Delete,
    },
    onClick: async (record) => {
      deleteConfirm({
        title: "Eliminar checklist",
        content: `¿Estás seguro de que deseas eliminar el checklist ${record.title}?`,
        deleteFn: async () => await deleteChecklist(record.id),
        recordId: record.id,
        queryKey: QueryKeys.FILE_CHECKLIST_LIST,
      });
    },
  },
  edit: {
    permission: {
      subject: Subjects.ScreenAdminFileChecklistList,
      action: Action.Update,
    },
    onClick: (record) => {
      router.navigate({
        from: "/admin/file-checklist/",
        to: `/admin/file-checklist/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
}, permissions);

export const buildChecklistListColumns = (
  permissions?: UserPermissions,
): AdminDataTableColumn<ChecklistListTableRow>[] => {
  return [
    {
      title: () => <div className="text-center">Titulo</div>,
      dataIndex: "title",
      key: "title",
      label: "Titulo",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: ChecklistListTableRow, b: ChecklistListTableRow) =>
        alphabetically(a.title, b.title),
      onFilter: (value, record: ChecklistListTableRow) => record.title === value,
    },
    {
      title: () => <div className="text-center">Descripcion</div>,
      dataIndex: "description",
      key: "description",
      label: "Descripcion",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: ChecklistListTableRow, b: ChecklistListTableRow) =>
        alphabetically(a.description, b.description),
      onFilter: (value, record: ChecklistListTableRow) => record.description === value,
    },
    {
      title: () => <div className="text-center">Archivos</div>,
      dataIndex: "checklistItems",
      key: "checklistItems",
      label: "Archivos",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "center",
      render: (value: ChecklistItem[]) => value.length,
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: ChecklistListTableRow, b: ChecklistListTableRow) =>
        alphabetically(a.description, b.description),
      onFilter: (value, record: ChecklistListTableRow) => record.description === value,
    },
    ...(permissions ? [buildActionColumns(permissions) as AdminDataTableColumn<ChecklistListTableRow>] : []),
  ];
};
