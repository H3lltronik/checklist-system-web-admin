import { Enterprise, FileChecklist } from "@/@types/api/entities";
import { ColumnDataTypes } from "@/@types/excel";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { router } from "@/main";

export interface EnterpriseListTableRow extends Enterprise {}

const actionColumns = createActionsColumn<EnterpriseListTableRow>({
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
        from: "/admin/enterprises",
        to: `/admin/enterprises/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
});

export const buildEnterpriseListColumns = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: FileChecklist[],
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
    actionColumns as AdminDataTableColumn<EnterpriseListTableRow>,
  ];
};
