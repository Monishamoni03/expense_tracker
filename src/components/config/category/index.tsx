//config file -> CATEGORY [NEW]

import React, { Dispatch, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { addCategory, getAllCategory } from "../../../action/action";
import { CategoryInputField, CategoryInputFieldError } from "../../../shared/types/type";
import { initialStateCategory, initialStateCategoryError } from "../../../shared/types/types";
import successMessage from "../../../shared/utils/alertMessage";
import ValidateCategory from "../../../shared/utils/ValidateCategory";
import { store } from "../../../store";

export const columnCategory: { title: string; key: string }[] = [
    { "title": "Id", "key": "id" },
    { "title": "Category Name", "key": "category name" },
    { "title": "Action", "key": "action" },
    { "title": "Action", "key": "action" }
];


const AddModalCategory = () => {

    const [show, setShow] = useState(false);
    let [values, setValues] = useState<CategoryInputField>(initialStateCategory);
    const [error, setError] = useState<CategoryInputFieldError>(initialStateCategoryError);
    const [success, setSuccess] = useState(false);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const onCategory = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        dispatchStore(getAllCategory());
    }, [success]);

    const handleOnDepartmentSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setShow(false);

        const isValid = ValidateCategory(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            await dispatchStore(addCategory(values));
            setSuccess(true);
            console.log("Output values", values);       //printing result 
            successMessage("Successfully category added to the table");
            setValues(initialStateCategory);
        }
    };

    return (
        <>
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="categoryName">Category Name <sup>*</sup></label>
                    <input onChange={(e) => onCategory(e)} name='categoryName' value={values.categoryName} placeholder="Enter the category name" required />
                    <div style={{ color: "red" }}>{error.categoryNameError}</div>
                </div>
            </form>
            <Button variant="primary" onClick={handleOnDepartmentSubmit}>
                Submit
            </Button>
        </>
    )
}

export default AddModalCategory;