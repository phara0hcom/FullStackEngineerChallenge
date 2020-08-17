export default {
  EDITOR_SET_LOADING: "eEditor/EDITOR_SET_LOADING",
  EDITOR_SET_EMPLOYEE_FORM: "eEditor/EDITOR_SET_EMPLOYEE_FORM",
  EDITOR_CHANGE_FORM: "eEditor/EDITOR_CHANGE_FORM",

  EDITOR_SENDING: "eEditor/EDITOR_SENDING",
  EDITOR_EDIT_SAVED: "eEditor/EDITOR_EDIT_SAVED",

  EDITOR_SHOW_ERROR: "eEditor/EDITOR_SHOW_ERROR",
  EDITOR_HIDE_ERROR: "eEditor/EDITOR_HIDE_ERROR",
};

export const emptyEmployee = {
  id: -1,
  firstName: "",
  lastName: "",
  email: "",
  manager: "",
  lastReview: null,
};
