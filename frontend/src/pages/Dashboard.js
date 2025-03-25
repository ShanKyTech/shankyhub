import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token"); // Retrieve token from localStorage
            if (!token) {
                navigate("/login"); // Redirect if no token
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/user", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }, // Include token in headers
                });

                const data = await response.json();
                if (response.ok) {
                    setUser(data); // Set user data if request is successful
                } else {
                    alert("Error fetching user data");
                    localStorage.removeItem("token"); // Clear token if error
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <div>
                    <p>Welcome, {user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
