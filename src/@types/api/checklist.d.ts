import { GetListResponse } from ".";
import { FileChecklist } from "./entities";

export type GetChecklistListResponse = GetListResponse<FileChecklist>;

export type GetChecklistResponse = FileChecklist