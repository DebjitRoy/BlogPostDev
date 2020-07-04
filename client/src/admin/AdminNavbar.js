import React, { Fragment, useEffect, useState } from "react";

const AdminNavbar = () => (
  <header id="main-header" className="py-2 bg-primary text-white">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>
            <i className="fas fa-user"></i> Admin
          </h1>
        </div>
      </div>
    </div>
  </header>
);

export default AdminNavbar;
