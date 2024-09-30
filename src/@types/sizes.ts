export enum SizeSuffix {
  BYTES = "bytes",
  KILOBYTES = "kilobytes",
  MEGABYTES = "megabytes",
  GIGABYTES = "gigabytes",
}

export const SizeSuffixWLabels = {
  [SizeSuffix.BYTES]: "B",
  [SizeSuffix.KILOBYTES]: "KB",
  [SizeSuffix.MEGABYTES]: "MB",
  [SizeSuffix.GIGABYTES]: "GB",
}