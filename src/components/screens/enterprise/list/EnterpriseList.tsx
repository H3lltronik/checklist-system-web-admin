import AdminDataTable, {
  AdminDataTableColumn,
  AdminDataTableHandles,
} from "@/components/core/dataTable/AdminDataTable";
import { formatNumerWithCommas } from "@/lib/utils/formatters";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { useRef, useState } from "react";
import { enterpriseQueryOptions } from "../queries";
import { buildEnterpriseListColumns } from "./columns";

type Props = {
  header?: React.ReactNode;
};
export const EnterpriseList = (props: Props) => {
  const tableRef = useRef<AdminDataTableHandles>(null);

  const [pagination, setPagination] = useState<{ current: number; pageSize: number, limit?: number }>({
    current: 1,
    pageSize: 10,
    limit: undefined,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data } = useSuspenseQuery(enterpriseQueryOptions({
    perPage: pagination.pageSize,
    page: pagination.current,
    search: searchTerm,
    limit: pagination.limit
  }));

  const handleExportClick = () => {
    if (tableRef.current) {
      tableRef.current.exportToExcel();
    }
  };

  const handleProcessClick = () => { };

  const handleTableChange = (paginationInfo: any) => {
    setPagination(prev => ({
      ...prev,
      current: paginationInfo.current,
      pageSize: paginationInfo.pageSize,
    }));

  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPagination({ current: 1, pageSize: 10, limit: 50 });
  };

  return (
    <div className="h-[80vh]">
      <AdminDataTable
        className="h-full"
        ref={tableRef}
        bordered
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.totalItems,
          showSizeChanger: true,
          showTotal: (total) => `Total ${formatNumerWithCommas(total)} registros`,
        }}
        rowKey={"id"}
        // @ts-expect-error TODO: fix this
        columns={buildEnterpriseListColumns(data?.data ?? []) as AdminDataTableColumn<AnyObject>[]}
        size="small"
        onChange={handleTableChange}
        data={data?.data ?? []}
        loading={false}
        title={() => {
          return (
            <div className="bg-brown-guerrero flex items-center justify-between px-5">
              {props.header}
              <div className="text-right flex items-center py-2">
                <Input.Search
                  placeholder="Busqueda"
                  onSearch={handleSearch}
                  style={{ width: 200, marginRight: 8 }}
                />
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


