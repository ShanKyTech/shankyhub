import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {
                email,
                password,
            });
            // Store token in localStorage
            localStorage.setItem('token', response.data.token);
            alert(`Welcome back!`);
            // Redirect to the dashboard
            navigate('/dashboard'); // Ensure this line is correct
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred';
            alert(errorMessage);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
