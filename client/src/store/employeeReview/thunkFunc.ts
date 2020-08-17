import axios from "../../constants/axios";
import actions from "./actions";
import { AppThunk } from "../rootReducer";
import { RawTableData } from "./types";
import { AxiosResponse } from "axios";
import { emptyEmployee } from "./constants";

export const getListCall = (): AppThunk => (dispatch) => {
  dispatch(actions.employeeList.getList());
  axios
    .get("/employee")
    .then((res: AxiosResponse<Array<RawTableData>>) => {
      const employeesObj: { [key: string]: RawTableData } = {};
      res.data.forEach((row: RawTableData) => {
        employeesObj[`${row.id}`] = { ...row };
      });

      console.log({ employeesObj });
      dispatch(actions.employeeList.putList(res.data, employeesObj));
    })
    .catch((err) => {
      dispatch(actions.employeeList.showError(err.message));
    });
};

export const changeEmployeeThunk = (
  id: number,
  newData: RawTableData
): AppThunk => (dispatch) => {
  dispatch(actions.editor.sending());
  axios
    .put(`/employee/edit/${id}`, newData)
    .then((res) => {
      console.log({ res });
    })
    .catch((err) => {
      console.log({ err });
      dispatch(actions.employeeList.showError(err.message));
    });
};

export const deleteById = (id: number): AppThunk => (dispatch) => {
  dispatch(actions.employeeList.getList());
  axios
    .delete(`/employee/${id}`)
    .then((res) => {
      console.log({ res });
      dispatch(getListCall());
    })
    .catch((err) => {
      console.log({ err });
      dispatch(actions.employeeList.showError(err.message));
    });
};

export const loadEmployee = (id: string | "new"): AppThunk => (dispatch) => {
  if (typeof parseInt(id) !== "number") {
    dispatch(actions.editor.loadEmployee(emptyEmployee));
  } else {
    dispatch(actions.editor.setLoading());
    axios
      .get(`/employee/id/${id}`)
      .then((res: AxiosResponse<Array<RawTableData>>) => {
        console.log({ res });
        if (res.data.length > 0) {
          dispatch(actions.editor.loadEmployee(res.data[0]));
        } else {
          dispatch(actions.editor.loadEmployee(emptyEmployee));
        }
      })
      .catch((err) => {
        console.log({ err });
        dispatch(actions.employeeList.showError(err.message));
      });
  }
};

export const addNewEmployeeThunk = (
  id: number,
  newData: RawTableData
): AppThunk => (dispatch) => {
  dispatch(actions.editor.sending());
  axios
    .put(`/employee/new`, newData)
    .then((res) => {
      console.log({ res });
      dispatch(actions.editor.savedEdit(id));
    })
    .catch((err) => {
      console.log({ err });
      dispatch(actions.employeeList.showError(err.message));
    });
};
