import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <Link to="/home" style={{ marginRight: "1rem" }}>Home</Link>
      <Link to="/add-investment" style={{ marginRight: "1rem" }}>Add Investment</Link>
      <Link to="/view-portfolio" style={{ marginRight: "1rem" }}>Portfolio</Link>
      <Link to="/investment-history" style={{ marginRight: "1rem" }}>History</Link>
    </nav>
  );
}