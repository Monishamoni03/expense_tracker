//ADMIN ---> Available Department with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Buttons from "../../../common/button/Button";
import { store } from "../../../../store/store";
import TableData from "../../../common/table";
import { deleteDept, getAllDept } from "../../../../action/action";
import { RowProps } from "../../../../shared/types/type";
import "../../../../assets/css/Style";
import "../../../login/index.css";
import { initialStateDept, initialStateDeptError } from "../../../../shared/types/types";
import { DeptInputFieldError, DeptInputField } from "../../../../shared/types/type";
import ValidateDept from "../../../../shared/utils/ValidateDept";
import { addDept } from "../../../../action/action";
import { Button, Modal } from "react-bootstrap";
import NavBar from "../../../common/navbar";

const AllDepartment: React.FC = () => {
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const departments = useSelector((state: any) => state.departmentData.depts[0]);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<DeptInputField>(initialStateDept);
    const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

    const columnsDept: { title: string; key: string }[] = [
        { "title": "Id", "key": "id" },
        { "title": "Department Name", "key": "department name" },
        { "title": "Action", "key": "action" },
        { "title": "Action", "key": "action" }
    ];

    useEffect(() => {
        dispatchStore(getAllDept());
    }, [success]);

    const rowDept: RowProps[] = [] as RowProps[];

    const handleEdit = (id: number) => {
        console.log("Handle edit");

    }

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this Department?')) {
            dispatchStore(deleteDept(id));
            setSuccess(true);
        }
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
            dispatchStore(getAllDept());
            console.log("Successfully Department Added to the table");
            console.log("Output values", values);    //printing result 
            navigate('/admin/departments');
            setValues(initialStateDept);
        }
    };

    const DepartmentForm = (): any => {
        [values, setValues] = useState<DeptInputField>(initialStateDept);
        const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }

        return (
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="deptName">Department Name <sup>*</sup></label>
                    <input onChange={(e) => handleChange(e)} name='deptName' value={values.deptName} placeholder="Enter the department name" required />
                    <div style={{ color: "red" }}>{error.deptNameError}</div>
                </div>
                <div className='submit'>
                    <button className="login-button" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }

    const HandleAdd = () => {
        console.log("hi add");
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const onLoginSubmit = (e: React.MouseEvent) => {
            e.preventDefault();
            handleClose();
        };

        return (
            <>
                <Buttons
                    move="right"
                    onClick={handleShow}
                    text="Add Department"
                />
                <Modal show={show} onHide={handleClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Department</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DepartmentForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    useEffect(() => {
        if (success) {
            alert("Department deleted successfully!")
        }
    }, [success])

    departments?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            deptName: value.deptName,
            actionButtons: [{
                children: "Update",
                onClick: () => handleEdit(value.id)
            },
            {
                children: "Delete",
                onClick: () => handleDelete(value.id)
            }]
        }
        rowDept.push(object)
    })

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Departments</h1>
                <Buttons
                    move="left"
                    onClick={() => navigate('/admin')}
                    text="Go Back"
                />
                <HandleAdd />
            </div>

            <br /><br />
            <TableData columns={columnsDept} rows={rowDept} />
        </>
    )
}

export default AllDepartment;