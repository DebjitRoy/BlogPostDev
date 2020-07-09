import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => (
  <header id="main-header" className="py-2 bg-primary text-white">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Link to="/admin/dashboard" className="navbar-brand">
            <h1 className="text-dark">
              <i className="fas fa-user"></i> Admin
            </h1>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default AdminNavbar;
