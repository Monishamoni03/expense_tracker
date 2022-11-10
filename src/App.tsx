import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./router";

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
            <ToastContainer/>
        </>
    )
}

export default App;