import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import EditIcon from '@mui/icons-material/Edit';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import CategoryIcon from '@mui/icons-material/Category';
import { FaBars } from "react-icons/fa";

const Menu: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: '/admin',
            name: "Available Users",
            icon: <PeopleOutlineIcon />
        },
        {
            path: '/admin/users',
            name: "Edit Users",
            icon: <EditIcon />
        },
        {
            path: '/admin/departments',
            name: "Departments",
            icon: <FolderCopyIcon />
        },
        {
            path: '/admin/categories',
            name: "Categories",
            icon: <CategoryIcon />
        }
    ]

    return (
        <div className="menu-container">
            <div style={{ width: "450px" }} className="sidebar">
            <div className="top-section">
                <h1 className="site-title" style={{ display: "block", textAlign: "center"}}>Welcome Admin</h1>
                    <div style={{ marginLeft: isOpen ? "5px" : "-10px", textDecoration: "none" }} className="bars">
                      {/* <FaBars onClick={toggle} /> */}
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" >
                            <div className="menu-icon">
                                {item.icon}
                            </div>
                            <div style={{ display: "block" }} className="menu-panel-link">
                                {item.name}
                            </div>
                        </NavLink>
                    ))
                }
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Menu;