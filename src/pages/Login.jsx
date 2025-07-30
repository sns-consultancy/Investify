import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    login,
    loginWithFaceId,
    loginWithVoice,
    loginWithSSO,
    loginWithFingerprint,
  } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }

      {error && <p>{error}</p>}
    </form>
  );
}
