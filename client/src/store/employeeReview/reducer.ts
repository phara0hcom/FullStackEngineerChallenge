import { fromJS } from "immutable";
import { EmployeeReviewStoreActions, EmployeeReviewStore } from "./types";
import constants from "./constants";

const defaultState = fromJS({
  loadingList: true,
  loadingError: null,
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

    case constants.FAILED_EMPLOYEES_LIST:
      return state
        .set("loadingList", false)
        .set("loadingError", action.payload?.error || null);

    case constants.CHANGE_ASSIGNEE_INFO:
      return state.set("editAssignId", action.payload?.editAssignId);

    case constants.CHANGE_SAVING_ASSIGNEE:
      return state.set("editAssignSaving", !state.get("editAssignSaving"));

    default:
      return state;
  }
}
