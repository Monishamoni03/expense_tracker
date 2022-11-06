import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../common/navbar";
import TableData from "../common/table";

const AccountantOrEmployee: React.FC = () => {

    let column: { title: string; key: string}[]

    const location = useLocation()

    console.log(location.state.role);
    if(location.state.role === 'Accountant') {
        column = [
            {"title": "Category", "key": "id"},
            {"title": "Department", "key": "department"},
            {"title": "Amount", "key": "amount"},
            {"title": "Added By", "key": "added by"},
            {"title": "Approved By", "key": "approved by"},
            {"title": "Action", "key": "action"}
        ];
    }
     else if(location.state.role === 'Employee') {
        column = [
            {"title": "Categoy", "key": "category"},
            {"title": "Department", "key": "department"},
            {"title": "Amount", "key": "amount"},
            {"title": "Approved By", "key": "approved by"},
            {"title": "Action", "key": "action"}
        ]; 
     }

    return (
        <div>
            <NavBar />
            <h1 style = {{textAlign: "center"}}>Hello {location.state.role }</h1>
            <TableData columns = {column} />
        </div>
    )
}

export default AccountantOrEmployee;