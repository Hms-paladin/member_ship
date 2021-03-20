import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import { Switch, Route ,Router} from "react-router";
import { BrowserRouter as Router,Redirect,HashRouter, Route,Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import UserMaster from "./pages/userMaster";
import StateMaster from "./pages/stateMaster";
import SpecialtyMaster from "./pages/specialtyMaster";
import MemberTypeMaster from "./pages/memberTypeMaster";
import Member from "./pages/member";
import CityMaster from "./pages/cityMaster";
import Authentication from "./pages/home";
import Error404 from "./components/Error";

console.log(process.env)

function disablekeys(){
   document.onkeydown = function(e) {
if(e.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
}
}
if(process.env.NODE_ENV!='development'){
disablekeys();
}else{
  console.log('development');
}
// import Authentication from "./pages/home";
const Root = () => (
  <App>
    <Router basename="/ahpi/#/">
      <Switch>
        <Route exact path={"/"} component={Authentication} />
        <Route exact path={"/login"}component={Login} />
        <Route  path={"/home/"} component={Dashboard} />
        <Route   component={Error404} /> 
        </Switch>
    </Router>
  </App>
);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
