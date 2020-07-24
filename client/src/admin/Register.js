import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [registerForm, updateRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [isUserRegistered, setUserRegistered] = useState(false);
  // useEffect(() => setUserRegistered(false), []);
  const isDisabled = () =>
    !(
      registerForm.name &&
      registerForm.email &&
      registerForm.password.length > 5 &&
      registerForm.repassword &&
      registerForm.password === registerForm.repassword
    )
      ? "disabled-link"
      : "";

  const onRegisterSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", registerForm);
      setUserRegistered(true);

      updateRegisterForm({
        name: "",
        email: "",
        password: "",
        repassword: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <section id="login">
        <div className="container login-container">
          <div className="row">
            <div className="col-md-6 centered">
              {isUserRegistered ? (
                <span className="ok">
                  User Successfully Registered! Contact admin to get Dashboard
                  access
                </span>
              ) : null}

              <div className="card">
                <div className="card-header">
                  <h4>Account Registration</h4>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={registerForm.name}
                          onChange={(evt) =>
                            updateRegisterForm({
                              ...registerForm,
                              name: evt.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          value={registerForm.email}
                          onChange={(evt) =>
                            updateRegisterForm({
                              ...registerForm,
                              email: evt.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          value={registerForm.password}
                          onChange={(evt) =>
                            updateRegisterForm({
                              ...registerForm,
                              password: evt.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="repassword">Re-enter Password</label>
                        <div className="row mx-1">
                          <input
                            type="password"
                            className="form-control col-11"
                            value={registerForm.repassword}
                            onChange={(evt) =>
                              updateRegisterForm({
                                ...registerForm,
                                repassword: evt.target.value,
                              })
                            }
                          />
                          {registerForm.repassword ? (
                            registerForm.password ===
                            registerForm.repassword ? (
                              <i className="ok far fa-check-circle col-1 pt-2"></i>
                            ) : (
                              <i className="error far fa-times-circle col-1 pt-2"></i>
                            )
                          ) : null}
                        </div>
                      </div>
                      {/* disabled-link */}
                      <button
                        // to={`/admin/dashboard`}
                        disabled={isDisabled()}
                        className={`btn btn-primary btn-block`}
                        onClick={onRegisterSubmit}
                      >
                        Register
                      </button>
                      <div className="register my-2">
                        existing User? <Link to={`/admin/login`}>Login</Link>
                      </div>
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
};

export default RegisterPage;
