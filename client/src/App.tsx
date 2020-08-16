import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Editor from "./Container/Editor/Editor";
import List from "./Container/List/List";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/edit/:id">
          <Editor />
        </Route>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
