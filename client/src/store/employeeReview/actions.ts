import Constants from "./constants";
import { Employee } from "./types";

const Actions = {
  employeeList: {
    getList: () => ({
      type: Constants.GET_EMPLOYEES_LIST,
    }),
    putList: (employees: Employee) => ({
      type: Constants.GET_EMPLOYEES_LIST,
      payload: { employees },
    }),
  },
};
