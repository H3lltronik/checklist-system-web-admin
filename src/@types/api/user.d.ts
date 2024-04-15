import { Enterprise, User } from "./entities";

type UserWEnterprises = User & { enterprises: Enterprise[] };

export type GetUserListResponse = UserWEnterprises[];
export type GetUserResponse = UserWEnterPrise;
