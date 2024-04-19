import { QueryKeys } from "@/@types/queries";
import { QueryKey, queryOptions } from "@tanstack/react-query";
import { getSubjectList } from "./api";

export const subjectQueryOptions = queryOptions({
  queryKey: [QueryKeys.SUBJECT_LIST] as QueryKey,
  staleTime: 15 * 1000, // 15 segundos
  refetchOnWindowFocus: false,
  queryFn: () => getSubjectList(),
});
