import React, { Dispatch, useState } from "react";
import "../../../assets/css/Style";
import "../../login/Login.css";
import { initialStateDept, initialStateDeptError } from "../../../shared/types/types";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/navbar";
import { DeptInputFieldError, DeptInputField } from "../../../shared/types/type";
import ValidateDept from "../../../shared/utils/ValidateDept";
import { store } from "../../../store/store";
import { addDept } from "../../../action/action";

const AddDepartment: React.FC = () => {

    const [values, setValues] = useState<DeptInputField>(initialStateDept);
    const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);
   
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
        const isValid = ValidateDept(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            dispatchStore(addDept(values));
            console.log("Successfully Category Added to the table");
            console.log("Output values", values);    //printing result 
            navigate('/admin/departments');
            setValues(initialStateDept);
        }
    };

    return (
        <>
            <NavBar />
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>ADD Department</h2>
                    <form className="login">
                        <div className='login-form'>
                            <label htmlFor="deptName">Department Name <sup>*</sup></label>
                            <input onChange={(e) => handleChange(e)} name='deptName' value={values.deptName} placeholder="Enter the department name" required />
                            <div style={{ color: "red" }}>{error.deptNameError}</div>
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

export default AddDepartment;