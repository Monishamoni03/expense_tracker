//ADMIN ---> Available Department with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Buttons from "../../common/button";
import { store } from "../../../store";
import TableData from "../../common/table";
import { deleteDept, editDepartment, getAllDept } from "../../../action/action";
import { RowProps } from "../../../shared/types/type";
import "../../../assets/css/Style";
import "../../login/index.css"
import { initialStateDept, initialStateDeptError } from "../../../shared/types/types";
import { DeptInputFieldError, DeptInputField } from "../../../shared/types/type";
import ValidateDept from "../../../shared/utils/ValidateDepartment";
import { Button, Modal } from "react-bootstrap";
import NavBar from "../../common/navbar";
import { columnDept } from "../../config/department";
import successMessage from "../../../shared/utils/alertMessage";
import AddModalDepartment from "./modal";

const AllDepartment: React.FC = () => {

    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const departments = useSelector((state: any) => state.departmentData.depts);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<DeptInputField>(initialStateDept);
    const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

    const [show, setShow] = useState(false);
    const departmentModalClose = () => setShow(false);
    const departmentModalShow = () => setShow(true);

    const rowDept: RowProps[] = [] as RowProps[];

    useEffect(() => {
        dispatchStore(getAllDept());
    }, [success]);

    const departmentDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this Department?')) {
            await dispatchStore(deleteDept(id));
            setSuccess(true);
            successMessage("Department deleted successfully")
        }
    }

    const departmentEditSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        departmentModalClose();

        console.log("value in onsubmit", values);

        const isValid = ValidateDept(values);
        console.log("Is valid", isValid);
        setError({
            ...error,
            [e.target.name]: error
        })
        console.log("hello err: ", error);
        if (isValid) {
            dispatchStore(editDepartment(values.id, values));
            setSuccess(true);
            successMessage("Successfully department name updated to the table");
            console.log("Output values", values);       //printing result
        }
    };

    const DepartmentForm = (): any => {
        [values, setValues] = useState<DeptInputField>(values);
        const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

        const onDepartment = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
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

    const DepartmentEdit = () => {
        console.log("----------Hi department edit----------");
        console.log("Value in edit fn", values);

        return (
            <>
                <Modal show={show} onHide={departmentModalClose} onCancel={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DepartmentForm />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={departmentEditSubmit}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={departmentModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    const departmentEdit = (id, value) => {
        console.log("id", id);
        console.log("value", value);
        //retrieving old values
        setValues(value);
        departmentModalShow();
    }

    departments?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            deptName: value.deptName,
            actionButtons: [{
                children: "Update",
                onClick: () => departmentEdit(value.id, value)
            },
            {
                children: "Delete",
                onClick: () => departmentDelete(value.id)
            }]
        }
        rowDept.push(object)
    })

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Departments</h1>
                <Buttons
                    move="left"
                    onClick={() => navigate('/admin')}
                    text="Go Back"
                />
                <AddModalDepartment />
                <DepartmentEdit />
            </div>

            <br /><br />
            <TableData columns={columnDept} rows={rowDept} />
        </>
    )
}

export default AllDepartment;