import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from '../../Utils/Auth';


const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = () => {
            LogOut(); // Call your logout function
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
