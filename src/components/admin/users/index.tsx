//ADMIN ---> USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../common/button";
import TableData from "../../common/table";
import { useSelector } from "react-redux";
import { deleteUser, editUser, getAllUser } from "../../../action/action";
import { store } from "../../../store";
import { RowProps } from "../../../shared/types/type";
import { initialStateUser, initialStateError } from "../../../shared/types/types";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import ValidateLogin from "../../../shared/utils/ValidateLogin";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import 'react-toastify/dist/ReactToastify.css';
import successMessage from "../../../shared/utils/alertMessage";
import "../../../assets/css/Style";
import "../../login/index.css";
import NavBar from "../../common/navbar";
import AddModalData from "../../admin/users/modal/index";
import { columnUser } from "../../config/users";

const AllUser: React.FC = () => {
    
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const users = useSelector((state: any) => state.userData.users);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const [show, setShow] = useState(false);
    const userModalClose = () => setShow(false);
    const userModalShow = () => setShow(true);

    const rowUser: RowProps[] = [] as RowProps[];

    useEffect(() => {
        dispatchStore(getAllUser());
    }, [success]);

    const userDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete the user?")) {
            await dispatchStore(deleteUser(id));
            setSuccess(true);
            successMessage("User deleted successfully");
        }
    }

    const userEditSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        userModalClose();

        console.log("value in onsubmit", values);

        const isValid = ValidateLogin(values);
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
        console.log("----------Hi edit----------");
        console.log("Value in edit fn", values);

        return (
            <>
                <Modal show={show} onHide={userModalClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={userEditSubmit}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={userModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    const userEdit = (id, value) => {
        console.log("id", id);
        console.log("value", value);
        //retrieving old values
        setValues(value);
        userModalShow();
    }

    users?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            email: value.email,
            role: value.role,
            actionButtons: [{
                children: 'Update',
                // onClick: () => userEdit(value.id, value),
                onClick: () => userEdit(value.id, value)
            },
            {
                children: "Delete",
                onClick: () => userDelete(value.id)
            }]
        }
        rowUser.push(object)
    })

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Users</h1>
                <Buttons
                    move="left"
                    onClick={() => navigate('/admin')}
                    text="Go Back"
                />
                <AddModalData />
                <UserEdit />
            </div>

            <br /><br />
            <TableData columns={columnUser} rows={rowUser} />
        </>
    )
}

export default AllUser;