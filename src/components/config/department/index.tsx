//config file -> DEPARTMENT [NEW]

import React, { Dispatch, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { addDept, getAllDept } from "../../../action/action";
import { DeptInputField, DeptInputFieldError } from "../../../shared/types/type";
import { initialStateDept, initialStateDeptError } from "../../../shared/types/types";
import showSuccessMessage from "../../../shared/utils/alertMessage";
import ValidateFields from "../../../shared/utils/ValidateFields";
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

    const onDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        dispatchStore(getAllDept());
    }, [success]);

    const handleOnDepartmentSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatchStore(addDept(values));
        if (!error.deptName) {
            showSuccessMessage("Successfully department added to the table");
        }
    };

    return (
        <>
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="deptName">Department Name <sup>*</sup></label>
                    <input onChange={(e) => onDepartment(e)} name='deptName' value={values.deptName} placeholder="Enter the department name" required />
                    <div style={{ color: "red" }}>{error.deptName}</div>
                </div>
            </form>
            <Button variant="primary" onClick={handleOnDepartmentSubmit}>
                Submit
            </Button>
        </>
    )
}

export default AddModalDepartment;