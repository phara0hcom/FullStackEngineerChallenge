import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import { Employee, RawTableData } from "../../store/employeeList/types";
import { RootStore } from "../../store/rootReducer";
import employeeListActions from "../../store/employeeList/actions";
import { getListCall, deleteById } from "../../store/employeeList/thunkFunc";

import { unixToFormattedDate } from "../../utils/dateUtils";

import Section from "../../components/Layout/Section";
import Loading from "../../components/Layout/Loading";
import StripeTable from "../../components/Table/StripeTable";
import ConfirmModal from "../../components/Layout/ConfirmModal";
import AlertDismiss from "../../components/Layout/AlertDismiss";

interface ListReduxProps {
  loadingList: boolean;
  errorMessage: null | string;
  employees: Array<RawTableData>;
}

const mapStateToProps = (state: RootStore): ListReduxProps => {
  const employeeListJS = state.employeeList.toJS();

  return {
    loadingList: employeeListJS.loadingList,
    errorMessage: employeeListJS.errorMessage,
    employees: employeeListJS.employees,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ListProps = PropsFromRedux;

const List: React.SFC<ListProps> = ({
  loadingList,
  errorMessage,
  employees,
}) => {
  const dispatch = useDispatch();
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
    dispatch(deleteById(id));
    hideDeleteModal();
  };

  const addButtons = (id: number) => (
    <ButtonGroup>
      <Button size="sm" variant="primary" as={Link} to={`/edit/${id}`}>
        Edit
      </Button>
      <Button size="sm" variant="danger" onClick={deleteRow(id)}>
        Delete
      </Button>
    </ButtonGroup>
  );

  const dismissAlert = () => {
    dispatch(employeeListActions.employeeList.hideError());
  };

  const processEmployeeTable = (
    rawData: Array<RawTableData>
  ): Array<Employee & { buttons: JSX.Element }> =>
    rawData.map((row) => {
      const lastReview = row.lastReview;
      const id = row.id;

      return {
        ...row,
        manager: row.manager || "",
        lastReview: lastReview ? unixToFormattedDate(lastReview) : "",
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
            { name: "Manager", key: "manager" },
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
