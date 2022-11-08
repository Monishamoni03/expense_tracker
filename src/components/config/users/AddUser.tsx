import React, { Dispatch, useState } from "react";
import "../../../assets/css/Style";
import "../../login/Login.css";
import { initialStateUser, initialStateError } from "../../../shared/types/types";
import { useNavigate } from "react-router-dom";
import ValidateLogin from "../../../shared/utils/ValidateLogin";
import NavBar from "../../common/navbar";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useSelector } from "react-redux";
import { store } from "../../../store/store";
import { addUser } from "../../../action/action";

const AddUser = () => {

    const [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    // const user = useSelector((state: any) => state.userData.user)

    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
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
            <NavBar />
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>ADD USER</h2>
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
                                <option value = "Admin">Admin</option>
                                <option value = "Accountant">Accountant</option>
                                <option value = "Employee">Employee</option>
                            </select>
                        </div>
                        <div className='submit'>
                            <button className="login-button" onClick={handleSubmit} disabled= {values === undefined ? true : false}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='footer-container'>
                <p className='copyrights'>Expense Tracker © 2022</p>
            </div>
        </>
    )
}

export default AddUser;