import { checkTokenQueryOptions } from "@/auth";
import AdminDataTable, {
  AdminDataTableColumn,
  AdminDataTableHandles,
} from "@/components/core/dataTable/AdminDataTable";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { AnyObject } from "antd/es/_util/type";
import { useRef } from "react";
import { assignationQueryOptions } from "../queries";
import { buildAssignationListColumns } from "./columns";

type Props = {
  header?: React.ReactNode;
};
export const AssignationList = (props: Props) => {
  const tableRef = useRef<AdminDataTableHandles>(null);
  const { data } = useSuspenseQuery(assignationQueryOptions);
  const { data: tokenData } = useQuery(checkTokenQueryOptions);

  return (
    <div className="h-[80vh]">
      <AdminDataTable
        className="h-full"
        ref={tableRef}
        bordered
        rowKey={"id"}
        columns={buildAssignationListColumns(tokenData?.user) as AdminDataTableColumn<AnyObject>[]}
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
            <div className="bg-blue-apoyando flex items-center justify-between px-5 py-2">
              {props.header}
            </div>
          );
        }}
      />
    </div>
  );
};
