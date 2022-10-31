import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import "./index.css";

const NavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('Home');
    } else if (location.pathname === '/login') {
      setActiveTab('Login');
    }
  }, [location]);

  return (
    <>
      <div className='header'>
        <p className='logo'>Expense Tracker</p>
        <div className='header-right'>
          <Link to='/'>
            <p className={`${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}><HomeIcon />{" "}Home |</p>
          </Link>
          <Link to='/login'>
            <p className={`${activeTab === 'Login' ? 'active' : ''}`} onClick={() => setActiveTab('Login')}><LoginIcon />{" "}Login</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NavBar;