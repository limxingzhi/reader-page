import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Settings from "../pages/Settings/Settings";
import Feed from "../pages/Feed/Feed";
import './App.css';

export default () => {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/">
          <Feed />
        </Route>
      </Switch>
    </Router>
  );
}
