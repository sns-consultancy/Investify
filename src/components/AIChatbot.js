import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InvestChatbot from "../pages/InvestChatbot"; // fix: path to InvestChatbot (should be in pages, not import from pages in components!)

export default function Chatbot() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>You must login to chat</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return <InvestChatbot />;
}
