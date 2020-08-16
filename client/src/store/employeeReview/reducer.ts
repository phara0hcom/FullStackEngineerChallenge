import { fromJS } from "immutable";
import { EmployeeReviewStoreActions, EmployeeReviewStore } from "./types";
import constants from "./constants";

const defaultState = fromJS({
  loadingList: true,
  errorMessage: null,
  loadingEmployee: true,
  employees: [],
  employeesObj: {},
  selected: {},
  editAssignId: -1,
  editAssignSaving: false,
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

    case constants.CHANGE_ASSIGNEE_INFO:
      return state.set("editAssignId", action.payload?.editAssignId);

    case constants.CHANGE_SAVING_ASSIGNEE:
      return state.set("editAssignSaving", true);

    case constants.CHANGED_ASSIGNEE_SAVED:
      return state.set("editAssignSaving", false).set("editAssignId", -1);

    default:
      return state;
  }
}
