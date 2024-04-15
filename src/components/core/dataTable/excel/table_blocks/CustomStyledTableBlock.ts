import { Column } from "@/@types/excel";
import ExcelJS from "exceljs";
import { DefaultExcelTableBlock, argbColor } from "./DefaultExcelTableBlock";

export class CustomStyledTableBlock extends DefaultExcelTableBlock {
  protected getHeaderStyle(): Partial<ExcelJS.Style> {
    const style: Partial<ExcelJS.Style> = {
      font: {
        bold: false,
        color: { argb: argbColor("#000") },
        size: 12,
      },
      alignment: {
        vertical: "middle",
        horizontal: "center",
      },
      border: {
        top: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
        left: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
        bottom: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
        right: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
      },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: argbColor("#F5F5F5") },
      },
    };
    return style;
  }

  protected getColumnStyle(column: Column): Partial<ExcelJS.Style> {
    let styleResult: Partial<ExcelJS.Style> = {};

    if (column.align) {
      switch (column.align) {
        case "left": {
          styleResult = {
            ...styleResult,
            ...{ alignment: { horizontal: "left" } },
          };
          break;
        }
        case "right": {
          styleResult = {
            ...styleResult,
            ...{ alignment: { horizontal: "right" } },
          };
          break;
        }
        case "center": {
          styleResult = {
            ...styleResult,
            ...{ alignment: { horizontal: "center" } },
          };
          break;
        }
      }
    }

    const dataStyle = this.getDataStyle(column.dataType);
    styleResult = { ...styleResult, ...dataStyle };

    return styleResult;
  }

  protected getDataStyle(dataType: string): Partial<ExcelJS.Style> {
    let styleResult: Partial<ExcelJS.Style> = {};

    switch (dataType) {
      case "money": {
        const style: Partial<ExcelJS.Style> = {
          numFmt: '"$"#,##0.00;[Red]"-$"#,##0.00',
          font: { color: { argb: argbColor("#000") } },
        };
        styleResult = { ...styleResult, ...style };
        break;
      }
      case "time": {
        const style: Partial<ExcelJS.Style> = {
          numFmt: "h:mm:ss",
          font: { color: { argb: argbColor("#000") } },
        };
        styleResult = { ...styleResult, ...style };
        break;
      }
      case "number": {
        const style: Partial<ExcelJS.Style> = {
          numFmt: "#,##0.00",
          font: { color: { argb: argbColor("#000") } },
        };
        styleResult = { ...styleResult, ...style };
        break;
      }
      case "string":
      default:
        break;
    }
    return styleResult;
  }
}
