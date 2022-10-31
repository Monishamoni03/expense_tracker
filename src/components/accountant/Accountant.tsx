import React from "react";
import NavBar from "../common/navbar";
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import TableData from "../table";

const Accountant: React.FC = () => {
    const columnsAcc: { title: string; key: string}[] = [
        {"title": "Category", "key": "id"},
        {"title": "Department", "key": "department"},
        {"title": "Amount", "key": "amount"},
        {"title": "Added By", "key": "added by"},
        {"title": "Approved By", "key": "approved by"},
        {"title": "Action", "key": "action"}
    ];

    return (
        <div>
            <NavBar />
            <h1>Hello Accountant</h1>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table">
                    <TableHead>
                        <TableRow><TableData columns={columnsAcc} style={{height: "8000px", backgroundColor: "red"}}></TableData></TableRow>
                        {/* <TableRow>
                            <TableCell><b>Category</b></TableCell>
                            <TableCell><b>Department</b></TableCell>
                            <TableCell><b>Amount</b></TableCell>
                            <TableCell><b>Added By</b></TableCell>
                            <TableCell><b>Approved By</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow> */}
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

export default Accountant;