import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/chat");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Fake Login</button>
    </div>
  );
}