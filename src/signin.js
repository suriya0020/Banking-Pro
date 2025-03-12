import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === formData.email);

    if (!user) {
      setErrors((prev) => ({ ...prev, email: "Email not found. Please sign up first." }));
      return;
    }

    if (user.password !== formData.password) {
      setErrors((prev) => ({ ...prev, password: "Incorrect password." }));
      return;
    }

    alert("Signin Successful!");

    const signInDetails = {
      name: user.name,
      email: user.email,
      date: new Date().toLocaleString(),
    };

    const signedInUsers = JSON.parse(localStorage.getItem("signedInUsers")) || [];
    signedInUsers.push(signInDetails);
    localStorage.setItem("signedInUsers", JSON.stringify(signedInUsers));

    navigate("/deposit");
  };

  return (
    <div className="container">
      <nav className="navbar">
        <span className="bank-name">Shizuka Bank</span>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/signup">Sign Up</a></li>
        </ul>
      </nav>

      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
