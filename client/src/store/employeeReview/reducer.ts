import { fromJS } from "immutable";
import { EmployeeReviewStoreActions, EmployeeReviewStore } from "./types";

const defaultState = fromJS({
  loadingList: true,
  loadingEmployee: true,
  employees: [],
  selected: {},
});

export default function employeeReview(
  state = defaultState,
  action: EmployeeReviewStoreActions
): EmployeeReviewStore {
  switch (action.type) {
    default:
      return state
  }
}