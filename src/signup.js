import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordSuggestions, setPasswordSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({ ...prev, name: "Only letters are allowed." }));
      } else {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
    }

    if (name === "email") {
      if (!value.includes("@")) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "phone") {
      if (!/^\d{10}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone number must be 10 digits.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }

    if (name === "password") {
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
      setErrors((prev) => ({
        ...prev,
        password: suggestions.length > 0 ? "Password does not meet requirements." : "",
      }));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.name || errors.email || errors.phone || errors.password) {
      alert("Please fix the errors before submitting.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "This email is already registered.",
      }));
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup Successful!");
    navigate("/signin");
  };

  return (
    <div className="container">
      <nav className="navbar">
        <span className="bank-name">Shizuka Bank</span>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/signin">Sign In</a></li>
        </ul>
      </nav>

      <div className="signup-box">
        <h2 style={{ marginTop: "0px" }}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ margin: "2px" }}>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Phone Number</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
          {passwordSuggestions.length > 0 && (
            <ul className="suggestions">
              {passwordSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
