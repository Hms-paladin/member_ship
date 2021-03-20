import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ValidationLibrary from '../helpers/validation/validationfunction';
import logo from '../images/logo.png'
import CustomizedSnackbars from '../helpers/snackbar';
import apiurl from "../helpers/apiurl";
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailOutlined from "@material-ui/icons/EmailOutlined";

//validation function checks all type of validation

//end validation function checks all type of validation
const styles = theme =>({
  card: {
    minWidth: 275,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin:theme.spacing.unit,
  },
  newlable:{
    color:'#fff'
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },

  bootstrapFormLabel: {
    fontSize: 18,
  },
  
});

const APIURL=apiurl;
class Login extends Component {
  state = {
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    username:'',
    password:'',
    showPassword: false,
    validators:{email:null,password:null},
    validatorsMsg:{email:"",password:''},
    errorStatus:true,
    invalidcredentails:null,
    open:false,
    loginpop:true
  };
  componentWillMount(){
    var loggedIn=window.localStorage['membership.loggedin']=='true';
    if(loggedIn==true){
      console.log(this.props.history.push('/home/userMaster'));

    }else{
       // alert("");
     }
   }
   loginSubmit=() =>{
     var obj={email:this.state.email,password:this.state.password};
    //  window.localStorage['userobj']=JSON.stringify(obj);
    //  window.localStorage['membership.loggedin']=true;
    // // console.log(this.state);
    // // alert("")
    // this.props.history.push('/');
    fetch(APIURL+'adminLogin/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
    .then((responseJson) => {
            // if(responseJson.)
            if(responseJson.status==1){
              this.setState({invalidcredentails:true});
            }else{
              window.localStorage['membership.loggedin']=true;
              window.localStorage['userobj']=JSON.stringify(responseJson.data[0]);
              this.props.history.push('/');
              this.setState({invalidcredentails:null});
            }
            console.log(responseJson);

          })
  }
  textchange=(event,state,validatorsArray) =>{
    var textValue=event.target.value;
    this.setState({[state]:textValue});
    var validationReturn=ValidationLibrary.checkValidation(textValue,validatorsArray);
    console.log(validationReturn);
    if(validationReturn.msg==""){
      let validators = Object.assign({}, this.state.validators, {[state]: false });
      this.setState({validators});

    }else{
      let validators = Object.assign({}, this.state.validators, {[state]: true });
      let validatorsMsg = Object.assign({}, this.state.validatorsMsg, {[state]: validationReturn.msg });
      this.setState({validators});
      this.setState({validatorsMsg});
    }
    var self=this;
    setTimeout(function(){
      var checkvalidationPending=Object.values(self.state.validators).filter(validation=>validation==false).length;
      if(checkvalidationPending!=Object.values(self.state.validators).length){
        self.setState({errorStatus:true});
      }else{
        self.setState({errorStatus:false});
      }    },200);
    

    

  }
  closeSnackBar=() =>{
    this.setState({invalidcredentails:null});
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };


  forgotHandel = () =>{
    this.setState({open:true});
    this.setState({loginpop:false})

  }




  render() {
    
    return (
      <div className="App">
      {this.state.invalidcredentails&&
        <CustomizedSnackbars custommsg={"Invalid Credentials"} vertical="top" horizontal="right" message="Detail Deleted Successfully" variant="error" openState={true} snackbarCallback={() =>this.closeSnackBar()} />
      }
      <header className="App-header">
      <div className="firstContainer">
      <Card className="InnerCard">
      <img src={logo} className="App-logo"/>
      </Card>
      </div>
      {this.state.loginpop &&
        <div className="secondContainer">
        <Card className="InnerCard" >
        <CardHeader title="Login"></CardHeader>
        <CardContent> 
        <form style={{width: "66%",marginLeft:"15%"}}>
        <TextField
        error={this.state.validators.email}
        FormHelperTextProps={{ style: {display:'block',fontFamily: 'Arial', color: 'red'}}}
        onChange={(value) =>this.textchange(value,'email',[{name:'required'}])}
        inputRef={node => (this.inputNode = node)}
        helperText={this.state.validators.email?this.state.validatorsMsg.email:''}
        autoFocus={true}
        label="With outlined TextField"
        type="text"
        className={[styles.margin,"text-FieldBottom"]}
        InputLabelProps={{
          classes: {
            root: styles.cssLabel,
            focused: styles.cssFocused,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
            style={{color:"#0d69aa"}}  
            aria-label="Toggle password visibility"  
            >
            <AccountCircle/> 
            </IconButton>
            </InputAdornment>
            )
        }}
        required
        label="UserName/Email"
        fullWidth={true}
        variant="outlined"
        id="custom-css-outlined-input"
        />

        <TextField
        onChange={(value) =>this.textchange(value,'password',[{name:'required'}])}
        value={this.state.password}
        error={this.state.validators.password}
        type={this.state.showPassword ? 'text' : 'password'}
        className={styles.margin}
        InputLabelProps={{
          classes: {
            root: styles.cssLabel,
            focused: styles.cssFocused,
          },
        }}
        helperText={this.state.validators.password?this.state.validatorsMsg.password:''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
            style={{color:"#0d69aa"}}  
            aria-label="Toggle password visibility"
            onClick={this.handleClickShowPassword}
            >
            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            </InputAdornment>
            ),
        }}
        label="Password"
        fullWidth={true}
        variant="outlined"
        id="custom-css-outlined-input"
        />
        <Button style={{backgroundColor:this.state.errorStatus==false?'#0d69aa':''}} variant="contained" color="secondary" disabled={this.state.errorStatus==true} onClick={() =>this.loginSubmit()} className={[styles.margin,"text-FieldTop"]}>Sign In</Button>
        {/*<div style={{color:"#0d69aa",fontSize: "13px",marginTop: "15px"}} onClick={this.forgotHandel}>Forgot Password ? </div>*/}
        </form>
        </CardContent>
        </Card>
        </div>
      }  


      {this.state.open &&
        <div className="secondContainer">
        <Card className="InnerCard">
        <CardHeader title="Forgot Password"></CardHeader>
        <CardContent> 
        <form style={{width: "66%",marginLeft:"15%"}}>
        <TextField
        error={this.state.validators.email}
        FormHelperTextProps={{ style: {display:'block',fontFamily: 'Arial', color: 'red'}}}
        onChange={(value) =>this.textchange(value,'email',[{name:'required'}])}
        inputRef={node => (this.inputNode = node)}
        helperText={this.state.validators.email?this.state.validatorsMsg.email:''}
        autoFocus={true}
        label="With outlined TextField"
        type="text"
        className={[styles.margin,"text-FieldBottom"]}
        InputLabelProps={{
          classes: {
            root: styles.cssLabel,
            focused: styles.cssFocused,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
            style={{color:"#0d69aa"}}  
            aria-label="Toggle password visibility"  
            >
            <AccountCircle/> 
            </IconButton>
            </InputAdornment>
            )
        }}
        required
        label="UserName/Email"
        fullWidth={true}
        variant="outlined"
        id="custom-css-outlined-input"
        />

        <TextField
        error={this.state.validators.email}
        FormHelperTextProps={{ style: {display:'block',fontFamily: 'Arial', color: 'red'}}}
        onChange={(value) =>this.textchange(value,'email',[{name:'required'}])}
        inputRef={node => (this.inputNode = node)}
        helperText={this.state.validators.email?this.state.validatorsMsg.email:''}
        autoFocus={true}
        label="With outlined TextField"
        type="text"
        className={[styles.margin,"text-FieldBottom"]}
        InputLabelProps={{
          classes: {
            root: styles.cssLabel,
            focused: styles.cssFocused,
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
            style={{color:"#0d69aa"}}  
            aria-label="Toggle password visibility"  
            >
            <EmailOutlined/>
            </IconButton>
            </InputAdornment>
            )
        }}
        required
        label="UserName/Email"
        fullWidth={true}
        variant="outlined"
        id="custom-css-outlined-input"
        />

        <Button style={{backgroundColor:this.state.errorStatus==false?'#0d69aa':''}} variant="contained" color="secondary" disabled={this.state.errorStatus==true} onClick={() =>this.loginSubmit()} className={[styles.margin,"text-FieldTop"]}>Submit</Button>
        </form>
        </CardContent>
        </Card>
        </div>
      }  
      </header>
      </div>
      );
}

}

export default Login;
