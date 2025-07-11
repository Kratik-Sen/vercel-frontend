import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./Navbar.css";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
        <div className={`nav-links ${isOpen ? "show" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/services">About</Link>
          <Link to="/admin">Add Book</Link>
          {/* <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link> */}
          {/* <Link to="/login">Login</Link> */}
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
