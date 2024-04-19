import { FileChecklist, User } from "@/@types/api/entities";
import { ColumnDataTypes } from "@/@types/excel";
import { QueryKeys } from "@/@types/queries";
import { createActionsColumn } from "@/components/core/dataTable/actions/action-columns-builder";
import { AdminDataTableColumn } from "@/components/core/dataTable/AdminDataTable";
import { alphabetically } from "@/components/core/dataTable/utils/tableSorters";
import { deleteConfirm } from "@/http/delete-confirm";
import { router } from "@/main";
import { deleteUser } from "../data/api";

export interface UserListTableRow extends User {}

const actionColumns = createActionsColumn<UserListTableRow>({
  view: {
    onClick: (record) => {
      router.navigate({
        from: "/admin/credentials/users",
        to: `/admin/credentials/users/$id`,
        params: { id: record.id.toString() },
      });
    },
  },
  delete: {
    onClick: async (record) => {
      deleteConfirm({
        title: "Eliminar usuario",
        content: `¿Estás seguro de que deseas eliminar el usuario ${record.name}?`,
        deleteFn: async () => await deleteUser(record.id),
        recordId: record.id,
        queryKey: QueryKeys.USER_LIST,
      });
    },
  },
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
      sorter: (a: UserListTableRow, b: UserListTableRow) => alphabetically(a.name, b.name),
      onFilter: (value, record: UserListTableRow) => record.name === value,
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
      render: (_, record) => record.credentials[0].role?.name,
      filterSearch: true,
      sorter: (a: UserListTableRow, b: UserListTableRow) =>
        alphabetically(a.credentials[0].role?.name, b.credentials[0].role?.name),
      onFilter: (value, record: UserListTableRow) => record.credentials[0].role?.name === value,
    },
    actionColumns as AdminDataTableColumn<UserListTableRow>,
  ];
};
