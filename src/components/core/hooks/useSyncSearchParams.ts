import { useNavigate, useSearch } from '@tanstack/react-router';
import qs from "qs";
import { useEffect, useRef } from "react";

type DataType = "string" | "boolean" | "stringArray" | "number";

interface SyncParam<T> {
  key: string;
  value: T;
  updater: (value: T) => void;
  dataType: DataType;
}

const isValueEmpty = (value: unknown): boolean => {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0)
  );
};

const useSyncSearchParams = <T>(params: SyncParam<T>[]) => {
  const navigate = useNavigate();
  const searchParams: Record<string, unknown> = useSearch({ from: "/" }); // Hook de TanStack Router para acceder a los params de búsqueda
  const isFirstRender = useRef(true);

  const serializedState = qs.stringify(
    params.reduce<Record<string, string | number | boolean>>((acc, { key, value, dataType }) => {
      if (!isValueEmpty(value)) {
        acc[key] =
          dataType === "stringArray" && Array.isArray(value)
            ? (value as string[]).join(",")
            : (value as string | number | boolean);
      }
      return acc;
    }, {}),
    { skipNulls: true, encode: false }
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Verifica si los params actuales difieren de los serializados
    if (serializedState !== qs.stringify(searchParams, { encode: false })) {
      navigate({
        search: qs.parse(serializedState), // Usa la opción search para pasar los nuevos params
        replace: true, // Similar a lo que hacías con react-router-dom
      });
    }
  }, [navigate, searchParams, serializedState]);

  useEffect(() => {
    params.forEach(({ key, updater, dataType }) => {
      const value = searchParams[key];
      if (!isValueEmpty(value)) {
        const parsedValue = (() => {
          switch (dataType) {
            case "boolean":
              return value === "true";
            case "stringArray":
              return typeof value === "string" ? value.split(",") : [];
            case "number":
              return parseFloat(value as string);
            default:
              return value;
          }
        })();
        updater(parsedValue as T);
      }
    });
  }, [searchParams, params]);
};

export default useSyncSearchParams;
