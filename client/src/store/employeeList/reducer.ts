import { fromJS } from "immutable";
import { EmployeeListStoreActions, EmployeeListStore } from "./types";
import constants from "./constants";

const defaultState = fromJS({
  loadingList: true,
  errorMessage: null,
  employees: [],
});

export default function employeeList(
  state = defaultState,
  action: EmployeeListStoreActions
): EmployeeListStore {
  switch (action.type) {
    case constants.GET_EMPLOYEES_LIST:
      return state.set("loadingList", true);

    case constants.PUT_EMPLOYEES_LIST:
      return state
        .set("loadingList", false)
        .set("employees", fromJS(action.payload?.employees || []));

    case constants.SHOW_ERROR_EMPLOYEES_LIST:
      return state
        .set("loadingList", false)
        .set("errorMessage", action.payload?.error || null);

    case constants.HIDE_ERROR_EMPLOYEES_LIST:
      return state.set("loadingList", false).set("errorMessage", null);

    default:
      return state;
  }
}
