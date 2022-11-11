//ADD DEPARTMENT - Modal

import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addDept, getAllDept } from '../../../../action/action';
import { DeptInputField, DeptInputFieldError } from '../../../../shared/types/type';
import { initialStateDept, initialStateDeptError } from '../../../../shared/types/types';
import successMessage from '../../../../shared/utils/alertMessage';
import ValidateDept from '../../../../shared/utils/ValidateDepartment';
import { store } from '../../../../store';
import Buttons from '../../../common/button/index';

const AddModalDepartment = () => {

    let [values, setValues] = useState<DeptInputField>(initialStateDept);
    const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const deptModalClose = () => setShow(false);
    const deptModalShow = () => setShow(true);

    useEffect(() => {
        dispatchStore(getAllDept());
    }, [success]);

    const departmentModalSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        deptModalClose();

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

    const DepartmentForm = (): any => {
        [values, setValues] = useState<DeptInputField>(initialStateDept);
        const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

        const onDepartment = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValues(
                {
                    ...values,
                    [e.target.name]: e.target.value
                }
            )
        }

        return (
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="deptName">Department Name <sup>*</sup></label>
                    <input onChange={(e) => onDepartment(e)} name='deptName' value={values.deptName} placeholder="Enter the department name" required />
                    <div style={{ color: "red" }}>{error.deptNameError}</div>
                </div>
            </form>
        )
    }

    return (
        <>
            <Buttons
                move="right"
                onClick={deptModalShow}
                text="Add Department"
            />

            <Modal show={show} onHide={deptModalClose} onCancel={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Department</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DepartmentForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={departmentModalSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={deptModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddModalDepartment;