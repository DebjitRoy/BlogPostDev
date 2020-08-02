import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [searchText, changeSearch] = useState("");
  const [isNavExpanded, changeExpanded] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-main">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => changeExpanded(!isNavExpanded)}
        >
          <img src="/uploads/window.png"></img>
        </Link>
        {!isNavExpanded ? (
          <div className="search-box">
            <input
              type="text"
              className="search-txt"
              placeholder="Search in English"
              value={searchText}
              onChange={(evt) => changeSearch(evt.target.value)}
            />

            <a className="search-btn" onClick={() => changeSearch("")}>
              {searchText.length ? (
                <Link
                  to={`/search/${searchText.toLowerCase().replace(" ", "%20")}`}
                >
                  <i className="fas fa-search"></i>
                </Link>
              ) : (
                <i className="fas fa-search"></i>
              )}
            </a>
          </div>
        ) : null}

        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          onClick={() => changeExpanded(!isNavExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse collpase" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              onClick={() => changeExpanded(!isNavExpanded)}
            >
              <NavLink exact={true} to="/" className="nav-link">
                প্রধান পাতা
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              onClick={() => changeExpanded(!isNavExpanded)}
            >
              <NavLink to="/travel" className="nav-link">
                ভ্রমণিকা
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              onClick={() => changeExpanded(!isNavExpanded)}
            >
              <NavLink to="/books" className="nav-link">
                মনের আনন্দ
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              onClick={() => changeExpanded(!isNavExpanded)}
            >
              <NavLink to="/miscl" className="nav-link">
                টুকিটাকি
              </NavLink>
            </li>
            <li
              className="nav-item"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              onClick={() => changeExpanded(!isNavExpanded)}
            >
              <NavLink to="/contactus" className="nav-link">
                পরিচিতি
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
