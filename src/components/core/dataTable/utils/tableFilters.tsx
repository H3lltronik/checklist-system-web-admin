import { Key } from "antd/es/table/interface";

export function buildUniqueDropdpwnOptions<T>(data: T[], dataIndex: keyof T) {
  try {
    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid data provided");
    }
    if (!dataIndex || typeof dataIndex !== "string") {
      throw new Error("Invalid dataIndex provided");
    }
    return Array.from(new Set(data.map((item) => item[dataIndex]))).map(
      (value) => ({
        text: value,
        value: value,
      })
    );
  } catch (error) {
    console.error(
      "An error occurred while building unique dropdown options:",
      error
    );
    return [];
  }
}

export function isStringIncluded(
  searchString: string,
  targetString: string
): boolean {
  const normalizeString = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const normalizedSearchString = normalizeString(searchString);
  const normalizedTargetString = normalizeString(targetString);

  return normalizedTargetString.includes(normalizedSearchString);
}

// Abstracción para onFilter
export function createSearchLikeOnFilter<T>(
  dataIndex: keyof T
): (value: Key | boolean, record: T) => boolean {
  return (value, record) => {
    const recordValue = record[dataIndex];
    const normalizedRecordValue =
      typeof recordValue === "string" ? recordValue.toString() : "";

    if (typeof value !== "string") {
      console.warn(
        "createSearchLikeOnFilter: Value provided for search is not a string."
      );
      return false;
    }

    return isStringIncluded(value, normalizedRecordValue);
  };
}

export function createBooleanOnFilter<T>(
  dataIndex: keyof T
): (value: Key, record: T) => boolean {
  return (value, record) => {
    const recordValue = record[dataIndex];
    if (typeof recordValue === "boolean") {
      // Convertir el valor de búsqueda a booleano si es un string, asumiendo 'true' para cualquier string no vacío
      const searchValue =
        typeof value === "boolean"
          ? value
          : typeof value === "string" && value.toLowerCase() === "true";

      return recordValue === searchValue;
    }
    return false;
  };
}
