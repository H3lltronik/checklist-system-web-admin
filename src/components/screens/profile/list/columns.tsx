import { RoleListItem } from "@/@types/api/roles";
import { ColumnDataTypes } from "@/@types/excel";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { router } from "@/main";
import { CheckOutlined } from "@ant-design/icons";

export type ProfileListTableRow = {
  id: number;
  name: string;
  isActive: boolean;
  permissionsTxt: string;
};

const actionColumns = createActionsColumn<ProfileListTableRow>({
  view: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/credentials/profiles",
        to: `/admin/credentials/profiles/$id`,
        params: { id: record.id.toString() },
      });
    },
    onHover: (record) => {
      router.preloadRoute({
        to: `/admin/credentials/profiles/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {},
  edit: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/credentials/profiles",
        to: `/admin/credentials/profiles/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
});

export const buildProfileListColumns = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: RoleListItem[],
): AdminDataTableColumn<ProfileListTableRow>[] => {
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
      sorter: (a: ProfileListTableRow, b: ProfileListTableRow) => alphabetically(a.name, b.name),
      onFilter: (value, record: ProfileListTableRow) => record.name === value,
    },
    {
      title: () => <div className="text-center">Permisos</div>,
      dataIndex: "permissionsTxt",
      key: "permissionsTxt",
      label: "Permisos",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      filterSearch: true,
      sorter: (a: ProfileListTableRow, b: ProfileListTableRow) =>
        alphabetically(a.permissionsTxt, b.permissionsTxt),
      onFilter: (value, record: ProfileListTableRow) => record.permissionsTxt === value,
    },
    {
      title: () => <div className="text-center">Activo</div>,
      dataIndex: "isActive",
      key: "isActive",
      label: "Activo",
      dataType: "boolean" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      filters: [
        {
          text: "✅",
          value: 1,
        },
        {
          text: "No",
          value: 0,
        },
      ],
      filterSearch: true,
      onFilter: (value, record: ProfileListTableRow) => record.isActive === value,
      render: (hasCobranza: number) => (
        <div className="text-center">
          {hasCobranza == 1 ? <CheckOutlined /> : <div className=""></div>}
        </div>
      ),
    },
    actionColumns as AdminDataTableColumn<ProfileListTableRow>,
  ];
};
