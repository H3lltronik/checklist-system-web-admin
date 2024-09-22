/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, ColumnDataTypes, IBlock } from "@/@types/excel";
import ExcelJS from "exceljs";

export abstract class DefaultExcelTableBlock implements IBlock {
  sheetTitle: string;
  protected columns: Column[];
  protected data: any[];

  constructor(sheetTitle: string, columns: Column[], data: any[]) {
    this.sheetTitle = sheetTitle;
    this.columns = columns;
    this.data = data;
  }

  protected abstract getHeaderStyle(): ExcelJS.Style | Partial<ExcelJS.Style>;
  protected abstract getDataStyle(
    dataType: string
  ): ExcelJS.Style | Partial<ExcelJS.Style>;
  protected abstract getColumnStyle(
    column: Column
  ): ExcelJS.Style | Partial<ExcelJS.Style>;

  public addToWorksheet(
    worksheet: ExcelJS.Worksheet,
    startRow: number,
    startCol: number
  ): void {
    this.columns.forEach((col, colIndex) => {
      const headerCell = worksheet
        .getRow(startRow)
        .getCell(startCol + colIndex);
      headerCell.value = col.header;
      headerCell.style = this.getHeaderStyle();

      if (col.width) {
        worksheet.getColumn(startCol + colIndex).width = col.width;
      }
    });

    this.data.forEach((item, rowIndex) => {
      let currentCol = startCol;
      this.columns.forEach((col, colIndex) => {
        let onCellStyle: Partial<ExcelJS.Style> | undefined = {};
        let onCellDataType: keyof ColumnDataTypes | undefined = undefined;
        let onCellValue = undefined;

        if (col.onExportCell) {
          const onCellResult = col.onExportCell(item, rowIndex);
          const cellSpan = onCellResult?.colSpan || 1;
          onCellStyle = onCellResult?.style ?? {};
          onCellDataType = onCellResult?.dataType;
          onCellValue = onCellResult.value ?? item[col.key];

          if (cellSpan > 1) {
            const start = currentCol;
            const end = start + cellSpan - 1;
            worksheet.mergeCells(
              startRow + rowIndex + 1,
              start,
              startRow + rowIndex + 1,
              end
            );

            const mergedCell = worksheet
              .getRow(startRow + rowIndex + 1)
              .getCell(start);
            if (onCellStyle) {
              Object.assign(mergedCell.style, onCellStyle);
            }
            mergedCell.value = onCellValue;

            currentCol = end + 1;
          }
        }

        if (currentCol > startCol + colIndex) return;

        const cell = worksheet
          .getRow(startRow + rowIndex + 1)
          .getCell(currentCol);

        if (onCellValue) {
          cell.value = onCellValue;
        } else if (
          col.dataType === "money" &&
          typeof item[col.key] === "string"
        ) {
          cell.value = isNaN(parseFloat(item[col.key]))
            ? item[col.key]
            : parseFloat(item[col.key]);
        } else {
          cell.value = item[col.key];
        }

        if (onCellDataType) col.dataType = onCellDataType;
        const dataStyle = this.getColumnStyle(col);

        cell.style = { ...dataStyle, ...onCellStyle };

        currentCol++;
      });
    });
  }
}

export const argbColor = (color: string, opacity: number = 1) => {
  if (opacity < 0 || opacity > 1) {
    throw new Error("Opacity must be between 0 and 1.");
  }

  if (/^#[0-9A-F]{3}$/i.test(color)) {
    color = color
      .split("")
      .map((char) => (char === "#" ? "#" : char + char))
      .join("");
  } else if (!/^#[0-9A-F]{6}$/i.test(color)) {
    throw new Error('Invalid color format. Please use "#RRGGBB" or "#RGB".');
  }

  color = color.slice(1);

  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();

  return alpha + color.toUpperCase();
};
