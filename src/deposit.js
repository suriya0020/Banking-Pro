import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./deposit.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const DepositForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the last signed-in user from localStorage
    const signedInUsers = JSON.parse(localStorage.getItem("signedInUsers")) || [];
    const lastSignedIn = signedInUsers[signedInUsers.length - 1];

    if (lastSignedIn) {
      setUserName(lastSignedIn.name);
      setEmail(lastSignedIn.email);
      loadBalance(lastSignedIn.email);
    } else {
      alert("You are not signed in. Redirecting to Sign-in page.");
      navigate("/signin");
    }
  }, [navigate]);

  const loadBalance = (userEmail) => {
    const savedBalance = localStorage.getItem(`balance_${userEmail}`);
    setCurrentBalance(parseFloat(savedBalance) || 0);
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);

    if (isNaN(amount)) {
      setError("Please enter a valid number.");
      return;
    }
    if (amount < 1 || amount > 1000000) {
      setError("Deposit amount must be between ₹1 and ₹1,000,000.");
      return;
    }

    const savedBalance = localStorage.getItem(`balance_${email}`);
    const currentBal = parseFloat(savedBalance) || 0;
    const newBalance = currentBal + amount;

    localStorage.setItem(`balance_${email}`, newBalance.toString());
    setCurrentBalance(newBalance);

    alert(
      `Hi ${userName},\n\n` +
        `Deposited to: ${email}\n` +
        `Previous Balance: ₹${currentBal.toFixed(2)}\n` +
        `Deposited Amount: ₹${amount}\n` +
        `New Balance: ₹${newBalance.toFixed(2)}`
    );

    setDepositAmount("");
    setError("");
    navigate("/withdraw");
  };

  const handleLogout = () => {
    const signedInUsers = JSON.parse(localStorage.getItem("signedInUsers")) || [];
    const updatedUsers = signedInUsers.filter((user) => user.email !== email);
    localStorage.setItem("signedInUsers", JSON.stringify(updatedUsers));

    alert("You have successfully logged out.");
    navigate("/");
  };

  return (
    <div className="deposit-container">
      <nav className="navbar">
        <span className="bank-name">Shizuka Bank</span>
        <ul className="nav-links">
          <li>
            <a href="/withdraw">Withdraw</a>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="signup-design">
      <h2 className="mt-5">Deposit</h2>

      <form onSubmit={handleDeposit} className="deposit-form">
        <p>{currentBalance.toFixed(2)}</p>
        <input
          type="number"
          placeholder="Deposit Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          min="1"
          max="1000000"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Deposit</button>
      </form>
    </div></div>
  );
};

export default DepositForm;
