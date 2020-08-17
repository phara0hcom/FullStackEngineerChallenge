import { combineReducers } from "redux";

import employeeList from "./employeeList/reducer";
import employeeEditor from "./employeeEditor/reducer";
import { EmployeeListStore } from "./employeeList/types";
import { EmployeeEditorStore } from "./employeeEditor/types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export interface RootStore {
  employeeList: EmployeeListStore;
  employeeEditor: EmployeeEditorStore;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStore,
  unknown,
  Action<string>
>;

const rootReducer = combineReducers({
  employeeList,
  employeeEditor,
});

export default rootReducer;
