import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.module.css"; // Optional for custom styling
 
export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
 
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Investify Dashboard</h1>
        <p>Welcome, <strong>{user?.email}</strong> 👋</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
 
      <main className="dashboard-grid">
        <Link to="/add-investment" className="card">
          <h2>➕ Add Investment</h2>
          <p>Record new stock or asset entries</p>
        </Link>
 
        <Link to="/portfolio" className="card">
          <h2>📁 View Portfolio</h2>
          <p>Monitor your investment performance</p>
        </Link>
 
        <Link to="/analyze" className="card">
          <h2>📈 Analyze Stocks</h2>
          <p>Get AI-powered trend analysis</p>
        </Link>
 
        <Link to="/investchatbot" className="card">
          <h2>🤖 Ask the AI</h2>
          <p>Chat with our smart investment assistant</p>
        </Link>
      </main>
    </div>
  );
}