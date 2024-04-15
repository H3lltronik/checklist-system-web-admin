import { RedoOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Select, Tooltip } from "antd";
import React from "react";

const { Option } = Select;

interface ApiSelectProps<T, U> {
  endpoint: string;
  queryKey: string[];
  className?: string;
  itemExtractor: (data: T) => U[];
  keyExtractor: (item: U) => string | number;
  labelExtractor: (item: U) => React.ReactNode;
  valueExtractor: (item: U) => string | number;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

async function fetchItems<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const ApiSelect = <T, U>(props: ApiSelectProps<T, U>) => {
  const { data, error, isLoading, refetch } = useQuery<T, Error>({
    queryKey: props.queryKey,
    queryFn: () => fetchItems<T>(props.endpoint),
  });

  if (error)
    return (
      <Tooltip title="Ocurrio un error">
        <Select disabled />
      </Tooltip>
    );

  const items = props.itemExtractor(data!);

  return (
    <Select
      value={props.value}
      className={props.className}
      onChange={props.onChange}
      showSearch
      optionFilterProp="children"
      suffixIcon={<RefreshButton loading={isLoading} onRefresh={refetch} />}
    >
      {items?.map((item) => (
        <Option key={props.keyExtractor(item)} value={props.valueExtractor(item)}>
          {props.labelExtractor(item)}
        </Option>
      ))}
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
