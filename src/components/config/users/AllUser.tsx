//ADMIN ---> Available USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/navbar";
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
import "../../../assets/css/Style";
import "../../login/Login.css";

const AllUser: React.FC = () => {
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const users = useSelector((state: any) => state.userData.users[0]);
    const [success, setSuccess] = useState(false)

    // console.log("All user data : ", users);   //prints -> all user data in db.json 

    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const columnsUser: { title: string; key: string }[] = [
        { "title": "Id", "key": "id" },
        { "title": "Email ID", "key": "email" },
        { "title": "Role", "key": "role" },
        { "title": "Action", "key": "action" },
        { "title": "Action", "key": "action" }
    ];

    // users && users.map((e) => {
    //     console.log("Element: ", e);         //prints -> all individual user data
    // });

    useEffect(() => {
        dispatchStore(getAllUser());
    }, [success]);


    const rowUser: RowProps[] = [] as RowProps[];

    const handleEdit = (id: number, value: any) => {
        console.log("Handle edit");
        dispatchStore(editUser(id, value))

    }

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete the user?")) {
            dispatchStore(deleteUser(id));
            setSuccess(true)
        }
    }

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    //     // setValues(
    //     //     {         
    //     //     ...values,
    //     //     [e.target.name]: e.target.value
    //     // }
    //     // )
    // }

    // const handleSubmit = (e: React.MouseEvent) => {
    //     e.preventDefault();
    //     // handleClose();
    //     const isValid = ValidateLogin(values);
    //     console.log("Is valid", isValid);
    //     setError({
    //         ...error,
    //         [e.target.name]: error
    //     })
    //     console.log("hello err: ", error);
    //     if (isValid) {
    //         dispatchStore(addUser(values));
    //         console.log("Successfully user added to the table");
    //         console.log("Output values", values);           //printing result 
    //         navigate('/admin/users');
    //         setValues(initialStateUser);
    //     }
    // };

    const HandleAdd = () => {
        console.log("hi");
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
            // setValues(
            //     {         
            //     ...values,
            //     [e.target.name]: e.target.value
            // }
            // )
        }
    
        const handleSubmit = (e: React.MouseEvent) => {
            e.preventDefault();
            // handleClose();
            const isValid = ValidateLogin(values);
            console.log("Is valid", isValid);
            setError({
                ...error,
                [e.target.name]: error
            })
            console.log("hello err: ", error);
            if (isValid) {
                dispatchStore(addUser(values));
                console.log("Successfully user added to the table");
                console.log("Output values", values);           //printing result 
                navigate('/admin/users');
                setValues(initialStateUser);
            }
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
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='submit'>
                            <button className="login-button" onClick={handleSubmit}>Submit</button>
                        </div>
                    </Modal.Footer>

                    {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer> */}
                </Modal>
            </>
        )
    }

    useEffect(() => {
        if (success) {
            alert("User deleted successfully!")
        }
    }, [success])

    users?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            email: value.email,
            role: value.role,
            actionButtons: [{
                children: "Update",
                onClick: () => handleEdit(value.id, value)
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
            {/* <NavBar /> */}
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Users</h1>
                <Buttons
                    move="left"
                    onClick={() => navigate('/admin')}
                    text="Go Back"
                />
                {/* <Buttons
                    move="right"
                    onClick={() => navigate('/adduser')}
                    text="Add User"
                /> */}
                {/* <Buttons
                    move="right"
                    onClick={handleShow}
                    text="Add User"
                /> */}
                <HandleAdd />
            </div>

            <br /><br />
            <TableData columns={columnsUser} rows={rowUser} />

        </>
    )
}

export default AllUser;