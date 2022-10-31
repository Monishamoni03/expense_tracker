import React, { useState } from "react";
import "../../../assets/css/Style";
import "../../login/Login.css";
import { initialStateUser, initialStateError } from "../../../shared/types/types";
import { useNavigate } from "react-router-dom";
import ValidateLogin from "../../../shared/utils/ValidateLogin";
import NavBar from "../../common/navbar";
import { InputFieldError, InputFieldUser } from "../../../shared/types/type";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const AddUser: React.FC = () => {

    const [values, setValues] = useState<InputFieldUser>(initialStateUser);
    const [error, setError] = useState<InputFieldError>(initialStateError);
   
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        // setError(error);
        console.log("hello err: ", error);
        if (isValid) {
            console.log("Successfully logged in");
            console.log("Output values", values);           //printing result 
            navigate('/users');
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
                            <input onChange={handleChange} name='email' value={values.email} placeholder="name@example.com" required />
                            <div style={{ color: "red" }}>{error.emailError}</div>
                        </div>
                        <div className='login-form'>
                            <label htmlFor="password"><LockIcon />{"   "}Password <sup>*</sup></label>
                            <input onChange={handleChange} type='password' name='password' value={values.password} placeholder="Password@123" required />
                            <div style={{ color: "red" }}>{error.passwordError}</div>
                        </div>
                        <div className='login-form'>
                            <label htmlFor="department">Department</label>
                            {/* <input onChange={handleChange} type='category' name='category' value={values.category} required /> */}
                            <select>
                                <option value = "">Please choose an option</option>
                                <option value = "lamp">LAMP</option>
                                <option value = "bfs">BFS</option>
                                <option value = "java">Java</option>
                                <option value = "oracle">Oracle</option>
                            </select>
                        </div>
                        <div className='login-form'>
                            <label htmlFor="category">Category</label>
                            {/* <input onChange={handleChange} type='category' name='category' value={values.category} required /> */}
                            <select>
                                <option value = "">Please choose an option</option>
                                <option value = "food">Food</option>
                                <option value = "travel">Travel</option>
                                <option value = "transport">Transport</option>
                                <option value = "insurance">Insurance</option>
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