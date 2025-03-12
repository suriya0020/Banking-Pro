import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
  });

  const [passwordSuggestions, setPasswordSuggestions] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    // Password validation
    const suggestions = [];
    if (value.length < 8) {
      suggestions.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(value)) {
      suggestions.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(value)) {
      suggestions.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(value)) {
      suggestions.push("Password must contain at least one number.");
    }

    setPasswordSuggestions(suggestions);

    if (suggestions.length > 0) {
      setErrors((prev) => ({ ...prev, password: "Password does not meet requirements." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the password is valid and matches the admin password
    if (passwordSuggestions.length > 0) {
      setErrors((prev) => ({ ...prev, password: "Please fix the password errors." }));
      return;
    }

    // Hardcoded admin password for demonstration
    if (password === "Admin@123") {
      alert("Admin Login Successful!");
      navigate("/admindashboard");
    } else {
      setErrors((prev) => ({ ...prev, password: "Invalid password." }));
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <span className="bank-name">Shizuka Bank - Admin Login</span>
      </nav>

      <div className="login-box">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
          {passwordSuggestions.length > 0 && (
            <ul className="suggestions">
              {passwordSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;