//ADMIN ---> Available USERS with add btn in the top, edit, delete

import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../common/navbar";
import Buttons from "../../common/button/Button";
import TableData from "../../common/table";
import { useSelector } from "react-redux";
import { deleteUser, editUser, getAllUser } from "../../../action/action";
import { store } from "../../../store/store";
import { RowProps } from "../../../shared/types/type";

const AllUser: React.FC = () => {
    const navigate = useNavigate();
    const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;
    const users = useSelector((state: any) => state.userData.users[0]);
    const [success, setSuccess] = useState(false)

    // console.log("All user data : ", users);   //prints -> all user data in db.json 

    const columnsUser: { title: string; key: string }[] = [
        { "title": "Id", "key": "id" },
        { "title": "Email ID", "key": "email" },
        { "title": "Role", "key": "role" },
        { "title": "Action", "key": "action" },
        { "title": "Action", "key": "action" }
    ];

    // users && users.map((e) => {
    //     console.log("Element: ", e);         //prints -> all individual user data
    // });

    useEffect(() => {
        dispatchStore(getAllUser());
    }, [success]);


    const rowUser: RowProps[] = [] as RowProps[];

    const handleEdit = (id: number, value: any) => {
        console.log("Handle edit");
        // dispatchStore(editUser(id, value))

    }

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete the user?")) {
            dispatchStore(deleteUser(id));
            setSuccess(true)
        }
    }

    useEffect(() => {
        if (success) {
            alert("User deleted successfully!")
        }
    }, [success])

    users?.forEach((value: any) => {
        const object: RowProps = {
            key: value.id,
            email: value.email,
            role: value.role,
            actionButtons: [{
                children: "Update",
                onClick: () => handleEdit(value.id, value)
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
            {/* <NavBar /> */}
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