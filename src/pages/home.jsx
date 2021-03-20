import React, { Component } from "react";
// import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { bounce, tada } from "react-animations";

import { Card, CardContent, Typography } from "@material-ui/core";

import Login from "./login";
import Dashboard from "./dashboard";

const menus = [
  { id: 1, master: "departmentmaster" },
  {
    id: 2,
    master: "homemaster",
    nested: [
      {
        master: "user master"
      }
    ]
  }
];

const table = [
  { header: "desert", val: 1 },
  { header: "starter", val: 2 },
  { header: "end", val: 3 },
  { header: "nothing", val: 4 }
];

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = { bar: menus, tittle: table };
    // this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    // console.log();
    var loggedIn=window.localStorage['membership.loggedin']=='true';
    // console.log(loggedIn);
    if(loggedIn==true){
      this.props.history.push('/home/department');
    }else{

      this.props.history.push('/login');
    }
  }

  // componentDidMount() {
  //   for (let i in menus) {
  //     this.setState({ [menus[i].master]: "" });
  //   }
  // }

  // componentWillMount() {
  //   var list = this.state.bar.map((listval, index, arr) => {
  //     return {
  //       listval
  //     };
  //   });
  //   console.log(list);
  // }

  // handleClick() {
  //   var values = menus;
  //   values.map((name,key)=> this.setState({
  //     name: this.props.children
  //   })
  // }

  render() {
    // console.log(this.state);
    return (
      <div style={{ animation: tada }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Home Dash Board
            </Typography>
          </CardContent>
          {/* <p>
            name:
            {this.state.bar.map(item => {
              return <p> {item.master} </p>;
            })}
          </p> */}
          HOME MASTER
        </Card>
        {/* <button onClick={this.handleClick}>click</button> */}
      </div>
    );
  }
}

export default Authentication;
