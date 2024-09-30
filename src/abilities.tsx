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
  ScreenAll = "screen:all",
  ScreenMyAssignations = "screen:my_assignations",
  ScreenAdminAssignationList = "screen:admin-assignation-list",
  ScreenAdminAssignationManage = "screen:admin-assignation-manage",
  ScreenAdminFileChecklistList = "screen:admin-file_checklist-list",
  ScreenAdminFileChecklistManage = "screen:admin-file_checklist-manage",
  ScreenAdminEnterpriseList = "screen:admin-enterprise-list",
  ScreenAdminEnterpriseManage = "screen:admin-enterprise-manage",
  ScreenAdminUsersList = "screen:admin-users-list",
  ScreenAdminUsersManage = "screen:admin-users-manage",
  ScreenAdminProfileList = "screen:admin-profile-list",
  ScreenAdminProfileManage = "screen:admin-profile-manage",
  ScreenAdminAssignationDetails = "screen:admin-assignation-details",
  ScreenAdminFileChecklistDetails = "screen:admin-file_checklist-details",
  ScreenAdminEnterpriseDetails = "screen:admin-enterprise-details",
  ScreenAdminUsersDetails = "screen:admin-users-details",
  ScreenAdminProfileDetails = "screen:admin-profile-details",

  MenuAdminSection = "menu:admin-section",
  MenuAdminSecuritySection = "menu:security-section",
}

const adminSubjects = [
  Subjects.ScreenAdminAssignationList,
  Subjects.ScreenAdminAssignationManage,
  Subjects.ScreenAdminFileChecklistList,
  Subjects.ScreenAdminFileChecklistManage,
  Subjects.ScreenAdminEnterpriseList,
  Subjects.ScreenAdminEnterpriseManage,
  Subjects.ScreenAdminUsersList,
  Subjects.ScreenAdminUsersManage,
  Subjects.ScreenAdminProfileList,
  Subjects.ScreenAdminProfileManage,
  Subjects.ScreenAdminAssignationDetails,
  Subjects.ScreenAdminFileChecklistDetails,
  Subjects.ScreenAdminEnterpriseDetails,
  Subjects.ScreenAdminUsersDetails,
  Subjects.ScreenAdminProfileDetails,
];

const securitySubjects = [
  Subjects.ScreenAdminUsersDetails,
  Subjects.ScreenAdminProfileDetails,
];

export type AppAbility = MongoAbility<[Action, Subjects]>;

export const createAbilityForUser = (user?: UserPermissions): AppAbility => {
  if (!user) {
    return new AbilityBuilder<AppAbility>(createMongoAbility).build();
  }

  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  user.permissions.forEach((permission) => {
    const [subject, action] = permission.split("||");

    if (subject === Subjects.ScreenAll && action === Action.Manage) {
      Object.values(Subjects).forEach((subject) => {
        builder.can(Action.Manage, subject);
      });
    }

    if (adminSubjects.includes(subject as Subjects)) {
      builder.can(Action.Manage, Subjects.MenuAdminSection);
    }

    if (securitySubjects.includes(subject as Subjects)) {
      builder.can(Action.Manage, Subjects.MenuAdminSecuritySection);
    }

    builder.can(action as Action, subject as Subjects);
  });

  return builder.build();
};
