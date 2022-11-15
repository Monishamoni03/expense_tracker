//config file

import React, { useState } from "react";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import { initialStateError, initialStateUser } from "../../../shared/types/types";
import "../../../assets/css/Style";
import "../../login/index.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export const columnUser: { title: string; key: string }[] = [
    { "title": "Id", "key": "id" },
    { "title": "Email ID", "key": "email" },
    { "title": "Role", "key": "role" },
    { "title": "Action", "key": "action" },
    { "title": "Action", "key": "action" }
];

const addUserModal = () => {
    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
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
        <>
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
        </>
    )
}

export default addUserModal;