import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User registered: ${name}`);
    navigate("/vastu");
  };
  return (
    <div className="hero">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px", width: "100%" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <button type="submit" className="primary-button">Register</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        Already registered?{" "}
        <button
          className="link-button"
          onClick={() => navigate("/login")}
        >
          Login here
        </button>
      </p>
      <button
        className="secondary-button"
        onClick={() => navigate("/vastu")}
        style={{ marginTop: "1rem" }}
      >
        Next: Vastu Page
      </button>
    </div>
  );
}