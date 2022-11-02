//ADMIN ---> Available USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/navbar";
import Buttons from "../../common/button/Button";
import TableData from "../../common/table/Table";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../action/action";
import { store } from "../../../store/store";
import { IconButtonProps } from "@mui/material";
import { RowProps } from "../../../shared/types/type";

const AllUser: React.FC = () => {
    // const [values, setValues] = useState([]);
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const users = useSelector((state: any) => state.userData.users[0]);

    // console.log("All user data : ", users);   //prints -> all user data in db.json 

    const columnsUser: { title: string; key: string }[] = [
        { "title": "Id", "key": "id" },
        { "title": "Email ID", "key": "email" },
        // { "title": "Password", "key": "password" },
        { "title": "Role", "key": "role" },
        { "title": "Action", "key": "action" }
    ];

    // users && users.map((e) => {
    //     console.log("Element: ", e);         //prints -> all individual user data
    // });

    useEffect(() => {
        dispatchStore(getAllUser());
    }, []);


    const rowUser: RowProps[] = [] as RowProps[];

    const handleEdit = (id: number) => {
        console.log("Handle edit");
        
    }

    const handleDelete = (id: number) => {
        console.log("Handle delete");
        
    }

    users?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            email: value.email,
            // password: value.password,
            role: value.role,
            actionButtons: [{
                children: "Update",
                onClick: () => handleEdit(value.id)
            },
            {
                children: "Delete",
                onClick: () => handleDelete(value.id)
            }]
        }
        rowUser.push(object)
    })

    return (
        <>
            <NavBar />
            <div className="admin-page">
                <h1 style={{ textAlign: "center" }}>Available Users</h1>
                <Buttons
                    move="left"
                    onClick={() => navigate('/admin')}
                    text="Go Back"
                />
                <Buttons
                    move="right"
                    onClick={() => navigate('/adduser')}
                    text="Add User"
                />
            </div>

            <br /><br />
            <TableData columns={columnsUser} rows={rowUser} />

        </>
    )
}

export default AllUser;