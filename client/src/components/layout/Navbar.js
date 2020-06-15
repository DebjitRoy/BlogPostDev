import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-road"></i>
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                প্রধান পাতা
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/travel" className="nav-link">
                ভ্রমণিকা
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className="nav-link">
                মনের আনন্দ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/miscl" className="nav-link">
                টুকিটাকি
              </Link>
            </li>
            <li className="nav-item">
              <a href="contact.html" className="nav-link">
                যোগাযোগ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
