import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AccountantOrEmployee from "../components/accountantOremployee";
import Admin from "../components/config/users/listUsers";
import AllCategory from "../components/config/categories/listCategories/Category";
import AllDepartment from "../components/config/department/listDept.tsx/Department";
import AllUser from "../components/config/users/User";
import Home from "../components/common/Home";
import Login from "../components/login";
import ValidateSession from "../shared/utils/ValidateSession";
import Menu from "../components/common/menu";

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
                {/* common routes */}
                <Route path = "/" element={<Home />} />
                <Route path = "/login" element={<Login />} />
                
                {/* nested routes - ADMIN */}
                <Route path = "/admin" element={<Menu />}>
                    <Route path = "" element = {<Admin />} />
                    <Route path = "users" element={<AllUser />} />
                    <Route path = "departments" element={<AllDepartment />} />
                    <Route path = "categories" element={<AllCategory />} />
                </Route>

                <Route path='/home' element={<AccountantOrEmployee />} />                 {/* employee / accountant */}
            </Routes>
        </div>
    )
}

export default Router;