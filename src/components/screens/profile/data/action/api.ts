import { Action } from "@/@types/api/entities";
import { httpRequest } from "@/http/http-client";

export const getActionList = async () => {
  const result = await httpRequest<Action[]>({
    url: "/api/action",
    method: "GET",
  });

  return result.data;
};
