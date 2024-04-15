import { Suspense } from "react";
import { ProfileDetails } from "../profile/details/ProfileDetails";

export const ProfileDetailsScreen = () => {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <ProfileDetails />
      </Suspense>
    </div>
  );
};
