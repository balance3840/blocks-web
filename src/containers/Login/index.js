import React, { useEffect, useState } from "react";
import connect from "../../provider/connect";
import { login, loginSuccess, loginFailure } from "../../actions/user.actions";
import { loginRequest } from "../../api/users.requests";

/**
 * a factory function that connects to the provider
 *
 * @param {object} state The state found in the provider's state
 * @returns object
 */
const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
  };
};

/**
 * a factory function of methods that disoatches actions to the provider
 *
 * @param {function} dispatch Main dispatch function that updates the provider
 */
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLogin: () => dispatch(login()),
    dispatchLoginSuccess: (user) => dispatch(loginSuccess(user)),
    dispatchLoginFailure: (error) => dispatch(loginFailure(error)),
  };
};

/**
 * A Higher Order Function that
 * connects the component to the provider
 *
 * @param {function} Component A React Component that will be connected to the provider
 */
const withConnect = (Component) =>
  connect(mapStateToProps, mapDispatchToProps)(Component);

export default withConnect(LoginContainer);

function LoginContainer({
  loading,
  error,
  dispatchLogin,
  dispatchLoginSuccess,
  dispatchLoginFailure,
}) {
  let [credentials, setCredentials] = useState({ email: "", password: "" });
  const showSubmitButton =
    credentials.email && credentials.password && !loading ? true : false;

  useEffect(() => {
    document.body.className = "bg-default";
    return () => {
      document.body.className = "";
    };
  });

  return (
    <div>
      <div className="main-content">
        <div className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
          <div className="container">
            <div className="header-body text-center mb-7">
              <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                  <h1 className="text-white">Inicia sesión en Blocks</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              x={0}
              y={0}
              viewBox="0 0 2560 100"
              preserveAspectRatio="none"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7">
              <div className="card bg-secondary border-0 mb-0">
                <div className="card-body px-lg-5 py-lg-5">
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group mb-3">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="ni ni-email-83" />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          type="email"
                          required={true}
                          value={credentials.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="ni ni-lock-circle-open" />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="Contraseña"
                          name="password"
                          type="password"
                          required={true}
                          value={credentials.password}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    {error && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        {error}
                      </div>
                    )}

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary my-4"
                        disabled={!showSubmitButton}
                      >
                        Iniciar sesión
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <a href="/forgot-password" className="text-light">
                    <small>¿Olvidaste tu contraseña?</small>
                  </a>
                </div>
                <div className="col-6 text-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-5 footer-auto-bottom" id="footer-main" />
    </div>
  );

  function onSubmit(e) {
    e.preventDefault();
    const data = { email: credentials.email, password: credentials.password };
    dispatchLogin();
    loginRequest(data)
      .then(function (data) {
        if (data && data.status === 200) {
          const { token, token_type } = data.data;
          const user = {
            ...data.data.user,
            token,
            token_type,
          };
          dispatchLoginSuccess(user);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.replace("/dashboard");
          return;
        }
        dispatchLoginFailure(data.message);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
}
