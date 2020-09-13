export const MAX_ALLOWED_COLUMNS = 6;
export const MAX_ALLOWED_TASKS = 30;

export const AT_LIMIT_DIALOG_TITLE = 'Demo Version: Limit Reached';
const AT_LIMIT_DIALOG_MSG_BASE = 'You are viewing a demo version of the app.';
export const AT_LIMIT_DIALOG_MSG__COLUMN =
  `${AT_LIMIT_DIALOG_MSG_BASE} A maximum of ${MAX_ALLOWED_COLUMNS} columns per dashboard is allowed.`;
export const AT_LIMIT_DIALOG_MSG__TASK =
  `${AT_LIMIT_DIALOG_MSG_BASE} A maximum of ${MAX_ALLOWED_TASKS} tasks per dashboard is allowed.`;
