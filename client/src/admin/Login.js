import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => (
  <Fragment>
    <section id="login">
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header">
                <h4>Account Login</h4>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" />
                    </div>
                    <Link
                      to={`/admin/dashboard`}
                      className="btn btn-primary btn-block"
                    >
                      LOGIN
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default LoginPage;
