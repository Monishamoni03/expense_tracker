//Admin - WELCOME PAGE

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import NavBar from "../common/NavBar";

const Admin: React.FC = () => {

  let navigate = useNavigate();
//   const addUserRoute = () => {
//     navigate('/adduser')
//   }

  const availableUsers = () => {
    navigate('/users')
  }

//   const addDepartmentRoute = () => {
//     navigate('/adddepartment')
//   }

  const availableDepartments = () => {
    navigate('/departments')
  }

//   const addCategoryRoute = () => {
//     navigate('/addcategory')
//   }

  const availableCategories = () => {
    navigate('/categories')
  }

  return (
    <>
      <NavBar />
      <div className = 'admin-container'>
        <h1 style = {{ textAlign: "center", color: "red" }}>Welcome Admin</h1>
        <div className = "buttons">
          {/* <button onClick = {addUserRoute} type = 'button' className = "admin-button">Add Users</button> */}
          <button onClick = {availableUsers} type = 'button' className = "admin-button">See available users</button>
          {/* <button onClick = {addDepartmentRoute} type = 'button' className = "admin-button">Add Departments</button> */}
          <button onClick = {availableDepartments} type = 'button' className = "admin-button">List of Departments</button>
          {/* <button onClick = {addCategoryRoute} type = 'button' className = "admin-button">Add Category</button> */}
          <button onClick = {availableCategories} type = 'button' className = "admin-button">List of Categories</button>
        </div>
      </div>
    </>
  )
}

export default Admin;