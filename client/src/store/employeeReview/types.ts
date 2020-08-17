export interface RawTableData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  manager: string;
  lastReview: null | number;
}

export type Reviews = Array<{
  id: number;
  date: number;
  reviewer: string;
  employee: string;
  reviewText: string;
}>;

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  manager: string;
  lastReview: string;
}

export interface EmployeeReviewStoreActions {
  type: string;
  payload: {
    employees?: Array<RawTableData>;
    employeesObj?: { [key: string]: RawTableData };
    error?: string;
    id?: number;
    employee?: RawTableData;
    input?: string;
    value?: string;
  };
}

export interface EmployeeReviewStore {
  toJS: () => {
    loadingList: boolean;
    loadingEditor: boolean;
    loadingEmployee: boolean;
    employees: Array<RawTableData>;
    employeesObj: { [key: string]: RawTableData };
    employeeForm: RawTableData;
    errorMessage: null | string;
    editAssignId: number;
    employeeSending: boolean | number;
  };
}
