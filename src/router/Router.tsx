import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/common/Home";
import Login from "../components/login/Login";

const Router: React.FC = () => {
    return (
        <div className = "App">
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/login" element = {<Login />} />
            </Routes>
        </div>
    )
}

export default Router;