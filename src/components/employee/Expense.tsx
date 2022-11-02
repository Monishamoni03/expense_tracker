import React from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../common/button/Button";
import NavBar from "../common/navbar";
import TableData from "../common/table/Table";

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
                onClick={() => navigate('/addcategory')}
                text="Add EXpense"
            />

            <br /><br />
            <TableData columns={columnsExpense} />
            
            {/* <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Category</b></TableCell>
                            <TableCell><b>Department</b></TableCell>
                            <TableCell><b>Amount</b></TableCell>
                            <TableCell><b>Approved By</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.userName}</TableCell>
                                <TableCell>{row.hotelName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody> 
                </Table>
            </TableContainer> */}
        </div>
    )
}

export default Expense;