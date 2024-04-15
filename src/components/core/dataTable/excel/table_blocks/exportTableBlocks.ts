import { IBlock } from "@/@types/excel";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type ExportBlock = {
  block: IBlock | null;
  startRow: number;
  startCol: number;
};

export async function exportBlocks({
  blocks,
  filename,
}: {
  blocks: ExportBlock[];
  filename: string;
}): Promise<void> {
  const workbook = new ExcelJS.Workbook();

  blocks.forEach((block) => {
    if (block.block) {
      let worksheet = workbook.getWorksheet(block.block.sheetTitle);
      if (!worksheet) {
        worksheet = workbook.addWorksheet(block.block.sheetTitle);
      }
      block.block.addToWorksheet(worksheet, block.startRow, block.startCol);
    }
  });

  workbook.xlsx.writeBuffer().then(function (buffer) {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, filename);
  });
}
