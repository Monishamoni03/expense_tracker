import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import "./index.css";
import Menu from "../menu/Menu";

const NavBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('role')
    navigate('/')
  }

  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     setActiveTab('Home');
  //   } else if (location.pathname === '/login') {
  //     setActiveTab('Login');
  //   } else if(location.pathname === '/'){
  //     setActiveTab('Logout')
  //     sessionStorage.removeItem('email')
  //     sessionStorage.removeItem('role')
  //   }
  // }, [location]);

  return (
    <>
      <div className='header'>
        <p className='logo'>Expense Tracker</p>
        <div className='header-right'>
          {/* <Link to='/'>
            <p className={`${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}><HomeIcon />{" "}Home |</p>
          </Link> */}
          {
            sessionStorage.getItem('email') ? <></> : <Link to='/login'>
            <p className={`${activeTab === 'Login' ? 'active' : ''}`} onClick={() => setActiveTab('Login')}><LoginIcon />{" "}Login</p>
          </Link>
          }
          {
            sessionStorage.getItem('email') ? <Link to='/'>
            <p className={`${activeTab === 'Logout' ? 'active' : ''}`} onClick={() => handleLogout()}><LogoutIcon />{" "}Logout</p>
          </Link> : <></>
          }
        </div>
      </div>
    </>
  )
}

export default NavBar;