import React, { Dispatch, useEffect, useState } from "react";
import "../../assets/css/Style";
import "./index.css";
import ValidateLogin from "../../shared/utils/ValidateLogin";
import { initialStates, initialStateError } from "../../shared/types/types";
import NavBar from "../common/navbar";
import Footer from "../common/footer";
import { useNavigate } from "react-router-dom";
import { loginData } from "../../action/action";
import { InputField, InputFieldError } from "../../shared/types/type";
import { store } from "../../store/store";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import 'react-toastify/dist/ReactToastify.css';
import successMessage from "../../shared/utils/alertMessage";

const Login: React.FC = () => {

    const [values, setValues] = useState<InputField>(initialStates);
    const [error, setError] = useState<InputFieldError>(initialStateError);
    const user = useSelector((state: any) => state.userData.user);
    
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        const isValid = ValidateLogin(values);
        console.log("Is valid", isValid);
        
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("Login error: ", error);
        if (isValid) {
            successMessage("Successfully logged in");
            // console.log("Output values", values);   //printing result 
            dispatchStore(loginData(values));
            setValues(initialStates);
        } 
    };

    useEffect(() => {
        if (sessionStorage.getItem('role') === "Admin") {
            navigate('/admin');
        } else if (sessionStorage.getItem('role') === "Accountant" || sessionStorage.getItem('role') === 'Employee'){
            navigate('/home',{state: {role: sessionStorage.getItem('role')}})
        }
    })

    return (
        <>
            <NavBar />
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>LOGIN</h2>
                    <form className="login">
                        <div className='login-form'>
                            <label htmlFor="email"><PersonIcon />{"   "}Email <sup>*</sup></label>
                            <input onChange={handleChange} name='email' value={values.email} placeholder="name@example.com" required />
                            <div className="login-error">{error.emailError}</div>
                        </div>
                        <div className='login-form'>
                            <label htmlFor="password"><LockIcon />{"   "}Password <sup>*</sup></label>
                            <input onChange={handleChange} type='password' name='password' value={values.password} placeholder="Password@123" required />
                            <div className="login-error">{error.passwordError}</div>
                        </div>
                        <div className='submit'>
                            <button className="login-button" onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;

// function dispatch(arg0: (dispatch: any) => void) {
//     throw new Error("Function not implemented.");
// }