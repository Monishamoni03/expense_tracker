//ADD USER - Modal  [OLD]

import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addUser, getAllUser } from '../../../../../action/action';
import { InputFieldError, InputFieldUser } from '../../../../../shared/types/type';
import { initialStateError, initialStateUser } from '../../../../../shared/types/types';
import successMessage from '../../../../../shared/utils/alertMessage';
import ValidateUser from '../../../../../shared/utils/ValidateUser';
import { store } from '../../../../../store';
import Buttons from '../../../../common/button/index';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const AddModalData = () => {

  let [values, setValues] = useState<InputFieldUser>(initialStateUser);
  const [error, setError] = useState<InputFieldError>(initialStateError);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

  const UserModalClose = () => setShow(false);
  const UserModalShow = () => setShow(true);

  useEffect(() => {
    dispatchStore(getAllUser());
  }, [success]);

  const UserModalSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const isValid = ValidateUser(values);
    console.log("Is valid", isValid);
    setError({
      ...error,
      [e.target.name]: error
    })
    console.log("hello err: ", error);
    if (isValid) {
      dispatchStore(addUser(values));
      setSuccess(true);
      successMessage("Successfully user added to the table");
      UserModalClose();
      setValues(initialStateUser);
    }
  };

  const UserForm = (): any => {
    [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const onUserModal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues(
        {
          ...values,
          [e.target.name]: e.target.value
        }
      )
    }

    return (
      <form className="login">
        <div className='login-form'>
          <label htmlFor="email"><PersonIcon />{"   "}Email <sup>*</sup></label>
          <input onChange={(e) => onUserModal(e)} name='email' value={values.email} placeholder="name@example.com" required />
          <div style={{ color: "red" }}>{error.emailError}</div>
        </div>
        <div className='login-form'>
          <label htmlFor="password"><LockIcon />{"   "}Password <sup>*</sup></label>
          <input onChange={(e) => onUserModal(e)} type='password' name='password' value={values.password} placeholder="Password@123" required />
          <div style={{ color: "red" }}>{error.passwordError}</div>
        </div>
        <div className='login-form'>
          <label htmlFor="role"><SupervisorAccountIcon />Role</label>
          <select name="role" onChange={(e) => onUserModal(e)}>
            <option>Please choose an option</option>
            <option value="Admin">Admin</option>
            <option value="Accountant">Accountant</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
      </form>
    )
  }

  return (
    <>
      <Buttons
        move="right"
        onClick={UserModalShow}
        text="Add User"
      />

      <Modal show={show} onHide={UserModalClose} onCancel={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={UserModalSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={UserModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModalData;