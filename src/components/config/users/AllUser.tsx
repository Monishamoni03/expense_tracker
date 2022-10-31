//ADMIN ---> Available USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { Table, TableBody, TableCell, Paper, TableHead, TableRow, Button, styled, TableContainer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/navbar";
import Buttons from "../../button/Button";
import TableData from "../../table/Table";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../action/action";
import { store } from "../../../store/store";

const StyledTable = styled(Table)`
    width: 90%;
    margin: 90px 0 0 90px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 25px
    }
`;

const AllUser: React.FC = () => {
    const [values, setValues] = useState([]);
    const navigate = useNavigate();
    const users = useSelector((state: any) => state.userData.users)
    console.log("All user data : ", users);
    

    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

    const columnsUser: { title: string; key: string}[] = [
        {"title": "Id", "key": "id"},
        {"title": "Email ID", "key": "email"},
        {"title": "Role", "key": "role"},
        {"title": "Action", "key": "action"}
    ]; 

    // const rowUser = {users}

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        dispatchStore(getAllUser(users));
    }
    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Users</h1>
                <Buttons 
                    move = "left"
                    onClick={() => navigate('/admin')} 
                    text = "Go Back" 
                />
                <Buttons 
                    move = "right"
                    onClick={() => navigate('/adduser')}
                    text = "Add User"
                />
            </div>

            {/* <TableData columns={columnsUser} style={{}}></TableData> */}
            <StyledTable>
                <TableHead>
                    <THead>
                        <TableData columns={columnsUser} style={{}}></TableData>
                    </THead>
                </TableHead>
                {/* <TableBody>
                    {values.map((users) => (
                        <TRow key={users.id}>
                            <TableCell>{users.email}</TableCell>
                            <TableCell>{users.role}</TableCell>
                        </TRow>
                    ))}
                </TableBody> */}
            </StyledTable>
            {/* <TableData columns={columnsUser}></TableData> */}

            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column: ColumnProps) => (
                                <TableCell key={column.title}>{column.title}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: RowProps) => {
                            const { actionButtons, ...cells} = row
                        })}
                    </TableBody>
                </Table> 
            </TableContainer> */}
            




            {/* <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell style={{ paddingLeft: "7%" }}>Action</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                    {values.map((value) => (
                        <TRow key={value.id}>
                            {/ <TableCell>{value._id}</TableCell>  *}
                            {* <TableCell>{value.email}</TableCell>
                    <TableCell>{value.password}</TableCell> */}
            {/* //                 <TableCell>
            //                     <Button color="primary" variant="contained" style={{ marginRight: 20 }}>Edit</Button>
            //                     <Button color="secondary" variant="contained" style={{ marginRight: 25 }}>Delete</Button>
            //                     <Button color="primary" variant="contained" style={{ marginRight: 5 }}>View</Button>
            //                 </TableCell> */}
            {/* //             </TRow> */}
            {/* //         ))} */}
            {/* //     </TableBody> */}
            {/* // </StyledTable> */} 
        </>
    )
}

export default AllUser;