//ADMIN ---> Available USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Buttons from "../../common/button/Button";
import TableData from "../../common/table";
import { useSelector } from "react-redux";
import { deleteUser, editUser, getAllUser } from "../../../action/action";
import { store } from "../../../store/store";
import { RowProps } from "../../../shared/types/type";
import { initialStateUser, initialStateError } from "../../../shared/types/types";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import ValidateLogin from "../../../shared/utils/ValidateLogin";
import { addUser } from "../../../action/action";
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
import EditUser from "./EditUser";

const AllUser: React.FC = () => {
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const users = useSelector((state: any) => state.userData.users[0]);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const { id } = useParams()

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const columnsUser: { title: string; key: string }[] = [
        { "title": "Id", "key": "id" },
        { "title": "Email ID", "key": "email" },
        { "title": "Role", "key": "role" },
        { "title": "Action", "key": "action" },
        { "title": "Action", "key": "action" }
    ];

    useEffect(() => {
        dispatchStore(getAllUser());
    }, [success]);


    const rowUser: RowProps[] = [] as RowProps[];

    const handleEdit = (id: number, value: any) => {
        console.log("Handle edit");
        return (
            <HandleEdit />
        )
        // return (
        //     HandleEdit()
        // )
        // dispatchStore(editUser(id, value))
        // handleShow();
        // EditUser({id, value});
    }

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete the user?")) {
            dispatchStore(deleteUser(id));
            setSuccess(true);
            successMessage("User deleted successfully")
        }
    }

    const handleSubmit = (e: React.MouseEvent) => {
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
            dispatchStore(getAllUser());
            console.log("Output values", values);           //printing result 
            // navigate('/admin/users');
            successMessage("Successfully user added to the table");
            setValues(initialStateUser);
        }
    };

    const handleSubmitEdit = (e: React.MouseEvent) => {
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
            dispatchStore(editUser(id, values));
            dispatchStore(getAllUser());
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

    const HandleAdd = () => {
        console.log("hi add");

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const onLoginSubmit = (e: React.MouseEvent) => {
            e.preventDefault();
            handleClose();
        };

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
        )
    }

    const HandleEdit = () => {
        console.log("----------hi edit----------");

        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                {/* <Buttons
                    move="center"
                    onClick={handleShow}
                    text="Edit User"
                /> */}
                <Modal show={show} onHide={handleClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmitEdit}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    users?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            email: value.email,
            role: value.role,
            actionButtons: [{
                children: "Update",
                // onClick: () => handleEdit(value.id, value)
                onClick: () =>  {
                    handleEdit(value.id, value);
                    // <HandleEdit />
                    // handleShow();
                }
            },
            {
                children: "Delete",
                onClick: () => handleDelete(value.id)
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
                <HandleAdd />
                {/* <HandleEdit /> */}
            </div>

            <br /><br />
            <TableData columns={columnsUser} rows={rowUser} />

        </>
    )
}

export default AllUser;