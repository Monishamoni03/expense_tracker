import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "../components/admin/Admin";
import AddUser from "../components/admin/users/AddUser";
import AllUser from "../components/admin/users/AllUser";
import Home from "../components/common/Home";
import Login from "../components/login/Login";

const Router: React.FC = () => {
    return (
        <div className = "App">
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "/admin" element = {<Admin />} />
                <Route path = "/users" element = {<AllUser />} />
                <Route path = "/adduser" element = {<AddUser />} />
            </Routes>
        </div>
    )
}

export default Router;