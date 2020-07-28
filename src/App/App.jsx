import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Header from '../components/Header/Header';
import Settings from '../pages/Settings/Settings';
import Feed from '../pages/Feed/Feed';

export default () => {
  return (
    <Router>
      <Header></Header>
      <div className="rdr">
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Feed />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
