//Admin - WELCOME PAGE

import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import NavBar from "../common/navbar";
import Buttons from "../button/Button";

const Admin: React.FC = () => {

  let navigate = useNavigate();

  const availableUsers = () => {
    navigate('/users')
  }

  const availableDepartments = () => {
    navigate('/departments')
  }

  const availableCategories = () => {
    navigate('/categories')
  }

  return (
    <>
      <NavBar />
      <div className='admin-container'>
        <h1 style={{ textAlign: "center", color: "red" }}>Welcome Admin</h1>
        <div className="buttons">
          {/* <button onClick={availableUsers} type='button' className="admin-button">See available users</button> */}
          <Buttons
            move=""
            onClick={availableUsers}
            text="See available users"
          />
          <Buttons
            move=""
            onClick={availableDepartments}
            text="List of Departments"
          />
          <Buttons
            move=""
            onClick={availableCategories}
            text="List of Categories"
          />
        </div>
      </div>
      <div className='footer-container'>
        <p className='copyrights'>Expense Tracker © 2022</p>
      </div>
    </>
  )
}

export default Admin;