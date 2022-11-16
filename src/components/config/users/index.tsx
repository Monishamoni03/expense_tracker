//config file -> USERS

import React, { Dispatch, useEffect, useState } from "react";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import { initialStateError, initialStateUser } from "../../../shared/types/types";
import "../../../assets/css/Style";
import "../../login/index.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ValidateUser from "../../../shared/utils/ValidateUser";
import { addUser, saveUser } from "../../../action/action";
import { store } from "../../../store";
import successMessage from "../../../shared/utils/alertMessage";
import { Button } from "react-bootstrap";

export const columnUser: { title: string; key: string }[] = [
    { "title": "Id", "key": "id" },
    { "title": "Email ID", "key": "email" },
    { "title": "Role", "key": "role" },
    { "title": "Action", "key": "action" },
    { "title": "Action", "key": "action" }
];

export const AddUserModal = () => {
    console.log("ADDDD ModaLLLL");

    const [show, setShow] = useState(false);
    let [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);
    const [success, setSuccess] = useState(false);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const onUserModal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }
        )
    }

    // useEffect(() => {
    //     dispatchStore(saveValue(values))
    // }, [values])

    const saveUserData = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("in save");

        dispatchStore(saveUser(values))
    }

    const handleOnUserModalSubmit = (e: React.MouseEvent) => {
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
            setShow(false);         // modal close
            setValues(initialStateUser);
        }
    };

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

            {/* <Button variant="primary" onClick={saveUserData}>
                save
            </Button> */}
            <Button variant="primary" onClick={handleOnUserModalSubmit}>
                Submit
            </Button>
            {/* <Button variant="secondary" onClick={() => setShow(false)}>
                Close
            </Button> */}
        </>
    )

}

//for user -> edit 

// export const UserForm = (): any => {
//     let [values, setValues] = useState<InputFieldUser>(initialStateUser);
//     [values, setValues] = useState<InputFieldUser>(values);
//     const [error, setError] = useState<InputFieldError>(initialStateError);

//     const onUser = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>) => {
//         setValues(
//             {
//                 ...values,
//                 [e.target.name]: e.target.value
//             }
//         )
//     }

//     return (
//         <form className="login">
//             <div className='login-form'>
//                 <label htmlFor="email"><PersonIcon />{"   "}Email <sup>*</sup></label>
//                 <input onChange={(e) => onUser(e)} name='email' value={values.email} placeholder="name@example.com" required />
//                 <div style={{ color: "red" }}>{error.emailError}</div>
//             </div>
//             <div className='login-form'>
//                 <label htmlFor="password"><LockIcon />{"   "}Password <sup>*</sup></label>
//                 <input onChange={(e) => onUser(e)} type='text' name='password' value={values.password} placeholder="Password@123" required />
//                 <div style={{ color: "red" }}>{error.passwordError}</div>
//             </div>
//             <div className='login-form'>
//                 <label htmlFor="role"><SupervisorAccountIcon />Role</label>
//                 <select name="role" onChange={(e) => onUser(e)}>
//                     <option>Please choose an option</option>
//                     <option value="Admin">Admin</option>
//                     <option value="Accountant">Accountant</option>
//                     <option value="Employee">Employee</option>
//                 </select>
//             </div>
//         </form>
//     )
// }