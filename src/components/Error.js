import React from "react";
import Button from '@material-ui/core/Button';
import { BrowserRouter,Redirect,NavLink } from "react-router-dom";

const Error404 = props => ({
  render() {
    return (
      <div className="Error404">
        <h1>NOT FOUND (404)</h1>
        <NavLink to="/" style={{'text-decoration':'none'}}>
          <Button variant="contained" color="secondary">
        Go Back To Home
      </Button>
      </NavLink>
      </div>
    );
  }
});

export default Error404;
