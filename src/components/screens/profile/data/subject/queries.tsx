import { QueryKey, queryOptions } from "@tanstack/react-query";
import { getSubjectList } from "./api";

export const SUBJECT_LIST_QUERY_KEY = "subject_list";

export const subjectQueryOptions = queryOptions({
  queryKey: [SUBJECT_LIST_QUERY_KEY] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getSubjectList(),
});
