import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { editUser, getAllUser } from "../../../../../action/action";
import { store } from "../../../../../store";
import { initialStateUser, initialStateError } from "../../../../../shared/types/types";
import { InputFieldError, InputFieldUser } from "../../../../../shared/types/type";
import ValidateUser from "../../../../../shared/utils/ValidateUser";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import 'react-toastify/dist/ReactToastify.css';
import successMessage from "../../../../../shared/utils/alertMessage";
import "../../../../../assets/css/Style";
import "../../../../login/index.css";

const EditModalData = (): any => {

    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);
    const [success, setSuccess] = useState(false);

    const [show, setShow] = useState(false);
    const UserModalClose = () => setShow(false);
    const UserModalShow = () => setShow(true);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    useEffect(() => {
        dispatchStore(getAllUser());
    }, [success]);

    const UserEditSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        console.log("value in onsubmit", values);

        const isValid = ValidateUser(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            dispatchStore(editUser(values.id, values));
            setSuccess(true);
            successMessage("Successfully user updated to the table");
            UserModalClose();
            console.log("Output values", values);       //printing result
        }
    };

    const LoginForm = (): any => {
        [values, setValues] = useState<InputFieldUser>(values);
        const [error, setError] = useState<InputFieldError>(initialStateError);

        const onUser = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>) => {
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
                    <input onChange={(e) => onUser(e)} name='email' value={values.email} placeholder="name@example.com" required />
                    <div style={{ color: "red" }}>{error.emailError}</div>
                </div>
                <div className='login-form'>
                    <label htmlFor="password"><LockIcon />{"   "}Password <sup>*</sup></label>
                    <input onChange={(e) => onUser(e)} type='text' name='password' value={values.password} placeholder="Password@123" required />
                    <div style={{ color: "red" }}>{error.passwordError}</div>
                </div>
                <div className='login-form'>
                    <label htmlFor="role"><SupervisorAccountIcon />Role</label>
                    <select name="role" onChange={(e) => onUser(e)}>
                        <option>Please choose an option</option>
                        <option value="Admin">Admin</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
            </form>
        )
    }

    const UserEdit = () => {
        console.log("----Hello edit----");
        console.log("Value in edit fn", values);

        return (
            <>
                <Modal show={show} onHide={UserModalClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={UserEditSubmit}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={UserModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return(
        UserEdit()
    ) 

}

export default EditModalData;