import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import EmployeeEditor from "./container/EmployeeEditor/EmployeeEditor";
import List from "./container/List/List";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/edit/:id">
          <EmployeeEditor />
        </Route>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
