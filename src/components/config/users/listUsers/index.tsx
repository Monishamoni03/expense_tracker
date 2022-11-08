//Admin - WELCOME PAGE - List of users

import React, { Dispatch, useEffect, useState } from "react";
import "./index.css";
import NavBar from "../../../common/navbar";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../../action/action";
import { store } from "../../../../store/store";
import TableData from "../../../common/table";
import { RowProps } from "../../../../shared/types/type";

const Admin: React.FC = () => {

  const users = useSelector((state: any) => state.userData.users[0]);
  const [success, setSuccess] = useState(false);
  const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

  const columnsUser: { title: string; key: string }[] = [
    { "title": "Id", "key": "id" },
    { "title": "Email ID", "key": "email" },
    { "title": "Role", "key": "role" },
  ];

  useEffect(() => {
    dispatchStore(getAllUser());
  }, [success]);


  const rowUser: RowProps[] = [] as RowProps[];

  users?.forEach((value: any) => {
    const object: RowProps = {
      key: value.id,
      email: value.email,
      role: value.role,
    }
    rowUser.push(object)
  })

  return (
    <>
      <NavBar />
      <h1 style={{ textAlign: "center" }}>List of Users</h1>
      <TableData columns={columnsUser} rows={rowUser} />
    </>
  )
}

export default Admin;