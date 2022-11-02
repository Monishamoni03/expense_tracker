import React, { Dispatch, useState } from "react";
import "../../assets/css/Style";
import "./Login.css";
import ValidateLogin from "../../shared/utils/ValidateLogin";
import { initialStates, initialStateError } from "../../shared/types/types";
import NavBar from "../common/navbar";
import Footer from "../common/footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginData } from "../../action/action";
import { InputField, InputFieldError, UserState } from "../../shared/types/type";
import { store } from "../../store/store";
import axios from "axios";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const Login: React.FC = () => {

    const [values, setValues] = useState<InputField>(initialStates);
    const [error, setError] = useState<InputFieldError>(initialStateError);
    const user = useSelector((state: any) => state.userData.user)
    console.log("Users USE SELECTOR: ", user);
    

    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    axios. 
    get('http://localhost:5000/user')
    .then((res) => {
        console.log("DB resp", res.data);
    })
    .catch((error) => {
        console.log("DB error", error);
        
    })

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        const isValid = ValidateLogin(values);
        console.log("Is valid", isValid);
        
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            console.log("Successfully logged in");
            console.log("Output values", values);   //printing result 
            // await axios.post('http://localhost:5000/user', values)
            // .then((res) => {
            //     console.log("Response values : ", res)
            // })
            // .catch((err) => {
            //     console.log("Error : ", err)
            // })
            // navigate('/admin');
            dispatchStore(loginData(values));
            // dispatch(loginData(values));
            navigate('/admin');
            setValues(initialStates);

        }
    };

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