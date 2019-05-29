import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "popper.js";

import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/" component={Navigation} />
  </Switch>
);

export default App;
