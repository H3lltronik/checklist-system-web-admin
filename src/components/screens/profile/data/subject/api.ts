import { Subject } from "@/@types/api/entities";
import { LOCAL_STORAGE_TOKEN_KEY } from "@/auth";

export const getSubjectList = async () => {
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  const url = "/api/auth/subject";
  const data = await fetch(url, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  }).then((res) => res.json());

  return data as Subject[];
};
