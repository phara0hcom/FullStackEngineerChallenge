import { fromJS } from "immutable";
import { EmployeeEditorStoreActions, EmployeeEditorStore } from "./types";
import constants, { emptyEmployee } from "./constants";

const defaultState = fromJS({
  loadingEditor: true,
  errorMessage: null,
  employeeForm: emptyEmployee,
  employeeSending: false,
});

export default function employeeList(
  state = defaultState,
  action: EmployeeEditorStoreActions
): EmployeeEditorStore {
  switch (action.type) {
    case constants.EDITOR_SET_LOADING:
      return state.set("loadingEditor", true).set("employeeSending", false);

    case constants.EDITOR_SET_EMPLOYEE_FORM:
      return state
        .set("employeeForm", action.payload?.employee)
        .set("loadingEditor", false)
        .set("employeeSending", false);

    case constants.EDITOR_SET_EDITED_EMPLOYEE_FORM:
      return state
        .set("employeeForm", action.payload?.employee)
        .set("loadingEditor", true);

    case constants.EDITOR_CHANGE_FORM: {
      const input = action.payload?.input;
      if (!input) return state;
      return state.set("employeeForm", {
        ...state.get("employeeForm"),
        [input]: action.payload?.value,
      });
    }

    case constants.EDITOR_SENDING:
      return state.set("employeeSending", action.payload?.sending);

    case constants.EDITOR_EDIT_SAVED:
      return state
        .set("employeeForm", {
          ...state.get("employeeForm"),
          id: action.payload?.id,
        })
        .set("loadingEditor", false);

    case constants.EDITOR_SHOW_ERROR:
      return state.set("errorMessage", action.payload?.error || null);

    case constants.EDITOR_HIDE_ERROR:
      return state.set("errorMessage", null).set("employeeSending", false);

    default:
      return state;
  }
}
