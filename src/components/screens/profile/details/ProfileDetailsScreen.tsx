import { GetRoleResponse } from "@/@types/api/roles";
import { ProfileDetails } from "./ProfileDetails";

interface ProfileDetailsProps {
  data: GetRoleResponse;
}

export const ProfileDetailsScreen = (props: ProfileDetailsProps) => {
  return (
    <div>
      <ProfileDetails data={props.data} />
    </div>
  );
};
