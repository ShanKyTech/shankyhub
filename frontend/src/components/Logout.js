import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/login');
    }, [navigate]);

    return <h2>Logging out...</h2>;
};

export default Logout;
