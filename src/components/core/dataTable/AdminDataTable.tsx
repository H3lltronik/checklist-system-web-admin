import { Column, ColumnDataTypes, OnCellReturn } from "@/@types/excel";
import { Table, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import { CustomStyledTableBlock } from "./excel/table_blocks/CustomStyledTableBlock";
import { exportBlocks } from "./excel/table_blocks/exportTableBlocks";

export type AdminDataTableColumn<T> = ColumnsType<T>[number] & {
  label?: string;
  dataType: keyof ColumnDataTypes;
  exportedWidth?: number;
  dataIndex: string;
  onExportCell?: (item: T, index: number) => OnCellReturn;
};

export type ExportExcelProps = {
  sheetTitle?: string;
  exportFileName?: string;
};

interface AdminDataTableProps<T extends AnyObject> extends TableProps<T> {
  data: T[];
  columns: AdminDataTableColumn<T>[];
  customExport?: (data: T[], columns: AdminDataTableColumn<T>[]) => void;
}

export type ExportData = {
  columns: Column[];
  data: unknown[];
};

export type TableExportHandle = {
  exportToExcel: (params?: ExportExcelProps) => void;
  getExportData: () => ExportData | undefined;
};

export type AdminDataTableHandles = object & TableExportHandle;

const _AdminDataTable = <T extends AnyObject>(
  props: AdminDataTableProps<T>,
  ref: React.ForwardedRef<AdminDataTableHandles>,
) => {
  const { data, columns, customExport, className, scroll, ...tableProps } = props;

  useImperativeHandle(ref, () => ({
    exportToExcel(params) {
      if (customExport) {
        customExport(data, columns);
      } else {
        const styledTableColumns: Column[] = columns.map((col) => ({
          header: col.label?.toString() || col.title?.toString() || "",
          key: col.dataIndex,
          dataIndex: col.dataIndex,
          dataType: col.dataType,
          align: col.align || "left",
          width: Number(col.exportedWidth),
        }));

        const styledTable = new CustomStyledTableBlock(
          params?.sheetTitle ?? "Sheet1",
          styledTableColumns,
          data,
        );
        exportBlocks({
          blocks: [{ block: styledTable, startRow: 1, startCol: 1 }],
          filename: params?.exportFileName ?? "styledExample.xlsx",
        });
      }
    },
    getExportData() {
      const styledTableColumns: Column[] = columns.map((col) => ({
        header: col.label?.toString() || col.title?.toString() || "",
        key: col.dataIndex,
        dataIndex: col.dataIndex,
        dataType: col.dataType,
        width: Number(col.exportedWidth),
        align: col.align || "left",
        onExportCell: col.onExportCell,
      }));
      return {
        columns: styledTableColumns,
        data,
      };
    },
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState(300);

  useLayoutEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 10);
    const calculateTableHeight = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current?.getBoundingClientRect().height;
        // Calcula el espacio ocupado por otros elementos, incluyendo márgenes
        const elements = [".ant-table-title", ".ant-table-header", ".ant-table-pagination"];
        const extraSpace = elements.reduce((total, selector) => {
          const element = containerRef.current?.querySelector(selector) as HTMLElement;
          if (element) {
            const style = window.getComputedStyle(element);
            const marginVertical = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            return total + element.offsetHeight + marginVertical;
          }
          return total;
        }, 0);

        const availableHeight = containerHeight - extraSpace;

        setTableHeight(availableHeight ?? 0);
      }
    };

    calculateTableHeight();
    window.addEventListener("resize", calculateTableHeight);
    return () => window.removeEventListener("resize", calculateTableHeight);
  }, [data, containerRef]);

  return (
    <div className="h-full " ref={containerRef}>
      <Table
        {...tableProps}
        // style={{ height: `${tableHeight}px` }}
        className={`${className}`}
        scroll={{ y: tableHeight, x: "max-content", ...scroll }}
        dataSource={data as AnyObject[]}
        columns={columns as ColumnsType<AnyObject>}
      />
    </div>
  );
};

const AdminDataTable = forwardRef(_AdminDataTable);
export default AdminDataTable;
