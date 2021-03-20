import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Collapse,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  ListItemIcon,
  Button
} from "@material-ui/core";
// import { Switch, Route } from "react-router";
import { BrowserRouter,Redirect,NavLink,Route,Switch } from "react-router-dom";

import Login from "../pages/login";
import UserMaster from "../pages/userMaster";
import Advocasy from "../pages/Advocasy";
import TagsMaster from "../pages/TagsMaster";
import CategoryMaster from "../pages/CategoryMaster";
import SosMaster from "../pages/SosMaster";
import Careers from "../pages/Careers";
import Infotablepage from "../pages/Infotablepage";
import StateMaster from "../pages/stateMaster";
import SpecialtyMaster from "../pages/specialtyMaster";
import MemberTypeMaster from "../pages/memberTypeMaster";
import Gallery from "../pages/gallery";
import Member from "../pages/member";
import CityMaster from "../pages/cityMaster";
import News from "../pages/news";
import Event from "../pages/event";
import SurveyTrn from "../pages/survey";
import Error404 from "../components/Error";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SendIcon from "@material-ui/icons/Send";  
import StarBorder from "@material-ui/icons/StarBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Authentication from "./home";
import logo from "../images/logo.png";
import Training from "./Training";

const drawerWidth = 240;

const hidestyle = {
  display: "none"
};

const menus = [


{
  id: 4,
  master: "Master",
  path: "/home",
  icon: <SendIcon />,

  nested: [
  {
    id: 2,
    master: "User",
    path: "/home/userMaster/",
    icon: <StarBorder />,
    nested: [],
  },
  {
    id: 3,
    master: "State",
    path: "/home/stateMaster/",
    icon: <StarBorder />,
    nested: [],
  },
  {
    id: 20,
    master: "City",
    path: "/home/cityMaster/",
    icon: <StarBorder />,
    nested: [],
  },
  {
    id: 5,
    master: "Member Type ",
    path: "/home/memberTypeMaster/",
    icon: <StarBorder />,
    nested: []
  },
  {
    id: 6,
    master: "Speciality ",
    path: "/home/SpecialityMaster/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  {
    id: 7,
    master: "Advocacy",
    path: "/home/Advocacy/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  // {
  //   id: 8,
  //   master: "Careers",
  //   path: "/home/Careers/",
  //   icon: <StarBorder />,
  //   nested: [],
  //   menuStyles: { backgroundColor: "blue" }
  // },
  {
    id: 9,
    master: "Information Tags",
    path: "/home/TagsMaster/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },{
    id: 10,
    master: "Information Category",
    path: "/home/CategoryMaster/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  {
    id: 11,
    master: "Information Table",
    path: "/home/Infotablepage/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  {
    id: 11,
    master: "SOS",
    path: "/home/Sos/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  
  ]},
  {
  id: 50,
  master: "Transaction",
  path: "/home",
  icon: <SendIcon />,

  nested: [
  {
    id: 6,
    master: "Member",
    path: "/home/member/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  {
    id: 6,
    master: "Gallery",
    path: "/home/gallery/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  {
    id: 6,
    master: "Event",
    path: "/home/event/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  {
    id: 7,
    master: "News",
    path: "/home/news/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
   {
    id: 7,
    master: "Survey",
    path: "/home/Survey/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  {
    id: 7,
    master: "Training",
    path: "/home/Training/",
    icon: <StarBorder />,
    nested: [],
    menuStyles: { backgroundColor: "blue" }
  },
  ]
}
];
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  nested: {
    paddingLeft: 12
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 30px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },

  drawerOpen: {
    width: drawerWidth,
    // transition: theme.transitions.create("width", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: "0.6s"
      
    // })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  contentShift: {
    
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class Dashboard extends React.Component {
  state = {
    open: true,
    sidemenu: menus,
    nestedmenu: false,
    windowHeight: "",
    windowWidth: "",
    hoverEffect: false,
    opened:true
  };

  hideshow = () => {
    this.setState({ show: true });
  };

  hoverOn = () => {
    this.setState({ open: true });

  };
  hoverOff = () => {
    this.setState({ open: false });
  };

  handleResize = () => {
      // console.log(window.innerWidth);
      window.innerWidth <= 768
      ? this.setState({ open: false })
      : this.setState({ open: true });
    };
    componentWillMount(){
     var loggedIn=window.localStorage['membership.loggedin']=='true';
     this.props.history.listen((location, action) => {
       // var loggedIn=window.localStorage['membership.loggedin']=='true';
       if(loggedIn==true){
        window.localStorage['currentPath']=`${location.pathname}${location.search}${location.hash}`;
        console.log("return")
      }else{
       // this.props.history.push('/login');
        // window.localStorage.clear();
       // return;
     }
   })
      // console.log("page reloading...");
      var currentPath=window.localStorage.currentPath;
      // console.log(currentPath);
      if(currentPath){
        this.props.history.push(currentPath);
      }else{
      }
      if(loggedIn==true){

      }else{
       // alert("");
       this.props.history.push('/login');
     }
   }
   componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    if( this.props.history.location.hasOwnProperty('key')==false){
      this.props.history.push('/Error404');
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  nestedSideBar = item => {
    if (item.nested.length > 0) {
      this.setState({ open: true });
      var self=this;
      setTimeout(() =>{
        self.setState({opened:true});
      },500)
    }
  };

  nestedcheck = item => {
      // console.log(this.props.history);
      

    // this.setState({ [item.master]: false });
    const { classes } = this.props;
    if (item.nested.length == 0) {
      return (
        <NavLink
        to={item.path}
        style={{
          textDecoration: "none",
          color: "black",
          background: "white"
        }}
        >
        <div style={{ paddingLeft: this.state.open==true?"8px":'0px', paddingRight: this.state.open==true?"8px":'0px' }}>
        <ListItem
        style={{
          paddingTop: "0px",
          paddingBottom: "3px"
                // paddingLeft: this.state.open == false ? "17px" : ""
              }}
              >
              <div
              style={{
                backgroundColor:
                this.state.open == false ? "rgba(200, 200, 200, 0.2)" : "",
                margin: "0px -19px",
                padding: "10px",
                width: "250px",
                borderRadius: "9px",
                textAlign: "center",
                textAlign: this.state.open == false ? "center" : "",
                display:this.state.open == false?"flex":'',
                justifyContent:this.state.open == false?"center":'',
                  // backgroundColor: "rgba(200, 200, 200, 0.2)"
                }}
                className={classes}
                >
                <ListItemIcon
                style={{
                  justifyContent: "center",
                  marginRight: "0px",
                  color: "black",
                  float: "left",
                  display:this.state.open == false?"flex":'',
                  justifyContent:this.state.open == false?"center":'',
                }}
                >
                {item.icon}
                {this.state.opened == true && (
                  <ListItemText key={item.id}>
                  <div style={{ color: "black" }}>{item.master}</div>
                  </ListItemText>
                  )}
                </ListItemIcon>
                </div>
                </ListItem>
                </div>
                </NavLink>
                );
    }
    if (item.nested.length > 0) {
      // console.log(item.nested);

      return (
        <div
        style={{
          paddingLeft:this.state.open==true?"8px":'0px',
          paddingRight: this.state.open==true?"8px":'0px',

        }}
        >
      {/* <a style={{ backgroundColor: "yellow" }}> */}
      <ListItem
      onClick={() => this.handleClick(item.id)}
      style={{
        paddingTop: "0px",
        paddingBottom: "3px"

              // paddingLeft: this.state.open == false ? "17px" : ""/
            }}
            >
          {/* <ListItem> */}
          <div
          style={{
            backgroundColor:
            this.state.open == false ? "rgba(200, 200, 200, 0.2)" : "",
            margin: "0px -19px",
            padding: "10px",
            width: "250px",
            borderRadius: "9px",
            textAlign: this.state.open == false ? "center" : '',
            display:this.state.open == false?"flex":'',
            justifyContent:this.state.open == false?"center":'',
                // backgroundColor: "rgba(200, 200, 200, 0.2)"
              }}
              >
              <ListItemIcon
              onClick={() => this.nestedSideBar(item)}
              style={{
                marginRight: "0px",
                color: "black",
                float: "left",
                'display':this.state.open == false?"flex":'',
                justifyContent:this.state.open == false?"center":'',
              }}
              >
              {item.icon}
              </ListItemIcon>
              {this.state.opened == true && (
                <ListItemText key={item.id}>
                <div
                style={{
                  color: "black",
                  float: "left",
                  paddingLeft: "16px"
                }}
                >
                {" "}
                {item.master}
                </div>{" "}
                </ListItemText>
                )}

              {this.state.open == true ? (
                this.state[item.id] ? (
                  <ExpandLess
                  style={{
                   color: "black",
                   position: 'absolute',
                   right: '12px',

                 }}
                 />
                 ) : (
                 <ExpandMore
                 style={{
                  color: "black",
                  position: 'absolute',
                  right: '12px',
                }}
                />
                )
                 ) : (
                 ""
                 )}
                 </div>
                 </ListItem>
               {/* </a> */}
               <Collapse in={this.state[item.id]} timeout="auto" unmountOnExit>
               {item.nested.length > 0 &&
                item.nested.map((subitem,key) => {
                  return (
                    <div key={key}
                    className={this.state.open == false ? "subComponent" : ""}
                    // style={{
                      //   paddingLeft: this.state.open == false ? "17px" : "",
                      //   color:""
                      // }}
                      >
                      {this.nestedcheck(subitem)}
                      </div>
                      );
                })}
                </Collapse>
                </div>
                );
    }
    return null;
  };
  logout=()=>{
    var confirm=window.confirm('Are you sure want to logout');
    if(confirm){    
      window.localStorage.clear();
      this.props.history.go('/');
    }
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
    var self=this;
    setTimeout(() =>{
      self.setState({opened:true});
    },500)
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    this.setState({ opened: false });
  };

  handleClick = data => {
    this.setState(state => ({ [data]: !state[data] }));
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open
      })}
      style={{ background: "white" }}
      >
      <Toolbar
      disableGutters={!open}
      style={{ backgroundColor: "#238fbd"}}
      >
      <IconButton
      color="inherit"
      aria-label="Open drawer"
      onClick={this.handleDrawerOpen}
      className={classNames(classes.menuButton, open && classes.hide)}
      >
      <MenuIcon style={{ color: "black" }} />
      </IconButton>
      <Typography variant="h6" noWrap style={{ color: "white",flexGrow:1,textAlign:'left'}}>
      Membership
      </Typography>
      <Button color="inherit" onClick={() =>this.logout()}>Logout</Button>
      </Toolbar>
      </AppBar>
      <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      // onMouseOver={this.hoverOn}
      // onMouseLeave={this.hoverOff}
      classes={{
        paper: classes.drawerPaper
      }}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
      >
      <div
      style={{
        background: "#f5f5f5",
        backgroundSize: "cover",
        backgroundPosition: "cover cover",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      >
      <div
      style={{
        position: "relative",
        textAlign: "center",
        fontSize: 20,
        float: "left",
        left: "53px",
        fontWeight: "20px",
        color: "black",
        top:"-1px"
      }}
      >
        
      <img src={logo} style={{height:"65px"}}className="dashbordLogo" />
      </div>
      <div className={classes.drawerHeader}>
      <IconButton onClick={this.handleDrawerClose}>
      {theme.direction === "ltr" ? (
        <ChevronLeftIcon style={{ color: "black" }} />
        ) : (
        <ChevronRightIcon style={{ color: "black" }} />
        )}
        </IconButton>
        </div>
      
     
        
        <Divider
        style={{
          background: "gray",
          width: this.state.open == true ? "23vw" : "0vw",
          position: "relative",
          left: 12,
        }}
        />
      {/* {sideList} */}
      <List>
      {this.state.sidemenu.map((items, i) => {
        return (
          <div key={i}>
        {/* <ListItemIcon>{items.icon}</ListItemIcon> */}
        {this.nestedcheck(items)}
        </div>
        );
      })}
      </List>
      </div>
      </Drawer>
      <main
      style={{width: 1000}}
      className={classNames(classes.content, {
        [classes.contentShift]: open
      })}
      >
      <div className={classes.drawerHeader} />
      <div style={{height:20}}>
        
      <Route  path="/home/userMaster" component={UserMaster} />
      <Route  path="/home/Advocacy" component={Advocasy} />
      <Route  path="/home/TagsMaster" component={TagsMaster} />
      <Route  path="/home/Sos" component={SosMaster} />
      <Route  path="/home/CategoryMaster" component={CategoryMaster} />
      <Route  path="/home/Careers" component={Careers} />
      <Route  path="/home/Infotablepage" component={Infotablepage} />
      <Route  path="/home/stateMaster/" component={StateMaster} />
      <Route  path="/home/memberTypeMaster/" component={MemberTypeMaster} />
      <Route  path="/home/member/" component={Member} />
      <Route path="/home/SpecialityMaster/" component={SpecialtyMaster} />
      <Route path="/home/gallery/" component={Gallery} />
      <Route path="/home/event/" component={Event} />
      <Route path="/home/survey/" component={SurveyTrn} />
      <Route path="/home/news/" component={News} />
      <Route path="/home/cityMaster/" component={CityMaster} />
      <Route path="/home/training/" component={Training} />
      <Route path="/Error404/" component ={Error404} />
      </div>
      </main>
      </div>
      );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Dashboard);
