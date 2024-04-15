import { QueryKey, queryOptions } from "@tanstack/react-query";
import { getActionList } from "./api";

export const ACTION_LIST_QUERY_KEY = "action_list";

export const actionQueryOptions = queryOptions({
  queryKey: [ACTION_LIST_QUERY_KEY] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getActionList(),
});
