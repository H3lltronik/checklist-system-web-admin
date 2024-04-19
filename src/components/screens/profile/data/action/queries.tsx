import { QueryKeys } from "@/@types/queries";
import { QueryKey, queryOptions } from "@tanstack/react-query";
import { getActionList } from "./api";

export const actionQueryOptions = queryOptions({
  queryKey: [QueryKeys.ACTION_LIST] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getActionList(),
});
