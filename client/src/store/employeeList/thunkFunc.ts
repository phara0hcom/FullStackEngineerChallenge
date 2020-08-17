import axios from "../../constants/axios";
import actions from "./actions";
import { AppThunk } from "../rootReducer";
import { RawTableData } from "./types";
import { AxiosResponse } from "axios";

export const getListCall = (): AppThunk => (dispatch) => {
  dispatch(actions.employeeList.getList());
  axios
    .get("/employee")
    .then((res: AxiosResponse<Array<RawTableData>>) => {
      dispatch(actions.employeeList.putList(res.data));
    })
    .catch((err) => {
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
