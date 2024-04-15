import { ChecklistItem, FileChecklist } from "@/@types/api/entities";
import { ColumnDataTypes } from "@/@types/excel";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { router } from "@/main";

export type ChecklistListTableRow = {
  id: number;
  title: string;
  description: string;
  checklistItems: ChecklistItem[];
};

const actionColumns = createActionsColumn<ChecklistListTableRow>({
  view: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/file-checklist/",
        to: `/admin/credentials/profiles/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {},
  edit: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/file-checklist/",
        to: `/admin/file-checklist/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
});

export const buildChecklistListColumns = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: FileChecklist[],
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
    actionColumns as AdminDataTableColumn<ChecklistListTableRow>,
  ];
};
