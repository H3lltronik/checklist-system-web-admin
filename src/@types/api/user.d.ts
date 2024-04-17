import { Enterprise, User } from "./entities";

type UserWEnterprises = User & { enterprises: Enterprise[] };

export type GetUserListResponse = UserWEnterprises[];
export type GetUserResponse = UserWEnterprise;

export type UserProfileDetails = {
  id: number;
  name: string;
  pictureUrl: string;
  isActivated: boolean;
};
