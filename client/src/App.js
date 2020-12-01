import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route signin="/signin" component={SigninPage} />
      </Switch>
    </Router>
  );
};

export default App;
