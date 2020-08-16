import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import { Employee, RawTableData } from "../../store/employeeReview/types";
import { RootStore } from "../../store/rootReducer";
import employeeReviewActions from "../../store/employeeReview/actions";
import {
  getListCall,
  changeAssigneeThunk,
  deleteById,
} from "../../store/employeeReview/thunkFunc";

import { unixToFormattedDate } from "../../utils/dateUtils";
import { stringToJSON } from "../../utils/dataUtils";

import Section from "../../components/Layout/Section";
import Loading from "../../components/Layout/Loading";
import StripeTable from "../../components/Table/StripeTable";
import ConfirmModal from "../../components/Layout/ConfirmModal";
import AlertDismiss from "../../components/Layout/AlertDismiss";

interface ListReduxProps {
  loadingList: boolean;
  errorMessage: null | string;
  employees: Array<RawTableData>;
  employeesObj: { [key: string]: RawTableData };
  editAssignId: number;
  editAssignSaving: boolean;
}

const mapStateToProps = (state: RootStore): ListReduxProps => {
  const employeeReviewJS = state.employeeReview.toJS();

  return {
    loadingList: employeeReviewJS.loadingList,
    errorMessage: employeeReviewJS.errorMessage,
    employees: employeeReviewJS.employees,
    employeesObj: employeeReviewJS.employeesObj,
    editAssignId: employeeReviewJS.editAssignId,
    editAssignSaving: employeeReviewJS.editAssignSaving,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ListProps = PropsFromRedux;

const List: React.SFC<ListProps> = ({
  loadingList,
  errorMessage,
  employees,
  employeesObj,
  editAssignId,
  editAssignSaving,
}) => {
  const dispatch = useDispatch();
  const [editAssignInputVal, changeAssignInput] = useState("");
  const [deleteModal, setDeleteModal] = useState({ show: false, id: -1 });

  useEffect(() => {
    if (loadingList) {
      dispatch(getListCall());
    }
    // only run on Loading on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteRow = (id: number) => () => {
    // show model
    setDeleteModal({ show: true, id });
  };

  const hideDeleteModal = () => {
    setDeleteModal({ show: false, id: -1 });
  };

  /**
   * When you press delete on
   * @param id {number} employee ID
   */
  const confirmDelete = (id: number) => () => {
    hideDeleteModal();
    dispatch(deleteById(id));
  };

  const editAssign = (id: number) => () => {
    console.log(employeesObj);
    const assignTo = employeesObj[`${id}`].assignTo || "";
    changeAssignInput(assignTo);
    dispatch(employeeReviewActions.assign.changeId(id));
  };

  const addButtons = (id: number) => (
    <ButtonGroup>
      <Button size="sm" variant="primary" as={Link} to={`/edit/${id}`}>
        Edit
      </Button>
      <Button size="sm" variant="danger" onClick={deleteRow(id)}>
        Delete
      </Button>
      <Button size="sm" variant="success" onClick={editAssign(id)}>
        Assign to
      </Button>
    </ButtonGroup>
  );

  const saveAssignTo = (id: number) => () => {
    const oldData = employeesObj[`${id}`];
    // save to DB
    dispatch(
      changeAssigneeThunk(id, {
        ...oldData,
        assignTo: editAssignInputVal,
      })
    );
  };

  const dismissAlert = () => {
    dispatch(employeeReviewActions.employeeList.hideError());
  };

  const assignToInput = (id: number) => (
    <InputGroup className="mb-3">
      <FormControl
        disabled={editAssignSaving}
        placeholder="Manager Name"
        aria-label="Manager Name"
        aria-describedby="basic-addon2"
        value={editAssignInputVal}
        onChange={(event) => changeAssignInput(event.target.value)}
      />
      <InputGroup.Append>
        <Button
          disabled={editAssignSaving}
          onClick={saveAssignTo(id)}
          variant="outline-secondary"
        >
          {editAssignSaving ? "Saving" : "Save"}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );

  const processEmployeeTable = (
    rawData: Array<RawTableData>
  ): Array<
    Employee & { buttons: JSX.Element; assignTo: JSX.Element | string }
  > =>
    rawData.map((row) => {
      const lastReview = row.lastReview;
      let assignTo: JSX.Element | string = row.assignTo || "";
      const reviews = row.reviews;
      const id = row.id;

      if (id === editAssignId) {
        assignTo = assignToInput(id);
      }
      return {
        ...row,
        lastReview: lastReview ? unixToFormattedDate(lastReview) : "",
        assignTo: assignTo ? assignTo : "",
        reviews: stringToJSON(reviews),
        buttons: addButtons(id),
      };
    });

  return (
    <Section>
      <h1>List</h1>
      {errorMessage ? (
        <AlertDismiss
          dismissAlert={dismissAlert}
          heading="An error occurred"
          body={`Error: ${errorMessage}`}
        />
      ) : null}
      {loadingList ? (
        <Loading isLocal />
      ) : (
        <StripeTable
          headers={[
            { name: "id", key: "id" },
            { name: "Last review", key: "lastReview" },
            { name: "Last name", key: "lastName" },
            { name: "First name", key: "firstName" },
            { name: "email", key: "email" },
            { name: "Assigned to", key: "assignTo" },
            { name: "Edit", key: "buttons" },
          ]}
          data={processEmployeeTable(employees)}
        />
      )}
      <ConfirmModal
        show={deleteModal.show}
        handleClose={hideDeleteModal}
        handleConfirm={confirmDelete(deleteModal.id)}
        heading={`Deleting id: ${deleteModal.id}`}
        body={`Are sure you want to Delete id: ${deleteModal.id}, press Delete to confirm`}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </Section>
  );
};

export default connector(List);
