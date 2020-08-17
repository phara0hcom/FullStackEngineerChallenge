import Constants from "./constants";
import { RawTableData } from "./types";

const Actions = {
  employeeList: {
    getList: () => ({
      type: Constants.GET_EMPLOYEES_LIST,
    }),
    putList: (
      employees: Array<RawTableData>,
      employeesObj: { [key: string]: RawTableData }
    ) => ({
      type: Constants.PUT_EMPLOYEES_LIST,
      payload: { employees, employeesObj },
    }),
    showError: (error: string) => ({
      type: Constants.SHOW_ERROR_EMPLOYEES_LIST,
      payload: { error },
    }),
    hideError: () => ({
      type: Constants.SHOW_ERROR_EMPLOYEES_LIST,
    }),
  },
  editor: {
    setLoading: () => ({
      type: Constants.EDITOR_SET_LOADING,
    }),
    loadEmployee: (employee: RawTableData) => ({
      type: Constants.EDITOR_SET_EMPLOYEE_FORM,
      payload: { employee },
    }),
    editForm: (
      input: "firstName" | "lastName" | "email" | "manager",
      value: string
    ) => ({
      type: Constants.EDITOR_CHANGE_FORM,
      payload: { input, value },
    }),
    sending: () => ({
      type: Constants.EDITOR_SENDING,
    }),
    savedEdit: (id: number) => ({
      type: Constants.EDITOR_EDIT_SAVED,
      payload: { id },
    }),
    showError: (error: string) => ({
      type: Constants.EDITOR_SHOW_ERROR,
      payload: { error },
    }),
    hideError: () => ({
      type: Constants.EDITOR_HIDE_ERROR,
    }),
  },
};

export default Actions;
