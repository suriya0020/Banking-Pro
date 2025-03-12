import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./home.js";
import Login from "./login.js";
import AdminDashboard from "./admindashboard.js";
import Signup from "./signup.js";
import Signin from "./signin.js";
import Deposit from "./deposit.js";
import Withdraw from "./withdraw.js";
import Footer from "./Footer.js";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
