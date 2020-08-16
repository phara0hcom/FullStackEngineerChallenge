import axios from "../../constants/axios";
import actions from "./actions";
import { AppThunk } from "../rootReducer";
import { RawTableData } from "./types";
import { AxiosResponse } from "axios";

export const getListCall = (): AppThunk => (dispatch) => {
  dispatch(actions.employeeList.getList());
  axios
    .get("")
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

export const changeAssigneeThunk = (
  id: number,
  newData: RawTableData
): AppThunk => (dispatch) => {
  dispatch(actions.assign.changeSaving());
  axios
    .put(`/${id}`, newData)
    .then((res) => {
      console.log({ res });
      dispatch(actions.assign.changesSaved());
    })
    .catch((err) => {
      console.log({ err });
      dispatch(actions.employeeList.showError(err.message));
    });
};

export const deleteById = (id: number): AppThunk => (dispatch) => {
  dispatch(actions.employeeList.getList());
  axios
    .delete(`/${id}`)
    .then((res) => {
      console.log({ res });
      dispatch(getListCall());
    })
    .catch((err) => {
      console.log({ err });
      dispatch(actions.employeeList.showError(err.message));
    });
};
