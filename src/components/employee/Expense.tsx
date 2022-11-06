import React from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../common/button/Button";
import NavBar from "../common/navbar";
import TableData from "../common/table";

const Expense: React.FC = () => {

    const navigate = useNavigate();

    const columnsExpense: { title: string; key: string}[] = [
        {"title": "Categoy", "key": "category"},
        {"title": "Department", "key": "department"},
        {"title": "Amount", "key": "amount"},
        {"title": "Approved By", "key": "approved by"},
        {"title": "Action", "key": "action"}
    ]; 

    return (
        <div>
            <NavBar />
            <h1 style={{ textAlign: "center" }}>Welcome Employee</h1>
            <Buttons
                move="left"
                onClick={() => navigate('/')}
                text="Add Expense"
            />

            <br /><br />
            <TableData columns = {columnsExpense} />
            
        </div>
    )
}

export default Expense;