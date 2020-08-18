import { AxiosResponse } from "axios";

import axios from "../../constants/axios";
import actions from "./actions";
import { AppThunk } from "../rootReducer";
import { RawTableData } from "../employeeList/types";
import { emptyEmployee } from "./constants";

export const changeEmployeeThunk = (
  id: number,
  newData: RawTableData
): AppThunk => (dispatch) => {
  dispatch(actions.editor.sending());
  axios
    .put(`/employee/edit/${id}`, newData)
    .then((res) => {
      dispatch(actions.editor.loadEmployee(newData));
    })
    .catch((err) => {
      dispatch(actions.editor.showError(err.message));
    });
};

export const deleteById = (id: number): AppThunk => (dispatch) => {
  dispatch(actions.editor.setLoading());
  axios
    .delete(`/employee/${id}`)
    .then((res) => {
      dispatch(actions.editor.loadEmployee(emptyEmployee));
    })
    .catch((err) => {
      dispatch(actions.editor.showError(err.message));
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
        if (res.data.length > 0) {
          dispatch(actions.editor.loadEmployee(res.data[0]));
        } else {
          dispatch(actions.editor.loadEmployee(emptyEmployee));
        }
      })
      .catch((err) => {
        dispatch(actions.editor.showError(err.message));
      });
  }
};

export const addNewEmployeeThunk = (newData: RawTableData): AppThunk => (
  dispatch
) => {
  dispatch(actions.editor.sending());
  axios
    .put(`/employee/new`, newData)
    .then((res) => {
      dispatch(actions.editor.savedEdit(parseInt(res.data.id)));
    })
    .catch((err) => {
      dispatch(actions.editor.showError(err.message));
    });
};
