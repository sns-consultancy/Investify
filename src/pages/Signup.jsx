import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    signup,
    signupWithFaceId,
    signupWithVoice,
    signupWithSSO,
    signupWithFingerprint,
  } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ username, password });
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Signup failed");
    }
  };

  const handleFaceId = async () => {
    try {
      await signupWithFaceId();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Face ID signup failed");
    }
  };

  const handleVoice = async () => {
    try {
      await signupWithVoice();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Voice signup failed");
    }
  };

  const handleSSO = async () => {
    try {
      await signupWithSSO();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("SSO signup failed");
    }
  };

  const handleFingerprint = async () => {
    try {
      await signupWithFingerprint();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Fingerprint signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Sign Up</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      <div style={{ marginTop: "1rem" }}>
        <button type="button" onClick={handleFaceId}>Face ID</button>
        <button type="button" onClick={handleVoice}>Voice</button>
        <button type="button" onClick={handleSSO}>Single Sign On</button>
        <button type="button" onClick={handleFingerprint}>Thumb</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}
