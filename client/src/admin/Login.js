import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";

const LoginPage = () => {
  const [loginForm, updateLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isUserLogin, setUserLogin] = useState(false);
  const [isLoginFailed, setLoginFailed] = useState(false);
  const [token, setToken] = useState("");
  const history = useHistory();

  const onSubmitLogin = async (evt) => {
    evt.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", loginForm);
      if (res && res.data.token) {
        setLoginFailed(false);
        setUserLogin(true);
        setToken(res.data.token);
        // history.push("/admin/dashboard")
      } else {
        setLoginFailed(true);
        setUserLogin(false);
      }
      updateLoginForm({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err.message);
      setLoginFailed(true);
      updateLoginForm({
        email: "",
        password: "",
      });
      setUserLogin(false);
    }
  };
  useEffect(() => sessionStorage.setItem("token", ""), []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
      history.push("/admin/dashboard");
    }
  }, [token]);
  return (
    <Fragment>
      <AuthContext.Provider value={{ token }}>
        <section id="login">
          <div className="container login-container">
            <div className="row">
              <div className="col-md-6 centered">
                <div className="card">
                  <div className="card-header">
                    <h4>Account Login</h4>
                    {isLoginFailed ? (
                      <span className="error">
                        Login Failed! Please try again
                      </span>
                    ) : null}
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            value={loginForm.email}
                            onChange={(evt) =>
                              updateLoginForm({
                                ...loginForm,
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
                            value={loginForm.password}
                            onChange={(evt) =>
                              updateLoginForm({
                                ...loginForm,
                                password: evt.target.value,
                              })
                            }
                          />
                        </div>
                        <button
                          // to={`/admin/dashboard`}
                          className="btn btn-primary btn-block"
                          disabled={!loginForm.email || !loginForm.password}
                          onClick={onSubmitLogin}
                        >
                          LOGIN
                        </button>
                        <div className="register my-2">
                          New User? <Link to={`/admin/register`}>Register</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default LoginPage;
