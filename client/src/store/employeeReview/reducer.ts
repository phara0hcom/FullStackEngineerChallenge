import { fromJS } from "immutable";
import { EmployeeReviewStoreActions, EmployeeReviewStore } from "./types";
import constants, { emptyEmployee } from "./constants";

const defaultState = fromJS({
  loadingList: true,
  loadingEditor: true,
  errorMessage: null,
  loadingEmployee: true,
  employees: [],
  employeesObj: {},
  employeeForm: emptyEmployee,
  employeeSending: false,
});

export default function employeeReview(
  state = defaultState,
  action: EmployeeReviewStoreActions
): EmployeeReviewStore {
  switch (action.type) {
    case constants.GET_EMPLOYEES_LIST:
      return state.set("loadingList", true);

    case constants.PUT_EMPLOYEES_LIST:
      return state
        .set("loadingList", false)
        .set("employees", fromJS(action.payload?.employees || []))
        .set("employeesObj", fromJS(action.payload?.employeesObj));

    case constants.SHOW_ERROR_EMPLOYEES_LIST:
      return state
        .set("loadingList", false)
        .set("errorMessage", action.payload?.error || null);

    case constants.HIDE_ERROR_EMPLOYEES_LIST:
      return state.set("loadingList", false).set("errorMessage", null);

    case constants.EDITOR_SET_LOADING:
      return state.set("loadingEditor", true).set("employeeSending", false);

    case constants.EDITOR_SET_EMPLOYEE_FORM:
      return state
        .set("employeeForm", action.payload?.employee)
        .set("loadingEditor", false);

    case constants.EDITOR_CHANGE_FORM: {
      const input = action.payload?.input;
      if (!input) return state;
      return state.set("employeeForm", {
        ...state.get("employeeForm"),
        [input]: action.payload?.value,
      });
    }

    case constants.EDITOR_SENDING:
      return state.set("employeeSending", true);

    case constants.EDITOR_EDIT_SAVED:
      return state.set("employeeSending", action.payload?.id);

    case constants.EDITOR_SHOW_ERROR:
      return state.set("errorMessage", action.payload?.error || null);

    case constants.EDITOR_HIDE_ERROR:
      return state.set("errorMessage", null).set("employeeSending", -1);

    default:
      return state;
  }
}
