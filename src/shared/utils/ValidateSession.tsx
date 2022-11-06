import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ValidateSession = () => {

    console.log("In validating session");
    const navigate = useNavigate();

    const validateSession = () => {
        let url = window.location.href;

        //free routes
        if (url.indexOf('login') > -1 || url === 'http://localhost:3000/') {   
            return true;
        }

        if (sessionStorage.getItem('email') && sessionStorage.getItem('role')) //Check if login
            return true;
        else {
            return false;
        }
    }

    useEffect(() => {
        if (!validateSession()) {
            navigate('/login')
        }
    })
}

export default ValidateSession;