import React from "react";

import LoginContainer from "./Login";
import DashboardContainer from "./Dashboard";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

/**
 * Renders the private routes.
 *
 * @return {ReactComponent}
 */
function renderPrivateRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DashboardContainer} />
        <Route path="/dashboard" component={DashboardContainer} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

/**
 * Renders the guest routes.
 *
 * @return {ReactComponent}
 */
function renderGuestRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route path="/login" component={LoginContainer} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default function Root() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    user && user.token && renderPrivateRoutes() || renderGuestRoutes()
  )
}
