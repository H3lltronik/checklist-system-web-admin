import { checkTokenQueryOptions } from "@/auth";
import AdminDataTable, {
  AdminDataTableColumn,
  AdminDataTableHandles,
} from "@/components/core/dataTable/AdminDataTable";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { useRef } from "react";
import { userQueryOptions } from "../data/queries";
import { buildUserListColumns } from "./columns";

type Props = {
  header?: React.ReactNode;
};
export const UserList = (props: Props) => {
  const tableRef = useRef<AdminDataTableHandles>(null);
  const { data } = useSuspenseQuery(userQueryOptions);
  const { data: tokenData } = useQuery(checkTokenQueryOptions);

  const handleExportClick = () => {
    if (tableRef.current) {
      tableRef.current.exportToExcel();
    }
  };

  const handleProcessClick = () => {
    // refetch();
  };

  return (
    <div className="h-[80vh]">
      <AdminDataTable
        className="h-full"
        ref={tableRef}
        bordered
        rowKey={"id"}
        columns={buildUserListColumns(tokenData?.user) as AdminDataTableColumn<AnyObject>[]}
        size="small"
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100", "200"],
        }}
        data={data ?? []}
        loading={false}
        title={() => {
          return (
            <div className="bg-brown-guerrero flex items-center justify-between px-5">
              {props.header}
              <div className="text-right flex items-center py-2">
                <Button
                  className="bg-green-600 mr-2 text-white hover:text-white"
                  onClick={handleProcessClick}
                >
                  Procesar
                </Button>
                <Button type="primary" onClick={handleExportClick}>
                  Exportar
                </Button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};
