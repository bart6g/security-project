import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import ExpiredPage from "./pages/ExpiredPage";
import Activate from "./pages/ActivatePage";
import LoginPage from "./pages/LoginPage";

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
        <Route path="/register" component={SigninPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/email-activate" component={Activate} />
        <Route path="/inactive-token" component={ExpiredPage} />
      </Switch>
    </Router>
  );
};

export default App;
