import { Permission, Role, User } from "./entities";

export type GetRolesListResponse = RoleListItem[];

export type RoleListItem = {
  permissions: Permission[];
  permissionsTxt: string[];
} & Role;

export type GetRoleResponse = { users: User[]; permissions: Permission[] } & Role;
