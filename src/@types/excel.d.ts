import ExcelJS from "exceljs";

export type ColumnDataTypes = {
  string: "string";
  number: "number";
  money: "money";
  time: "time";
};

type OnCellReturn = {
  colSpan?: number | null;
  style?: Partial<ExcelJS.Style> | null;
  dataType?: keyof ColumnDataTypes;
};

type Column<T = any> = {
  header: string;
  key: string;
  dataType: keyof ColumnDataTypes;
  width?: number;
  align?: string;
  colSpan?: number;
  onExportCell?: (item: T, index: number) => OnCellReturn;
};

export interface IBlock {
  addToWorksheet(worksheet: ExcelJS.Worksheet, startRow: number, startCol: number): void;
  sheetTitle: string;
}
