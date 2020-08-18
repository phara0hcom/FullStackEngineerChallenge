import { RawTableData } from "../employeeList/types";

export interface EmployeeEditorStoreActions {
  type: string;
  payload: {
    employee?: RawTableData;
    id?: string;
    error?: string;
    input?: string;
    value?: string;
    sending?: boolean;
  };
}

export interface EmployeeEditorStore {
  toJS: () => {
    loadingEditor: boolean;
    employeeForm: RawTableData;
    errorMessage: null | string;
    employeeSending: boolean;
  };
}
