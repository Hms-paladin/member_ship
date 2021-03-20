import React, { Component } from "react";
// import logo from "./logo.svg";
import RouterPage from "./router";
import "./App.css";
import 'antd/dist/antd.css'; 

import Dashboard from "./pages/dashboard";

const App = props => ({
  render() {
    return (
      <div className="App">
        {/* <Dashboard /> */}
        <main>{props.children}</main>
      </div>
    );
  }
});

export default App;
