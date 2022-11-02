//ADMIN ---> Available Department with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../../common/navbar";
import Buttons from "../../../common/button/Button";
import { store } from "../../../../store/store";
import TableData from "../../../common/table/Table";
import { getAllDept } from "../../../../action/action";

const AllDepartment: React.FC = () => {
    // const [values, setValues] = useState([]);
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const departments = useSelector((state: any) => state.userData.depts[0]);

    // console.log("All Departments: ", departments);      //prints -> all department data in db.json

    const columnsDept: { title: string; key: string}[] = [
        {"title": "Department Name", "key": "department name"},
        {"title": "Id", "key": "id"},
        {"title": "Action", "key": "action"}
    ]; 

    useEffect(() => {
        dispatchStore(getAllDept());
    }, []);

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Department</h1>
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
            <TableData columns={columnsDept} rows={departments}/>
        </>
    )
}

export default AllDepartment;