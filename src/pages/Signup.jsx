import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    login();
    navigate("/chat");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Signup Page</h2>
      <button onClick={handleSignup}>Fake Sign Up</button>
    </div>
  );
}