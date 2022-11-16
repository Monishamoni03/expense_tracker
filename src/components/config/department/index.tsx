//config file -> DEPARTMENT [NEW]

import React, { Dispatch, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { addDept, getAllDept } from "../../../action/action";
import { DeptInputField, DeptInputFieldError } from "../../../shared/types/type";
import { initialStateDept, initialStateDeptError } from "../../../shared/types/types";
import successMessage from "../../../shared/utils/alertMessage";
import ValidateDept from "../../../shared/utils/ValidateDepartment";
import { store } from "../../../store";

export const columnDept: { title: string; key: string }[] = [
    { "title": "Id", "key": "id" },
    { "title": "Department Name", "key": "department name" },
    { "title": "Action", "key": "action" },
    { "title": "Action", "key": "action" }
];

const AddModalDepartment = () => {

    const [show, setShow] = useState(false);
    let [values, setValues] = useState<DeptInputField>(initialStateDept);
    const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);
    const [success, setSuccess] = useState(false);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const onDepartment = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setValues(
            {
                ...values,
                [e.target.name]: e.target.value
            }
        )
    }


    useEffect(() => {
        dispatchStore(getAllDept());
    }, [success]);

    const handleOnDepartmentSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setShow(false);

        const isValid = ValidateDept(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            await dispatchStore(addDept(values));
            setSuccess(true);
            console.log("Output values", values);       //printing result 
            successMessage("Successfully department added to the table");
            setValues(initialStateDept);
        }
    };

    return (
        <>
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="deptName">Department Name <sup>*</sup></label>
                    <input onChange={(e) => onDepartment(e)} name='deptName' value={values.deptName} placeholder="Enter the department name" required />
                    <div style={{ color: "red" }}>{error.deptNameError}</div>
                </div>
            </form>
            <Button variant="primary" onClick={handleOnDepartmentSubmit}>
                Submit
            </Button>
        </>
    )
}

export default AddModalDepartment;