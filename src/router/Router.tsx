import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AccountantOrEmployee from "../components/accountantOremployee";
import Admin from "../components/admin";
import AddCategory from "../components/admin/categories/AddCategory";
import AddDepartment from "../components/admin/department/AddDept";
import AllCategory from "../components/config/categories/listCategories/AllCategory";
import AllDepartment from "../components/config/department/listDept.tsx/AllDepartment";
import AddUser from "../components/config/users/AddUser";
import AllUser from "../components/config/users/AllUser";
import Home from "../components/common/Home";
import Login from "../components/login/Login";
import ValidateSession from "../shared/utils/ValidateSession";
import Menu from "../components/common/menu/Menu";

const Router: React.FC = () => {

    ValidateSession();          //route protection

    let url = window.location.href;
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('role') === 'Accountant' || sessionStorage.getItem('role') === 'Employee') {
            navigate(-1)        //reloads to same - previous page
        } else if (sessionStorage.getItem('role') === 'Admin' && url.indexOf('/admin')) {
            navigate('/admin')
        }
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path = "/" element={<Home />} />
                <Route path = "/login" element={<Login />} />
                
                {/* nested routes - ADMIN */}
                <Route path = "/admin" element={<Menu />}>
                    <Route path = "" element = {<Admin />} />
                    <Route path = "users" element={<AllUser />} />
                    <Route path = "departments" element={<AllDepartment />} />
                    <Route path = "categories" element={<AllCategory />} />
                </Route>

                <Route path="/adduser" element={<AddUser />} />
                <Route path="/adddepartment" element={<AddDepartment />} />
                <Route path="/addcategory" element={<AddCategory />} />
                <Route path='/home' element={<AccountantOrEmployee />} />                 {/* employee / accountant */}
            </Routes>
        </div>
    )
}

export default Router;