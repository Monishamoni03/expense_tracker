import React, { Dispatch, useEffect, useState } from "react";
import "../../assets/css/Style";
import "./index.css";
import { initialStates, initialStateError } from "../../shared/types/types";
import NavBar from "../common/navbar";
import Footer from "../common/footer";
import { useNavigate } from "react-router-dom";
import { loginData } from "../../action/action";
import { InputField, InputFieldError } from "../../shared/types/type";
import { store } from "../../store";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import 'react-toastify/dist/ReactToastify.css';
import showSuccessMessage from "../../shared/utils/alertMessage";
import ValidateFields from "../../shared/utils/ValidateFields";

const Login: React.FC = () => {

    const [values, setValues] = useState<InputField>(initialStates);
    const [error, setError] = useState<InputFieldError>(initialStateError);

    const user = useSelector((state: any) => state.userData.user);

    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const errorMsg = ValidateFields(e.target.name, e.target.value);
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: errorMsg
        })

        console.log("Login error: ", error)
    }

    const handleOnSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatchStore(loginData(values));
        if ((!error.email) && (!error.password)) {
            showSuccessMessage("Successfully logged in");
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem('role') === "Admin") {
            navigate('/admin');
        } else if (sessionStorage.getItem('role') === "Accountant" || sessionStorage.getItem('role') === 'Employee') {
            navigate('/home', { state: { role: sessionStorage.getItem('role') } })
        }
    }, [user])

    return (
        <>
            <NavBar />
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>LOGIN</h2>
                    <form className="login">
                        <div className='login-form'>
                            <label htmlFor="email"><PersonIcon />{"   "}Email <sup>*</sup></label>
                            <input onChange={handleOnChange} name='email' value={values.email} placeholder="name@example.com" required />
                            <div className="login-error">{error.email}</div>
                        </div>
                        <div className='login-form'>
                            <label htmlFor="password"><LockIcon />{"   "}Password <sup>*</sup></label>
                            <input onChange={handleOnChange} type='password' name='password' value={values.password} placeholder="Password@123" required />
                            <div className="login-error">{error.password}</div>
                        </div>
                        <div className='submit'>
                            <button className="login-button" onClick={handleOnSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;