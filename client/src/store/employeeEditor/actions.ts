import Constants from "./constants";
import { RawTableData } from "../employeeList/types";

const Actions = {
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
    sending: (sending: boolean) => ({
      type: Constants.EDITOR_SENDING,
      payload: { sending },
    }),
    savedEdit: (id: number) => ({
      type: Constants.EDITOR_EDIT_SAVED,
      payload: { id },
    }),
    loadEditedEmployee: (employee: RawTableData) => ({
      type: Constants.EDITOR_SET_EDITED_EMPLOYEE_FORM,
      payload: { employee },
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
