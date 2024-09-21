import { AbilityBuilder, createMongoAbility, MongoAbility } from "@casl/ability";
import { UserPermissions } from "./@types/auth";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
}

export enum Subjects {
  FileChecklist = "file_checklist",
  Assignations = "assignation",
  Enterprise = "enterprise",
  User = "user",
  Role = "role",
  All = "all",
}

export type AppAbility = MongoAbility<[Action, Subjects]>;

export const createAbilityForUser = (user?: UserPermissions): AppAbility => {
  if (!user) {
    return new AbilityBuilder<AppAbility>(createMongoAbility).build();
  }

  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  user.permissions.forEach((permission) => {
    const [subject, action] = permission.split(":");

    builder.can(action as Action, subject as Subjects);
  });

  return builder.build();
};
