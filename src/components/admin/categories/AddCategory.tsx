import React, { useState } from "react";
import "../../../assets/css/Style";
import "../../login/Login.css";
import { initialStateCategory, initialStateCategoryError } from "../../../shared/types/types";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/navbar";
import { CategoryInputFieldError, CategoryInputField } from "../../../shared/types/type";
import ValidateCategory from "../../../shared/utils/ValidateCategory";

const AddCategory: React.FC = () => {

    const [values, setValues] = useState<CategoryInputField>(initialStateCategory);
    const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);
   
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const isValid = ValidateCategory(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            console.log("Successfully Category Added to the table");
            console.log("Output values", values);    //printing result 
            navigate('/categories');
            setValues(initialStateCategory);
        }
    };

    return (
        <>
            <NavBar />
            <div className='wrapper'>
                <div className='form-wrapper'>
                    <h2>ADD Category</h2>
                    <form className="login">
                        <div className='login-form'>
                            <label htmlFor="categoryName">Category Name <sup>*</sup></label>
                            <input onChange={handleChange} name='categoryName' value={values.categoryName} placeholder="Enter the category name" required />
                            <div style={{ color: "red" }}>{error.categoryNameError}</div>
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

export default AddCategory;