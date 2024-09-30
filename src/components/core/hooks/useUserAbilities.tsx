import { createAbilityForUser } from '@/abilities';
import { checkTokenQueryOptions } from '@/auth';
import { useQuery } from '@tanstack/react-query';

export const useUserAbilities = () => {
    const { data: user } = useQuery(checkTokenQueryOptions);
    const ability = createAbilityForUser(user?.user);

    return {
        ability
    }
}
