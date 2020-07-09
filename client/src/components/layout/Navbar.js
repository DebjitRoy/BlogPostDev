import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {/* <i className="fas fa-road"></i> */}
          <img src="/uploads/window.png"></img>
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
              <NavLink exact={true} to="/" className="nav-link">
                প্রধান পাতা
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/travel" className="nav-link">
                ভ্রমণিকা
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/books" className="nav-link">
                মনের আনন্দ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/miscl" className="nav-link">
                টুকিটাকি
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/miscl" className="nav-link">
                যোগাযোগ
              </NavLink>
              {/* <a href="contact.html" className="nav-link">
                যোগাযোগ
              </a> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
