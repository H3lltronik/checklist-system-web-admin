import dayjs from "dayjs";

export const alphabetically = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

type DateToSort = string | Date;
export const chronologically = (a: DateToSort, b: DateToSort) => {
  const aDate = dayjs(a).toDate();
  const bDate = dayjs(b).toDate();
  if (aDate > bDate) {
    return 1;
  }
  if (aDate < bDate) {
    return -1;
  }
  return 0;
};

export const defaultSortDirections: string[] = ["ascend", "descend"];
