
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("User registered successfully");
    navigate("/vastu");
  };

  return (
    <div className="hero">
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" required /><br /><br />
        <input type="email" placeholder="Email" required /><br /><br />
        <input type="password" placeholder="Password" required /><br /><br />
        <button type="submit">Register</button>
      </form>
      <br />
      <button onClick={() => navigate("/vastu")}>Next: Vastu Page</button>
    </div>
  );
};

export default Register;
