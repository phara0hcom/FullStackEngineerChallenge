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
    failList: (error: string) => ({
      type: Constants.FAILED_EMPLOYEES_LIST,
      payload: { error },
    }),
  },
  assign: {
    changeId: (editAssignId: number) => ({
      type: Constants.CHANGE_ASSIGNEE_INFO,
      payload: { editAssignId },
    }),
    changeSaving: () => ({
      type: Constants.CHANGE_SAVING_ASSIGNEE,
    }),
    changesSaved: () => ({
      type: Constants.CHANGED_ASSIGNEE_SAVED,
    }),
    changesFailed: (error: string) => ({
      type: Constants.FAILED_CHANGE_ASSIGNEE,
      payload: { error },
    }),
  },
};

export default Actions;
