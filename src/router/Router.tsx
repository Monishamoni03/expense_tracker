import React from "react";
import { Route, Routes } from "react-router-dom";
import Accountant from "../components/accountant/Accountant";
import Admin from "../components/admin";
import AddCategory from "../components/admin/categories/AddCategory";
import AddDepartment from "../components/admin/department/AddDept";
import AllCategory from "../components/config/categories/listCategories/AllCategory";
import AllDepartment from "../components/config/department/listDept.tsx/AllDepartment";
import AddUser from "../components/config/users/AddUser";
import AllUser from "../components/config/users/AllUser";
import Home from "../components/common/Home";
import Expense from "../components/employee/Expense";
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
                <Route path = "/departments" element = {<AllDepartment />} />
                <Route path = "/adddepartment" element = {<AddDepartment />} />
                <Route path = "/categories" element = {<AllCategory />} />
                <Route path = "/addcategory" element = {<AddCategory />} /> 
                <Route path = "/employee" element = {<Expense />} />
                <Route path = "/accountant" element = {<Accountant />} />
            </Routes>
        </div>
    )
}

export default Router;