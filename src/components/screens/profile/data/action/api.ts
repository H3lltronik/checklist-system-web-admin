import { Action } from "@/@types/api/entities";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";

export const getActionList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "http://localhost:3002/auth/action";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as Action[];
};
