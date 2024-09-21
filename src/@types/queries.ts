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
  PERIODS: "periods",
} as const;

export type AppQueries = (typeof QueryKeys)[keyof typeof QueryKeys];
