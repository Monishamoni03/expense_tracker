//Admin - WELCOME PAGE

import React from "react";
import "./index.css";
import NavBar from "../common/navbar";
import Menu from "../common/menu/Menu";

const Admin: React.FC = () => {

  return (
    <>
      <NavBar />
      {/* <Menu /> */}
      <div className='admin-container'>
        <h1 style={{ textAlign: "center", color: "pink" }}>Welcome Admin</h1>        
      </div>
      {/* <div className='footer-container'>
        <p className='copyrights'>Expense Tracker © 2022</p>
      </div> */}
    </>
  )
}

export default Admin;