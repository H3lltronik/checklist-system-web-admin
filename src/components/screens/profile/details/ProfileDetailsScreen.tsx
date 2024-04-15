import { Suspense } from "react";
import { ProfileDetails } from "./ProfileDetails";

export const ProfileDetailsScreen = () => {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <ProfileDetails />
      </Suspense>
    </div>
  );
};
