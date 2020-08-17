import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import EmployeeEditor from "./Container/EmployeeEditor/EmployeeEditor";
import EmployeeList from "./Container/EmployeeList/EmployeeList";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/edit/:id">
          <EmployeeEditor />
        </Route>
        <Route path="/">
          <EmployeeList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
