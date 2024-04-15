import { IBlock } from "@/@types/excel";
import ExcelJS from "exceljs";

export class TextBlock implements IBlock {
  sheetTitle: string;
  private content: string[];
  private style: Partial<ExcelJS.Style>;
  private autoHeight: boolean; // Si se ajusta el alto de la celda automáticamente
  private qntCellsToMerge: number; // Cantidad de celdas a unir
  private fixedHeight: number | null;

  constructor(
    sheetTitle: string,
    content: string[],
    style?: Partial<ExcelJS.Style>,
    options: {
      autoHeight?: boolean;
      qntCellsToMerge?: number;
      height?: number;
    } = {}
  ) {
    this.sheetTitle = sheetTitle;
    this.content = content;
    this.style = style || this.getDefaultStyle();
    this.autoHeight = options.autoHeight || false;
    this.qntCellsToMerge = options.qntCellsToMerge || 0;
    this.fixedHeight = options.height || null;
  }

  private getDefaultStyle(): Partial<ExcelJS.Style> {
    return {
      font: {
        size: 12,
        color: { argb: "FF000000" },
      },
      alignment: {
        vertical: "middle",
        horizontal: "left",
      },
    };
  }

  public addToWorksheet(
    worksheet: ExcelJS.Worksheet,
    startRow: number,
    startCol: number
  ): void {
    this.content.forEach((text, index) => {
      const row = worksheet.getRow(startRow + index);
      const cell = row.getCell(startCol);
      cell.value = text;
      cell.style = this.style;

      if (this.qntCellsToMerge > 1) {
        worksheet.mergeCells(
          startRow + index,
          startCol,
          startRow + index,
          startCol + this.qntCellsToMerge - 1
        );
      }

      if (this.autoHeight) {
        const fontSize = this.style.font?.size || 12;
        this.style.alignment!.wrapText = true;
        const charsPerLine =
          (fontSize > 12 ? 30 : 40) - this.qntCellsToMerge * 5;
        const textLines = Math.ceil(text.length / charsPerLine);
        const lineHeight = 15;
        row.height = textLines * lineHeight;
      } else if (this.fixedHeight) {
        row.height = this.fixedHeight;
      }
    });
  }
}
