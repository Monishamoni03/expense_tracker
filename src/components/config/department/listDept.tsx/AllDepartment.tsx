//ADMIN ---> Available Department with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../../common/navbar";
import Buttons from "../../../common/button/Button";
import { store } from "../../../../store/store";
import TableData from "../../../common/table";
import { deleteDept, getAllDept } from "../../../../action/action";
import { RowProps } from "../../../../shared/types/type";

const AllDepartment: React.FC = () => {
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const departments = useSelector((state: any) => state.userData.depts[0]);
    const [success, setSuccess] = useState(false);

    // console.log("All Departments: ", departments);      //prints -> all department data in db.json

    const columnsDept: { title: string; key: string}[] = [
        {"title": "Id", "key": "id"},
        {"title": "Department Name", "key": "department name"},
        {"title": "Action", "key": "action"},
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
            setSuccess(true)
            // getAllDept();
        }
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
            {/* <NavBar /> */}
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Departments</h1>
                <Buttons 
                    move = "left"
                    onClick={() => navigate('/admin')} 
                    text = "Go Back" 
                />
                <Buttons 
                    move = "right"
                    onClick={() => navigate('/adddepartment')}
                    text = "Add Department"
                />
            </div>

            <br /><br />
            <TableData columns = {columnsDept} rows = {rowDept}/>
        </>
    )
}

export default AllDepartment;