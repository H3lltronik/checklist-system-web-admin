import { FileChecklist, User } from "@/@types/api/entities";
import { ColumnDataTypes } from "@/@types/excel";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { router } from "@/main";

export interface UserListTableRow extends User {}

const actionColumns = createActionsColumn<UserListTableRow>({
  view: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/file-checklist/",
        to: `/admin/credentials/users/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {},
  edit: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/credentials/users",
        to: `/admin/credentials/users/edit/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
});

export const buildUserListColumns = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: FileChecklist[],
): AdminDataTableColumn<UserListTableRow>[] => {
  return [
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
      sorter: (a: UserListTableRow, b: UserListTableRow) => alphabetically(a.email, b.email),
      onFilter: (value, record: UserListTableRow) => record.email === value,
    },
    {
      title: () => <div className="text-center">Perfil</div>,
      dataIndex: "role",
      key: "role",
      label: "Perfil",
      dataType: "string" as keyof ColumnDataTypes,
      exportedWidth: 20,
      width: "160px",
      align: "left",
      //   filters: uniqueRutaOptions,
      render: (_, record) => record.role?.name,
      filterSearch: true,
      sorter: (a: UserListTableRow, b: UserListTableRow) => alphabetically(a.email, b.email),
      onFilter: (value, record: UserListTableRow) => record.email === value,
    },
    actionColumns as AdminDataTableColumn<UserListTableRow>,
  ];
};
