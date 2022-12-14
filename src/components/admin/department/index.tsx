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
import { Button } from "react-bootstrap";
import NavBar from "../../common/navbar";
import { columnDept } from "../../config/department";
import ConfirmModal from "../../common/modal";
import AddDepartmentModalData from "./modal";
import ValidateFields from "../../../shared/utils/ValidateFields";
import showSuccessMessage from "../../../shared/utils/alertMessage";

const AllDepartment: React.FC = () => {

    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const departments = useSelector((state: any) => state.departmentData.depts);
    const [success, setSuccess] = useState(false);

    let [values, setValues] = useState<DeptInputField>(initialStateDept);
    const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);

    const [deleteId, setDeleteId] = useState();

    const rowDept: RowProps[] = [] as RowProps[];

    useEffect(() => {
        dispatchStore(getAllDept());
    }, [success]);

    const handleOnDepartmentDeleteSubmit = () => {
        dispatchStore(deleteDept(deleteId));
        setSuccess(true);
        setShow(false);
        showSuccessMessage("Department deleted successfully");
    }

    const DepartmentDelete = () => {
        console.log("----Department delete----");

        return (
            <>
                <ConfirmModal
                    show={show}
                    handleClose={() => setShow(false)}
                    handleShow={() => setShow(true)}
                    modalTitle="Delete Department"
                >
                    Are you sure you want to delete this department?

                    {/* FOOTER */}

                    <Button variant="primary" onClick={handleOnDepartmentDeleteSubmit}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                </ConfirmModal>               
            </>
        )
    }

    const departmentDelete = (id: any) => {
        console.log("Iddd in deleteeee", id);
        setDeleteId(id);
        setShow(true);
    }

    const handleOnDepartmentEditSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        dispatchStore(editDepartment(values.id, values));
        if (!error.deptName) {
            showSuccessMessage("Successfully department name updated to the table");
        }
        setSuccess(true);
        setEditShow(false);
    };

    const DepartmentForm = (): any => {
        [values, setValues] = useState<DeptInputField>(values);
        const [error, setError] = useState<DeptInputFieldError>(initialStateDeptError);

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

        return (
            <form className="login">
                <div className='login-form'>
                    <label htmlFor="deptName">Department Name <sup>*</sup></label>
                    <input onChange={(e) => onDepartment(e)} name='deptName' value={values.deptName} placeholder="Enter the department name" required />
                    <div style={{ color: "red" }}>{error.deptName}</div>
                </div>
            </form>
        )
    }

    const DepartmentEdit = () => {
        console.log("-----Hi department edit-----");
        console.log("Value in edit fn", values);

        return (
            <>
                <ConfirmModal
                    show={editShow}
                    handleClose={() => setEditShow(false)}
                    handleShow={() => setEditShow(true)}
                    modalTitle="Edit User"
                >
                    <DepartmentForm />

                    {/* FOOTER */}

                    <Button variant="primary" onClick={handleOnDepartmentEditSubmit}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={() => setEditShow(false)}>
                        Close
                    </Button>
                </ConfirmModal>
            </>
        )
    }

    const handleOnDepartmentEdit = (id, value) => {
        console.log("id", id);
        console.log("value", value);
        //retrieving old values
        setValues(value);
        setEditShow(true);
    }

    departments?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            deptName: value.deptName,
            actionButtons: [{
                children: "Update",
                onClick: () => handleOnDepartmentEdit(value.id, value)
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
                <AddDepartmentModalData />
                <DepartmentEdit />
                <DepartmentDelete />
            </div>

            <br /><br />
            <TableData columns={columnDept} rows={rowDept} />
        </>
    )
}

export default AllDepartment;