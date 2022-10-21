// import React from "react";

// const AllUser: React.FC = () => {
//     return (
//         <>
//             <div>
//                 <h1 style={{ textAlign: "center" }}>Users</h1>
//             </div>
//         </>
//     )
// }

// export default AllUser;



// //ADMIN ---> Available USERS with add btn in the top, edit, delete

import React, { useState } from "react";
import { Table, TableBody, TableCell, Paper, TableHead, TableRow, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/NavBar";

const StyledTable = styled(Table)`
    width: 90%;
    margin: 90px 0 0 90px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 25px
    }
`;

const AllUser: React.FC = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Users</h1>
            </div>
            <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>User Name</TableCell>
                        <TableCell>Role</TableCell>
                        {/* <TableCell>Category</TableCell> */}
                        <TableCell style={{ paddingLeft: "7%" }}>Action</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TRow key={book.id}>
                            {/* <TableCell>{book._id}</TableCell>  */}
                            {/* <TableCell>{book.bookName}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.category}</TableCell> */}
                            <TableCell>
                                <Button color="primary" variant="contained" style={{ marginRight: 20 }}>Edit</Button>
                                <Button color="secondary" variant="contained" style={{ marginRight: 25 }}>Delete</Button>
                                <Button color="primary" variant="contained" style={{ marginRight: 5 }}>View</Button>
                            </TableCell>
                        </TRow>
                    ))}
                </TableBody>
            </StyledTable>
            <div className='book-container'>

                <button onClick={() => navigate('/admin')}
                    type='button'
                    className="admin-button"
                    data-toggle='modal'
                    data-target='#exampleModal'
                    id='all-book'>
                    Go Back
                </button>

                <button onClick={() => navigate('/adduser')}
                    type='button'
                    className="admin-button"
                    data-toggle='modal'
                    data-target='#exampleModal'
                    id='all-book'>
                    Add User
                </button>

            </div>
        </>
    )
}

export default AllUser;