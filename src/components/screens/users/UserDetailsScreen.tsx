import { User } from "@/@types/api/entities";

import { UserDetails } from "./UserDetails";

type UserDetailsScreenProps = {
  data: User;
};

export const UserDetailsScreen = (props: UserDetailsScreenProps) => {
  return (
    <div>
      <UserDetails data={props.data} />
    </div>
  );
};
