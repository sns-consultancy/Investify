
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <Link to="/home">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/terms">Terms</Link>
    <Link to="/contact">Contact</Link>
  </nav>
);

export default Navbar;
