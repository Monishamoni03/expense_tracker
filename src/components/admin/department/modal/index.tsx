//ADD DEPARTMENT - Modal

import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { addDept, getAllDept } from '../../../../action/action';
import { DeptInputField, DeptInputFieldError } from '../../../../shared/types/type';
import { initialStateDept, initialStateDeptError } from '../../../../shared/types/types';
import successMessage from '../../../../shared/utils/alertMessage';
import ValidateDept from '../../../../shared/utils/ValidateDepartment';
import { store } from '../../../../store';
import Buttons from '../../../common/button/index';
import ModalType from '../../../common/modal';
import AddModalDepartment from '../../../config/department';

const AddDepartmentModalData = () => {

    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<DeptInputField>(initialStateDept);
    const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    useEffect(() => {
        dispatchStore(getAllDept());
    }, [success]);

    const departmentModalSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        // deptModalClose();

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
        <div className="addModal">

            <Buttons
                move="right"
                onClick={() => setShow(true)}
                text="Add Department"
            />

            <ModalType
                show={show}
                handleClose={() => setShow(false)}
                handleShow={() => setShow(true)}
                modalTitle="Add Department"
                config={<AddModalDepartment />}
            >

                {/* FOOTER */}
                 
                {/*<Button variant="primary" onClick={UserModalSubmit}>
                    Submit
                </Button> */}
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </ModalType>

        </div>
    );
}

export default AddDepartmentModalData;