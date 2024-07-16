import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './../../hooks/UseAuth';


const Logout = () => {
    const navigate = useNavigate();
    const {logout}=useAuth();
    useEffect(() => {
        const handleLogout = () => {
            logout(); // Call your logout function
            navigate('/login'); // Redirect to login after logout
        };

        handleLogout();
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default Logout;
