import Constants from "./constants";
import { RawTableData } from "./types";

const Actions = {
  employeeList: {
    getList: () => ({
      type: Constants.GET_EMPLOYEES_LIST,
    }),
    putList: (employees: Array<RawTableData>) => ({
      type: Constants.PUT_EMPLOYEES_LIST,
      payload: { employees },
    }),
    showError: (error: string) => ({
      type: Constants.SHOW_ERROR_EMPLOYEES_LIST,
      payload: { error },
    }),
    hideError: () => ({
      type: Constants.SHOW_ERROR_EMPLOYEES_LIST,
    }),
  },
};

export default Actions;
