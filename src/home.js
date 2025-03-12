import React from "react";
import "./home.css"; // Import the CSS file

const SusukaBank = () => {
  return (
    <div className="container">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">
          <h1>Shizuka Bank</h1>
        </div>
        <nav className="nav-links">
          <a href="/Login">AdminLogin</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="hero">
        <h2>
          Welcome to <span>Shizuka Bank</span>
        </h2>
        <p>Bank smarter, live better. Your trusted financial partner for a brighter future.</p>
        <div className="auth-buttons">
          <a href="/signin" className="unique-btn signin">
            <span>🔒 Sign In</span>
          </a>
          <a href="/signup" className="unique-btn signup">
            <span>📝 Sign Up</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default SusukaBank;