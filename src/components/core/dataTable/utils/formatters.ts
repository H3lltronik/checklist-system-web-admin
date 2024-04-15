import { Column } from "@/@types/excel";
import dayjs from "dayjs";
import ExcelJS from "exceljs";
import { ExportData } from "../AdminDataTable";
import { argbColor } from "../excel/table_blocks/DefaultExcelTableBlock";

/**
 * Formats the given amount to a USD currency string.
 *
 * @param {any} amount - the amount to be formatted
 * @return {string} the formatted USD currency string
 */
export function moneyFormat(amount: string | number) {
  const numberAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numberAmount)) {
    return amount;
  }

  return numberAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export const numberFormat = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  }).format(value);
};

export function formatRow(
  columns: Column[],
  rowIndexes: number[],
  style: Partial<ExcelJS.Style>,
): void {
  columns.forEach((col) => {
    const originalOnCell = col.onExportCell;
    col.onExportCell = (record, index) => {
      let result = originalOnCell ? originalOnCell(record, index) : {};

      if (rowIndexes.includes(index)) {
        result = {
          ...result,
          style: { ...result.style, ...style },
        };
      }
      return result;
    };
  });
}

export function formatSummaryRow(exportData: ExportData, summaryRowIndexes: number[]): void {
  const grayStyle: Partial<ExcelJS.Style> = {
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: argbColor("#F5F5F5") },
    },
    font: {
      bold: true,
      color: { argb: argbColor("#000") },
    },
  };
  formatRow(
    exportData.columns,
    summaryRowIndexes.map((item) => exportData.data.length + item - 1),
    grayStyle,
  );
}

export function formatDate(date: Date | string) {
  return dayjs(date).format("YYYY-MM-DD");
}
