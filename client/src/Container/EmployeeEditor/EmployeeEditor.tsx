import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Section from "../../components/Layout/Section";
import ConfirmModal from "../../components/Layout/ConfirmModal";
import Loading from "../../components/Layout/Loading";

import {
  deleteById,
  loadEmployee,
  changeEmployeeThunk,
  addNewEmployeeThunk,
} from "../../store/employeeEditor/thunkFunc";
import { RootStore } from "../../store/rootReducer";
import { RawTableData } from "../../store/employeeList/types";
import employeeEditorActions from "../../store/employeeEditor/actions";

const mapStateToProps = (
  state: RootStore
): {
  loadingEditor: boolean;
  employeeSending: boolean;
  employeeForm: RawTableData;
} => {
  const employeeEditorJS = state.employeeEditor.toJS();

  return {
    loadingEditor: employeeEditorJS.loadingEditor,
    employeeSending: employeeEditorJS.employeeSending,
    employeeForm: employeeEditorJS.employeeForm,
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

    return () => {
      dispatch(employeeEditorActions.editor.setLoading());
    };
    // On-mount and return on un-mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paramId !== "new" && id === -1) {
      history.replace(`/edit/new`);
    } else if (id !== -1 && paramId !== `${id}`) {
      history.replace(`/edit/${id}`);
    }
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
    dispatch(employeeEditorActions.editor.editForm(input, event.target.value));
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
      dispatch(addNewEmployeeThunk(employeeForm));
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
                disabled={employeeSending}
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
                disabled={employeeSending}
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
                disabled={employeeSending}
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
                disabled={employeeSending}
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
              disabled={!validateForm() || employeeSending}
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
