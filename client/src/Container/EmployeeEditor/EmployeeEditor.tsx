import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Section from "../../components/Layout/Section";
import ConfirmModal from "../../components/Layout/ConfirmModal";

import {
  deleteById,
  loadEmployee,
  changeEmployeeThunk,
  addNewEmployeeThunk,
} from "../../store/employeeReview/thunkFunc";
import { RootStore } from "../../store/rootReducer";
import { RawTableData } from "../../store/employeeReview/types";
import employeeReviewActions from "../../store/employeeReview/actions";
import Loading from "../../components/Layout/Loading";

const mapStateToProps = (
  state: RootStore
): {
  loadingEditor: boolean;
  employeeSending: boolean | number;
  employeeForm: RawTableData;
} => {
  const employeeReviewJS = state.employeeReview.toJS();

  return {
    loadingEditor: employeeReviewJS.loadingEditor,
    employeeSending: employeeReviewJS.employeeSending,
    employeeForm: employeeReviewJS.employeeForm,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface PropsFromParent {}

type EditorProps = PropsFromRedux & PropsFromParent;

const EmployeeEditor: React.SFC<EditorProps> = ({
  loadingEditor,
  employeeForm,
  employeeSending,
}) => {
  const [deleteModal, setDeleteModal] = useState({ show: false, id: -1 });

  const paramId = (useParams() as { id: string | "new" }).id;
  const history = useHistory();
  const dispatch = useDispatch();

  const { id, firstName, lastName, email, manager } = employeeForm;

  useEffect(() => {
    dispatch(loadEmployee(paramId));

    if (employeeSending === -1) {
      history.replace("/");
    } else if (typeof employeeSending === "number") {
      history.replace(`/`);
    }

    return () => {
      dispatch(employeeReviewActions.editor.setLoading());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramId, employeeSending]);

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

  const onEditForm = (
    input: "firstName" | "lastName" | "email" | "manager"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(employeeReviewActions.editor.editForm(input, event.target.value));
  };

  const errorInput = (input: string) => {
    if (input.length === 0) {
      return "Please fill in this field";
    }
    if (input.length > 100) {
      return "This field only allows 100 characters";
    }

    return null;
  };

  const validateForm = () => {
    return (
      !errorInput(firstName) &&
      !errorInput(lastName) &&
      !errorInput(email) &&
      !errorInput(manager)
    );
  };

  const saveEmployee = (id: number) => () => {
    if (id > 0) {
      dispatch(changeEmployeeThunk(id, employeeForm));
    } else {
      // save new
      dispatch(addNewEmployeeThunk(id, employeeForm));
    }
  };

  return (
    <Section>
      <h1>Edit　Employee</h1>
      <div>
        {loadingEditor ? (
          <Loading isLocal />
        ) : (
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control
                value={firstName}
                onChange={onEditForm("firstName")}
                placeholder="First name"
                aria-label="First name"
              />
              <Form.Text className="text-danger">
                {errorInput(firstName)}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={lastName}
                onChange={onEditForm("lastName")}
                placeholder="Last name"
                aria-label="Last name"
              />
              <Form.Text className="text-danger">
                {errorInput(lastName)}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={onEditForm("email")}
                placeholder="Enter e-mail"
                type="email"
                aria-label="email"
              />
              <Form.Text className="text-danger">{errorInput(email)}</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Manager</Form.Label>
              <Form.Control
                value={manager}
                onChange={onEditForm("manager")}
                placeholder="Manager"
                aria-label="Manager"
              />
              <Form.Text className="text-danger">
                {errorInput(manager)}
              </Form.Text>
            </Form.Group>

            <Button
              disabled={!validateForm() || employeeSending === true}
              onClick={saveEmployee(id)}
              variant="primary"
              type="button"
            >
              Save
            </Button>
            {typeof id !== "number" ? (
              <Button variant="danger" onClick={deleteRow(id)}>
                Delete
              </Button>
            ) : null}
          </Form>
        )}
      </div>
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

export default connector(EmployeeEditor);
