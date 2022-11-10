//expense

import React from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../common/button";
import NavBar from "../common/navbar";
import TableData from "../common/table";
import { columnExpense } from "../config/employee";

const Expense: React.FC = () => {

    const navigate = useNavigate();

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
            <TableData columns = {columnExpense} />
            
        </div>
    )
}

export default Expense;