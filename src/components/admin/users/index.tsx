//ADMIN ---> USERS with add btn in the top, edit, delete  [NEW]

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
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import 'react-toastify/dist/ReactToastify.css';
import showSuccessMessage from "../../../shared/utils/alertMessage";
import "../../../assets/css/Style";
import "../../login/index.css";
import NavBar from "../../common/navbar";
import AddUserModalData from "./modal/index";
import { columnUser } from "../../config/users";
import ConfirmModal from "../../common/modal";

const AllUser: React.FC = () => {

    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const users = useSelector((state: any) => state.userData.users);
    const [isSuccess, setSuccess] = useState(false);

    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [deleteId, setDeleteId] = useState();

    const { successMessage } = useSelector((state: any) => state.userData);
    const { errorMessage } = useSelector((state: any) => state.userData);

    const rowUser: RowProps[] = [] as RowProps[];

    // const response = await getAllUser()
    // if (response.status) {
    //     showSuccessMessage({ show: true, message: "User deleted successfully"})
    // }

    useEffect(() => {
        if (successMessage) {
            showSuccessMessage(successMessage)
            dispatchStore(getAllUser())    //cont. rendering
        } else if (errorMessage) {
            showSuccessMessage(errorMessage)
        }
    }, [successMessage, errorMessage])

    const handleOnDeleteSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatchStore(deleteUser(deleteId));
        setShowDelete(false);
    }

    const handleOnDelete = (id: any) => {
        console.log("Iddd in deleteeee", id);  //prints id
        setDeleteId(id);
        setShowDelete(true);
        // dispatchStore(deleteUser(id));
    }

    const handleOnEditSubmit = (e: React.MouseEvent) => {
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
            // setSuccess(true);
            showSuccessMessage("Successfully user updated to the table");
            setShowEdit(false);   //modal close
            console.log("Output values", values);       //printing result
        }
    };

    const UserForm = (): any => {
        [values, setValues] = useState<InputFieldUser>(values);
        const [error, setError] = useState<InputFieldError>(initialStateError);

        const onUser = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    <select name="role" onChange={(e) => onUser(e)} required>
                        <option>Please choose an option</option>
                        <option value="Admin">Admin</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
            </form>
        )
    }

    const handleOnEdit = (id, value) => {
        console.log("id & value", id, value);
        //retrieving old values
        setValues(value);
        setShowEdit(true);
    }

    users?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            email: value.email,
            role: value.role,
            actionButtons: [{
                children: 'Update',
                onClick: () => handleOnEdit(value.id, value)
            },
            {
                children: "Delete",
                onClick: () => handleOnDelete(value.id)
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
                <AddUserModalData />

                {/* User Edit */}

                <>
                    <ConfirmModal
                        show={showEdit}
                        handleClose={() => setShowEdit(false)}
                        handleShow={() => setShowEdit(true)}
                        modalTitle="Edit User"
                    >
                        <UserForm />

                        {/* FOOTER */}

                        <Button variant="primary" onClick={handleOnEditSubmit}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={() => setShowEdit(false)}>
                            Close
                        </Button>
                    </ConfirmModal>
                </>

                {/* USER DELETE */}
                <>
                    <ConfirmModal
                        show={showDelete}
                        handleClose={() => setShowDelete(false)}
                        handleShow={() => setShowDelete(true)}
                        modalTitle="Delete User"
                        message="Are you sure you want to delete this user?"
                    >

                        {/* FOOTER */}

                        <Button variant="primary" onClick={handleOnDeleteSubmit}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={() => setShowDelete(false)}>
                            Cancel
                        </Button>
                    </ConfirmModal>
                </>
            </div>

            <br /><br />
            <TableData columns={columnUser} rows={rowUser} />
        </>
    )
}

export default AllUser;