import { RedoOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { AutoComplete, Button, Select, Tooltip } from "antd";
import debounce from "lodash.debounce";
import qs from "qs";
import React, { useCallback, useEffect, useState } from "react";

const { Option } = Select;

/**
 * Props for the `ApiSelect` component.
 * 
 * @template T The type of the data fetched from the API.
 * @template U The type of each item extracted from the fetched data.
 */
interface ApiSelectProps<T, U> {
  /**
   * CSS class name for the select component.
   */
  className?: string;

  /**
   * Placeholder text for the select component.
   */
  placeholder?: string;

  /**
   * Function to extract an array of items from the fetched data.
   * 
   * @param data - The fetched data from which to extract items.
   * @returns An array of extracted items.
   */
  itemExtractor: (data: T) => U[] | undefined;

  /**
   * Function to extract a unique key for each item.
   * 
   * @param item - An individual item from which to extract the key.
   * @returns The unique key for the item.
   */
  keyExtractor: (item: U) => string | number;

  /**
   * Function to extract the label to display for each item in the select dropdown.
   * 
   * @param item - An individual item from which to extract the label.
   * @returns The label to display in the select.
   */
  labelExtractor: (item: U) => React.ReactNode;

  /**
   * Function to extract the value for each item in the select dropdown.
   * 
   * @param item - An individual item from which to extract the value.
   * @returns The value to use in the select.
   */
  valueExtractor: (item: U) => string | number;

  /**
   * The current value of the select component.
   */
  value?: string | number;

  /**
   * Callback function that is called when the selected value changes.
   * 
   * @param value - The newly selected value.
   */
  onChange?: (value: string | number) => void;

  /**
   * If true, the select component is disabled.
   */
  disabled?: boolean;

  /**
   * Custom renderer for each option in the select dropdown.
   * 
   * @param item - The item to render.
   * @returns A React node to display as an option.
   */
  optionRenderer?: (item: U) => React.ReactNode;

  /**
   * Endpoints configuration for fetching data.
   */
  endpoints: {
    /**
     * Configuration for fetching all data without any search.
     */
    simpleFindAll?: {
      /**
       * The API endpoint to fetch data.
       */
      endpoint: string;

      /**
       * The unique query key used by React Query for caching and refetching.
       */
      queryKey: string[];

      /**
       * If true, refetches the data when the window regains focus.
       */
      refetchOnWindowFocus?: boolean;

      /**
       * Time in milliseconds for which the fetched data remains fresh.
       */
      staleTime?: number;

      /**
       * If true, enables the use of the `enabled` prop for the query function.
       */
      enabled?: boolean;
    };

    /**
     * Configuration for fetching data with search functionality.
     */
    search?: {
      /**
       * The API endpoint to perform a search.
       */
      endpoint: string;

      /**
       * The unique query key used by React Query for caching and refetching.
       */
      queryKey: string[];

      /**
       * The name of the search parameter to append to the search query.
       */
      searchParamName: string;

      /**
       * The search parameters to append to the search query.
       */
      searchParams?: Record<string, unknown>;

      /**
       * Time in milliseconds to debounce the search input.
       */
      debounceTime: number;

      /**
       * Time in milliseconds for which the fetched data remains fresh.
       */
      staleTime?: number;

      /**
       * If true, refetches the data when the window regains focus.
       */
      refetchOnWindowFocus?: boolean;

      /**
       * If true, enables the use of the `enabled` prop for the query function.
       */
      enabled?: boolean;

      /**
       * Configuration for fetching the initial data when a specific value is already selected.
       */
      initialFetch: {
        /**
         * The API endpoint to fetch the initial item data.
         */
        endpoint: string;

        /**
         * The unique query key used by React Query for caching and refetching the initial data.
         */
        queryKey: string[];

        /**
         * If true, enables the use of the `enabled` prop for the query function.
         */
        enabled?: boolean;
      };
    };
  };
}


async function fetchItems<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const ApiSelect = <T, U>(props: ApiSelectProps<T, U>) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [, setSelectedItem] = useState<U | null>(null);

  const simpleFindAll = props.endpoints?.simpleFindAll;
  const search = props.endpoints?.search;

  const simpleQuery = useQuery<T, Error>({
    queryKey: simpleFindAll?.queryKey || [],
    queryFn: () => fetchItems<T>(simpleFindAll!.endpoint),
    enabled: simpleFindAll !== undefined && !props.disabled,
    refetchOnWindowFocus: simpleFindAll?.refetchOnWindowFocus ?? false,
    staleTime: simpleFindAll?.staleTime ?? 0,
  });

  const searchParams = search?.searchParams ? `&${qs.stringify(search.searchParams)}` : "";

  const searchQuery = useQuery<T, Error>({
    queryKey: [search?.queryKey, searchTerm],
    queryFn: () => fetchItems<T>(`${search!.endpoint}?${search!.searchParamName}=${searchTerm}&${searchParams}`),
    enabled: !!search && searchTerm.length > 0,
    refetchOnWindowFocus: search?.refetchOnWindowFocus ?? false,
    staleTime: search?.staleTime ?? 0,
  });

  const initialFetchQuery = useQuery<T, Error>({
    queryKey: search?.initialFetch.queryKey || [],
    queryFn: () => fetchItems<T>(search!.initialFetch.endpoint),
    enabled: !!search && !searchTerm && !!props.value && props.endpoints?.search?.initialFetch?.enabled,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (initialFetchQuery.data && props.value) {
      const items = props.itemExtractor(initialFetchQuery.data);
      console.log("[ApiSelect] initialFetchQuery", initialFetchQuery.data);
      console.log("[ApiSelect] items", items);
      const item = items?.find((i) => props.valueExtractor(i) === props.value);
      setSelectedItem(item || null);
      if (item) {
        setInputValue(props.labelExtractor(item) as string); // Establecer inputValue con el label del item seleccionado
      }
    }
  }, [initialFetchQuery.data, props, props.value]);

  // Crear una función debounced para el término de búsqueda
  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => setSearchTerm(value), search?.debounceTime || 300),
    [search?.debounceTime]
  );

  const handleInputChange = (value: string) => {
    setInputValue(value); // Actualizar inputValue con lo que escribe el usuario
    debouncedSetSearchTerm(value); // Actualizar searchTerm con debounce
  };

  const handleSelect = (value: string | number) => {
    const item = items?.find((i) => props.valueExtractor(i) === value);
    setSelectedItem(item || null);
    setInputValue(item ? (props.labelExtractor(item) as string) : ""); // Mostrar el label en el input después de seleccionar
    props.onChange?.(value);
  };

  const items =
    searchTerm && searchQuery.data
      ? props.itemExtractor(searchQuery.data)
      : !searchTerm && initialFetchQuery.data
      ? props.itemExtractor(initialFetchQuery.data)
      : simpleQuery.data
      ? props.itemExtractor(simpleQuery.data)
      : [];

  const refetch = () => {
    simpleQuery.refetch();
    searchQuery.refetch();
    initialFetchQuery.refetch();
  };

  const simpleLoading = simpleQuery.isLoading || simpleQuery.isFetching || simpleQuery.isRefetching;
  const searchLoading = searchQuery.isLoading || searchQuery.isFetching || searchQuery.isRefetching;

  const renderOptions = () => {
    return items?.map((item) =>
      props.optionRenderer ? (
        <Option key={props.keyExtractor(item)} value={props.valueExtractor(item)}>
          {props.optionRenderer(item)}
        </Option>
      ) : (
        <Option key={props.keyExtractor(item)} value={props.valueExtractor(item)}>
          {props.labelExtractor(item)}
        </Option>
      )
    );
  };

  const defaultPlaceholder = props.endpoints.search ? "Escribe algo para comenzar a buscar..." : "Seleccionar";

  return search ? (
    <AutoComplete
      disabled={props.disabled}
      value={inputValue} // Usar inputValue para mostrar en el input
      className={props.className}
      onChange={handleInputChange} // Usar handleInputChange para actualizar inputValue y searchTerm
      onSelect={handleSelect} // Manejar la selección del valor
      backfill
      placeholder={props.placeholder ?? defaultPlaceholder}
      options={items?.map((item) => ({
        value: props.valueExtractor(item),
        label: props.optionRenderer ? props.optionRenderer(item) : props.labelExtractor(item),
      }))}
      suffixIcon={<RefreshButton loading={searchLoading} onRefresh={refetch} />}
    />
  ) : (
    <Select
      disabled={props.disabled}
      value={props.value}
      className={props.className}
      onChange={props.onChange}
      showSearch={false}
      loading={simpleLoading}
      suffixIcon={<RefreshButton loading={simpleQuery.isLoading} onRefresh={refetch} />}
    >
      {renderOptions()}
    </Select>
  );
};

type RefreshButtonProps = {
  loading: boolean;
  onRefresh?: () => void;
};

const RefreshButton = (props: RefreshButtonProps) => {
  const { loading } = props;

  const handleRefresh = () => {
    if (props.onRefresh) {
      props.onRefresh();
    }
  };

  return (
    <Tooltip title="Refrescar">
      <Button
        onClick={handleRefresh}
        icon={<RedoOutlined spin={loading} />}
        size="small"
        className="rounded-full text-slate-300 hover:!text-blue-500"
        type="text"
      />
    </Tooltip>
  );
};
