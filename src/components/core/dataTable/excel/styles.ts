import ExcelJS from "exceljs";
import { argbColor } from "./table_blocks/DefaultExcelTableBlock";

const normalText: Partial<ExcelJS.Style> = {
  font: { size: 11, color: { argb: argbColor("#000000") } },
  alignment: { horizontal: "left", wrapText: true },
  fill: {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: argbColor("#fff") },
  },
  border: {
    top: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
    left: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
    bottom: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
    right: { style: "thin", color: { argb: argbColor("#CFCFCF") } },
  },
};

export const textStyles = {
  normal: normalText,
};

export function splitTextIntoLines(
  text: string,
  maxLines: number = 3,
  maxLength: number = 255
): string[] {
  if (text.length <= maxLength) {
    return [text];
  }

  const maxLineLength = Math.ceil(text.length / maxLines);
  let lines: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = Math.min(startIndex + maxLineLength, text.length);
    if (
      endIndex < text.length &&
      text[endIndex] !== " " &&
      text[endIndex - 1] !== " "
    ) {
      while (endIndex > startIndex && text[endIndex] !== " ") {
        endIndex--;
      }
    }

    if (endIndex === startIndex) {
      endIndex = startIndex + maxLineLength;
    }

    lines.push(text.substring(startIndex, endIndex));
    startIndex = endIndex + 1;
  }

  if (lines.length > maxLines) {
    return lines
      .slice(0, maxLines - 1)
      .concat([lines.slice(maxLines - 1).join(" ")]);
  }

  return lines;
}
