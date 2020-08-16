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
      dispatch(actions.employeeList.failList(err.message));
    });
};

export const changeAssigneeThunk = (id: number): AppThunk => (dispatch) => {
  dispatch(actions.assign.changeSaving());
};
