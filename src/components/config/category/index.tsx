//config file -> CATEGORY [NEW]

import React, { Dispatch, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { addCategory, getAllCategory } from "../../../action/action";
import { CategoryInputField, CategoryInputFieldError } from "../../../shared/types/type";
import { initialStateCategory, initialStateCategoryError } from "../../../shared/types/types";
import showSuccessMessage from "../../../shared/utils/alertMessage";
import successMessage from "../../../shared/utils/alertMessage";
import ValidateFields from "../../../shared/utils/ValidateFields";
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

    const onCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
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


    useEffect(() => {
        dispatchStore(getAllCategory());
    }, [success]);

    const handleOnCategorySubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatchStore(addCategory(values));
        if (!error.categoryName) {
            showSuccessMessage("Successfully department added to the table");
        }
    };

    return (
        <>
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="categoryName">Category Name <sup>*</sup></label>
                    <input onChange={(e) => onCategory(e)} name='categoryName' value={values.categoryName} placeholder="Enter the category name" required />
                    <div style={{ color: "red" }}>{error.categoryName}</div>
                </div>
            </form>
            <Button variant="primary" onClick={handleOnCategorySubmit}>
                Submit
            </Button>
        </>
    )
}

export default AddModalCategory;