//ADMIN ---> USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../../common/button";
import TableData from "../../common/table";
import { useSelector } from "react-redux";
import { deleteUser, editUser, getAllUser } from "../../../action/action";
import { store } from "../../../store";
import { RowProps } from "../../../shared/types/type";
import { initialStateUser, initialStateError } from "../../../shared/types/types";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import ValidateUser from "../../../shared/utils/ValidateUser";
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
import AddModalData from "../../admin/users/modal/addModal/addModal";
import { columnUser } from "../../config/users";
import DeleteModal from "./modal/deleteModal";
import ModalType from "../../common/modal";

const AllUser: React.FC = () => {

    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const users = useSelector((state: any) => state.userData.users);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);

    const rowUser: RowProps[] = [] as RowProps[];

    useEffect(() => {
        dispatchStore(getAllUser());
    }, [success]);

    // const userDelete = async (id: number) => {
    //     if (window.confirm("Are you sure you want to delete the user?")) {
    //         await dispatchStore(deleteUser(id));
    //         setSuccess(true);
    //         successMessage("User deleted successfully");
    //     }
    // }

    const UserDeleteSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("delete id  in usersubmit : ", values.id)
        // dispatchStore(deleteUser(values.id));
        setSuccess(true);
        setShow(false);
        successMessage("User deleted successfully");
    }

    const UserDelete = () => {
        console.log("----User delete----");

        return (
            <>
                <ModalType
                    show={show}
                    handleClose={() => setShow(false)}
                    handleShow={() => setShow(true)}
                    modalTitle="Delete User"
                >
                    Are you sure you want to delete this user?

                    {/* FOOTER */}

                    <Button variant="primary" onClick={UserDeleteSubmit}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </ModalType>
            </>
        )
    }

    const handleOnUserDelete = (id: number) => {
        console.log("Iddd in deleteeee", id);
        setShow(true);
        dispatchStore(deleteUser(id));
    }

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
            // UserModalClose();
            setEditShow(false);
            console.log("Output values", values);       //printing result
        }
    };

    const UserForm = (): any => {
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
        console.log("----User Edit----");
        console.log("Value in edit fn", values);

        return (
            <>
                <ModalType
                    show={editShow}
                    handleClose={() => setEditShow(false)}
                    handleShow={() => setEditShow(true)}
                    modalTitle="Edit User"
                >
                    <UserForm />

                    {/* FOOTER */}

                    <Button variant="primary" onClick={UserEditSubmit}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setEditShow(false)}>
                        Close
                    </Button>
                </ModalType>
                {/* <Modal show={show} onHide={UserModalClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UserForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={UserEditSubmit}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={UserModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal> */}
            </>
        )
    }

    const handleOnUserEdit = (id, value) => {
        console.log("id", id);
        console.log("value", value);
        //retrieving old values
        setValues(value);
        setEditShow(true);
        // UserModalShow();
    }

    users?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            email: value.email,
            role: value.role,
            actionButtons: [{
                children: 'Update',
                onClick: () => handleOnUserEdit(value.id, value)
            },
            {
                children: "Delete",
                onClick: () => handleOnUserDelete(value.id)
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
                <UserDelete />
            </div>

            <br /><br />
            <TableData columns={columnUser} rows={rowUser} />
        </>
    )
}

export default AllUser;