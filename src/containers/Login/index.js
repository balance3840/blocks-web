import React from "react";
import connect from "../../provider/connect";
import { login, loginSuccess, loginFailure } from "../../actions/user.actions";
import { BASE_URL } from "../../utils/api";
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
  return (
    <div>
      Loading: {loading.toString()}, Error: {error.toString()}
      <h1>Login container</h1>
      <button onClick={() => onSubmit("ramiro.estrellac@gmail.com", "123456")}>
        Login
      </button>
    </div>
  );

  function onSubmit(email, password) {
    const data = { email, password };
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
          return;
        }
        dispatchLoginFailure(data.message);
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}
