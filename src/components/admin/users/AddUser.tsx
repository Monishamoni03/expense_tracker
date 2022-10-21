import React, { useState } from "react";
import "../../../assets/css/Style";
import "../../login/Login.css"
import { initialStates, initialStateError, InputField, InputFieldError } from "../../../shared/types/LoginTypes";
import { useNavigate } from "react-router-dom";
import ValidateLogin from "../../../shared/utils/ValidateLogin";
import NavBar from "../../common/NavBar";

const AddUser: React.FC = () => {

    const [values, setValues] = useState<InputField>(initialStates);
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
            setValues(initialStates);
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
                            <label htmlFor="email">Email <sup>*</sup></label>
                            <input onChange={handleChange} name='email' value={values.email} placeholder="name@example.com" required />
                            <div style={{ color: "red" }}>{error.emailError}</div>
                        </div>
                        <div className='login-form'>
                            <label htmlFor="password">Password <sup>*</sup></label>
                            <input onChange={handleChange} type='password' name='password' value={values.password} placeholder="Password@123" required />
                            <div style={{ color: "red" }}>{error.passwordError}</div>
                        </div>
                        <div className='submit'>
                            <button className="login-button" onClick={handleSubmit} disabled= {values === undefined ? true : false}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddUser;