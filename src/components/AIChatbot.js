import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>You must login to chat</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Welcome {currentUser.name}</h2>
      <p>This is the Investify chatbot.</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}