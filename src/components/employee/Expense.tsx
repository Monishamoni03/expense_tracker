import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";
import NavBar from "../common/navbar";

const Expense: React.FC = () => {
    return (
        <div>
            <NavBar />
            <h1 style={{textAlign: "center"}}>Welcome Employee</h1>
            {/* <button onClick={() => navigate('/addexpense')} */}
            <button 
                    type='button'
                    style={{ float: "left" }}
                    className="admin-button"
                    data-toggle='modal'
                    data-target='#exampleModal'
                    id='all-book'>
                    Add Expense
            </button>
            <TableContainer>
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
                    {/* <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row._id}</TableCell>
                                <TableCell>{row.userName}</TableCell>
                                <TableCell>{row.hotelName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody> */}
                </Table>
            </TableContainer>
        </div>
    )
}

export default Expense;