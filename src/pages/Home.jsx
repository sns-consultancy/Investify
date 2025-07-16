
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <img src="logo.png" alt="7 Star Interior Logo" className="logo" />
      <h1 className="title">Welcome to 7 Star Interior App</h1>
      <p className="tagline">Design with Voice. Visualize with AI. Approve with Ease.</p>
      <button onClick={() => navigate('/login')}>Login</button>
      <button
  style={{
    background: "#555",
    color: "white",
    padding: "0.6rem 1.2rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "1rem",
    marginTop: "0.5rem"
  }}
  onClick={() => navigate("/signup")}
>
  Sign Up
</button>
    </div>
  );
};

export default Home;
