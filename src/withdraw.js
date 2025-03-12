import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./withdraw.css";

const WithdrawForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
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

  const handleWithdraw = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }

    if (amount > currentBalance) {
      setError("Insufficient Balance. Please enter a smaller amount.");
      return;
    }

    const newBalance = currentBalance - amount;

    localStorage.setItem(`balance_${email}`, newBalance.toString());
    setCurrentBalance(newBalance);

    alert(
      `Hi ${userName},\n\n` +
      `Withdrawn from: ${email}\n` +
      `Previous Balance: ₹${currentBalance.toFixed(2)}\n` +
      `Withdrawn Amount: ₹${amount}\n` +
      `New Balance: ₹${newBalance.toFixed(2)}`
    );

    setWithdrawAmount("");
    setError("");
  };

  const handleLogout = () => {
    const signedInUsers = JSON.parse(localStorage.getItem("signedInUsers")) || [];
    const updatedUsers = signedInUsers.filter((user) => user.email !== email);
    localStorage.setItem("signedInUsers", JSON.stringify(updatedUsers));

    alert("You have successfully logged out.");
    navigate("/");
  };

  return (
    <div className="withdraw-container">
      <nav className="navbar">
        <span className="bank-name">Shizuka Bank</span>
        <ul className="nav-links">
          <li>
            <a href="/deposit">Deposit</a>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="">
        <h2>Withdraw</h2>

        <form onSubmit={handleWithdraw} className="withdraw-form">
          <p>Current Balance: ₹{currentBalance.toFixed(2)}</p>
          <input
            type="number"
            placeholder="Withdraw Amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            min="1"
            max={currentBalance}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Withdraw</button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawForm;
