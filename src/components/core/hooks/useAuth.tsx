import { createAbilityForUser } from "@/abilities";
import { checkTokenQueryOptions, getToken } from "@/auth";
import { AnyAbility } from "@casl/ability";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useAuthData = () => {
  const { data } = useQuery(checkTokenQueryOptions);
  const ability = createAbilityForUser(data?.user);
  const token = useRef<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      token.current = await getToken();
    };

    loadToken();
  }, []);

  return { user: data?.user, ability: ability as AnyAbility, token: token.current };
};
