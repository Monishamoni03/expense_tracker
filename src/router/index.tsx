import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AccountantOrEmployee from "../components/accountantOremployee";
import Login from "../components/login";
import ValidateSession from "../shared/utils/ValidateSession";
import Menu from "../components/common/menu";
import AllUser from "../components/admin/users";
import AllDepartment from "../components/admin/department";
import AllCategory from "../components/admin/categories";
import Admin from "../components/admin/home";
import Home from "../components/common/home";

const Router: React.FC = () => {

    //route protection
    ValidateSession();          

    let url = window.location.href;
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('role') === 'Accountant' || sessionStorage.getItem('role') === 'Employee') {
            //reloads to same - previous page
            navigate(-1)        
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

                {/* employee / accountant */}
                <Route path='/home' element={<AccountantOrEmployee />} />                 
            </Routes>
        </div>
    )
}

export default Router;