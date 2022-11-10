//ADD USER - Modal

import React, { Dispatch, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { addUser, getAllUser } from '../../../action/action';
import { InputFieldError, InputFieldUser } from '../../../shared/types/type';
import { initialStateError, initialStateUser } from '../../../shared/types/types';
import successMessage from '../../../shared/utils/alertMessage';
import ValidateLogin from '../../../shared/utils/ValidateLogin';
import { store } from '../../../store';
import Buttons from '../button';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const AddModalData = () => {

  const [show, setShow] = useState(false);
  let [values, setValues] = useState<InputFieldUser>(initialStateUser);
  const [error, setError] = useState<InputFieldError>(initialStateError);

  const navigate = useNavigate();
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    // handleClose();
    console.log("value in onsubmit", values);

    const isValid = ValidateLogin(values);
    console.log("Is valid", isValid);
    setError({
      ...error,
      [e.target.name]: error
    })
    console.log("hello err: ", error);
    if (isValid) {
      dispatchStore(addUser(values));
      await dispatchStore(getAllUser());
      console.log("Output values", values);           //printing result 
      // navigate('/admin/users');
      successMessage("Successfully user added to the table");
      setValues(initialStateUser);
    }
  };

  const LoginForm = (): any => {
    [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <input onChange={(e) => handleChange(e)} name='email' value={values.email} placeholder="name@example.com" required />
          <div style={{ color: "red" }}>{error.emailError}</div>
        </div>
        <div className='login-form'>
          <label htmlFor="password"><LockIcon />{"   "}Password <sup>*</sup></label>
          <input onChange={(e) => handleChange(e)} type='password' name='password' value={values.password} placeholder="Password@123" required />
          <div style={{ color: "red" }}>{error.passwordError}</div>
        </div>
        <div className='login-form'>
          <label htmlFor="role"><SupervisorAccountIcon />Role</label>
          <select name="role" onChange={(e) => handleChange(e)}>
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
        onClick={handleShow}
        text="Add User"
      />

      <Modal show={show} onHide={handleClose} onCancel={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModalData;