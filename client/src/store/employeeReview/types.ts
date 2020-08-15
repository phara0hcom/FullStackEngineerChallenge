export type Reviews = Array<{
  date: number;
  reviewer: string;
  reviewText: string;
}>;

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastReview: number;
  reviews: Reviews;
  assignTo: string;
}

export interface EmployeeReviewStoreActions {
  type: string;
  payload: {};
}

export interface EmployeeReviewStore {
  loadingList: true;
  loadingEmployee: true;
  employees: [];
  selected: {};
}
