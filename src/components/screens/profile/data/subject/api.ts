import { Subject } from "@/@types/api/entities";
import { httpRequest } from "@/http/http-client";

export const getSubjectList = async () => {
  const result = await httpRequest<Subject[]>({
    url: "/api/subject",
    method: "GET",
  });

  return result.data;
};
