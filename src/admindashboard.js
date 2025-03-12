import React from "react";
import { useNavigate } from "react-router-dom";
import "./admindashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Fetch all users from local storage
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  const handleLogout = () => {
    alert("Admin Logged Out Successfully!");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <span className="bank-name">Shizuka Bank - Admin Dashboard</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className="user-list">
        <h2>User Details</h2>
        {allUsers.length > 0 ? (
          <div className="user-cards">
            {allUsers.map((user, index) => (
              <div key={index} className="user-card">
                <h3>{user.name}</h3>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Balance:</strong> ₹{localStorage.getItem(`balance_${user.email}`) || 0}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No users have signed up yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

