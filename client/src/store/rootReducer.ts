import { combineReducers } from "redux";

import employeeReview from "./employeeReview/reducer";
import { EmployeeReviewStore } from "./employeeReview/types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export interface RootStore {
  employeeReview: EmployeeReviewStore;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStore,
  unknown,
  Action<string>
>;

const rootReducer = combineReducers({
  employeeReview,
});

export default rootReducer;
