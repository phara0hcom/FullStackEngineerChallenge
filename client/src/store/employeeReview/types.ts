export interface RawTableData {
  assignTo: null | string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  lastReview: null | number;
  reviews: string;
}

export type Reviews = Array<{
  date: number;
  reviewer: string;
  reviewText: string;
}>;

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  lastReview: string;
  reviews: Reviews | null;
}

export interface EmployeeReviewStoreActions {
  type: string;
  payload: {
    employees?: Array<RawTableData>;
    employeesObj?: { [key: string]: RawTableData };
    error?: string;
    editAssignId?: number;
    editAssignSaving?: boolean;
  };
}

export interface EmployeeReviewStore {
  toJS: () => {
    loadingList: true;
    loadingEmployee: true;
    employees: Array<RawTableData>;
    employeesObj: { [key: string]: RawTableData };
    selected: Employee;
    errorMessage: null | string;
    editAssignId: number;
    editAssignSaving: boolean;
  };
}
