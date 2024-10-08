export const QueryKeys = {
  ASSIGNATION_LIST: "assignation_list",
  ENTERPRISE_LIST: "enterprise_list",
  ENTERPRISE_ASSIGNATIONS_LIST: "enterprise_assignation_list",
  ACTION_LIST: "action_list",
  ROLE_LIST: "role_list",
  SUBJECT_LIST: "subject_list",
  USER_LIST: "user_list",
  FILE_CHECKLIST_LIST: "file_checklist_list",
  AUTH_QUERY_KEY: "auth_token",
  AUTH_STATUS_QUERY_KEY: "auth_token_status",
  CHECK_HAS_PASSWORD: "has_password",
  PERIODS: "periods",
} as const;

export const MutationKeys = {
  FILE_UPLOAD: "file_upload",
  AUTH_VERIFY_MFA: "auth_verify_mfa",
}

export type AppQueries = (typeof QueryKeys)[keyof typeof QueryKeys];
