import "./App.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import "popper.js";

import React from "react";
import { Route } from "react-router-dom";

/** components */
import Navigation from "./components/nav/Navigation";
import Editor from "./components/editor/Editor";
import Preview from "./components/preview/Preview";

const App = () => (
  <div>
    <Route path="/" component={Navigation} />
    <Route exact path="/editor" component={Editor} />
    <Route exact path="/preview" component={Preview} />
  </div>
);

export default App;
