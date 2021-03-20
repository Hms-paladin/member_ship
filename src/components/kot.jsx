 import React, { Component } from "react";
 import Button from '@material-ui/core/Button';
 import TextField from '@material-ui/core/TextField';
 import Dialog from '@material-ui/core/Dialog';
 import DialogActions from '@material-ui/core/DialogActions';
 import DialogContent from '@material-ui/core/DialogContent';
 import DialogContentText from '@material-ui/core/DialogContentText';
 import DialogTitle from '@material-ui/core/DialogTitle';
 import PropTypes from 'prop-types';
 import { withStyles } from '@material-ui/core/styles';
 import Paper from '@material-ui/core/Paper';
 import Grid from '@material-ui/core/Grid';
 import Card from "@material-ui/core/Card";
 import FormHelperText from '@material-ui/core/FormHelperText';
 import CardActions from "@material-ui/core/CardActions";
 import CardContent from "@material-ui/core/CardContent";
 import Table from "@material-ui/core/Table";
 import TableBody from "@material-ui/core/TableBody";
 import TableCell from "@material-ui/core/TableCell";
 import TableHead from "@material-ui/core/TableHead";
 import TableRow from "@material-ui/core/TableRow";
 import Input from '@material-ui/core/Input';
 import OutlinedInput from '@material-ui/core/OutlinedInput';
 import FilledInput from '@material-ui/core/FilledInput';
 import InputLabel from '@material-ui/core/InputLabel';
 import FormControl from '@material-ui/core/FormControl';
 import Select from '@material-ui/core/Select';
 import MenuItem from '@material-ui/core/MenuItem';
 import apiurl from "../helpers/apiurl";
 import Fab from '@material-ui/core/Fab';
 import AddIcon from '@material-ui/icons/Add';
 import EnhancedItemTable from "../components/commanTable";
 import Tabs from '@material-ui/core/Tabs';
 import Tab from '@material-ui/core/Tab';
 import Typography from '@material-ui/core/Typography';
 import ValidationLibrary from "../helpers/validation/validationfunction";

//generate a dynamic dropDown schema.................


var mydata={fields:[{
    "name":'servicetype',  // state Name
    "foreign_tbl":"mas_service_type",
    "foreign_fields":[{name:'service_type_id',alias:'value','alias1':'service_type_id'},{name:'service_name',alias:'value1','alias1':'service_name'}],
},
{
    "name":'employee',   // state Name
    "foreign_tbl":"mas_employee",
          "foreign_fields":[{name:'emp_id',alias:'value','alias1':'emp_id'},{name:'emp_code',alias:'value1','alias1':'emp_code'},{name:'fname',alias:'value2','alias1':'fname'}],
},{
    "name":'table',   // state Name
    "foreign_tbl":"mas_table",
          "foreign_fields":[{name:'table_id',alias:'value','alias1':'table_id'},{name:'table_code',alias:'value1','alias1':'table_code'},{name:'table_name',alias:'value2','alias1':'table_name'}],
},{
    "name":'outlet',   // state Name
    "foreign_tbl":"mas_outlet",
          "foreign_fields":[{name:'outlet_id',alias:'value','alias1':'outlet_id'},{name:'outlet_name',alias:'value1','alias1':'outlet_name'}],
},{
    "name":'customer',   // state Name
    "foreign_tbl":"mas_customer",
          "foreign_fields":[{name:'cust_id',alias:'value','alias1':'cust_id'},{name:'fname',alias:'value1','alias1':'fname'}],
}]
};
const APIURL=apiurl;

//******************************
const styles = theme => ({
  root: {
   flexGrow: 1,
},
paper: {
   padding: theme.spacing.unit * 2,
   textAlign: 'center',
   color: theme.palette.text.secondary,
},
formControl: {
   margin: theme.spacing.unit,
   minWidth: 120,
},


});





var keys={service_type_id:'',emp_id:'',table_id:'',outlet_id:'','cust_id':'',is_nc_kot:'',isCancel:''}
class KotMain extends Component {
  constructor(props) {
   // console.log("props",props)
   super(props);
   
   this.state = {
    title:"Item",
    value:0,
    servicetype:[],
    table:[],
    outlet:[],
    employee:[],
    customer:[],
    validations:{'service_type_id':{validations:[ {name:"required",params:''}],msg:'',status:''},'emp_id':{validations:[ {name:"required",params:''}],msg:'',status:''},'table_id':{validations:[ {name:"required",params:''}],msg:'',status:''},'outlet_id':{validations:[ {name:"required",params:''}],msg:'',status:''},'cust_id':{validations:[],msg:'',status:false},'is_nc_kot':{validations:[],msg:'',status:false},'isCancel':{validations:[],msg:'',status:false}},service_type_id:'',emp_id:'',table_id:'',outlet_id:'','cust_id':'',is_nc_kot:'',isCancel:'',
    errorStatus:true,
    itemEditData:props.itemEditData,
    

};

}
componentWillMount=() =>{
  if(this.props.itemEditData){
    var itemkeys=Object.keys(this.props.itemEditData);
    var itemvalues=Object.values(this.props.itemEditData);
    for(var i in itemkeys){
      // if(itemkeys[i]!='itemArrays'){
      if(this.state.hasOwnProperty(itemkeys[i])==true){
      // console.log(itemkeys[i]);
      this.setState({[itemkeys[i]]:itemvalues[i]});
      var validations=this.state.validations;
      if(validations[itemkeys[i]]!=undefined){
        validations[itemkeys[i]].status=false;
      this.setState({validations});
      }
      }

    // }
  }
      this.checkPendingValidations();
  }
}
handleClickOpen = (data) => {

   this.setState({ open: true });
};

handleClose = () => {
   this.setState({ open: false });
};

loadData = () =>{

    fetch(APIURL+'dynamicDropdown', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(mydata),
  }).then((response) => response.json())
    .then((responseJson) => {
        // console.log("response",responseJson);
        var responseData=responseJson;
        for(var i in responseData){
            // console.log(responseData[i]);
            var statename=responseData[i].name;
            this.setState({[statename]:responseData[i].dropdown})
        }

    })

}

componentWillReceiveProps=(props) =>{
  // console.log('props.itemEditData',);
  // // this.setState({})
  // if(props.itemEditData){
  //   var itemkeys=Object.keys(props.itemEditData);
  //   var itemvalues=Object.values(props.itemEditData);
  //   for(var i in itemkeys){
      // console.log(itemkeys[i]);
  //     this.setState({[itemkeys[i]]:itemvalues[i]});
  //   }
  // }
}
componentDidMount(){
  this.loadData();
}

onSubmit = (e) => {
    e.preventDefault();
    // console.log("addDataItem",this.state);
    var nextobj={service_type_id:this.state.service_type_id,emp_id:this.state.emp_id,table_id:this.state.table_id,outlet_id:this.state.outlet_id,'cust_id':this.state.cust_id,created_by:1,created_on:new Date().getTime()}
    // console.log('nextobj',nextobj);
    if(this.props.itemEditData){
      nextobj.kot_id=this.props.itemEditData.kot_id;
      nextobj.itemArrays=this.props.itemEditData.itemArrays;
      this.props.nextProceedData(nextobj);
    }else{

    this.props.nextProceedData(nextobj);
    }

        // this.itemData(e);

        // this.handleClose();
    }
    checkPendingValidations(){
        var checkvalidationPending=Object.values(this.state.validations).filter(validation=>validation.status===false);
        // console.log(checkvalidationPending);
        if(checkvalidationPending.length!=Object.keys(this.state.validations).length){
            this.setState({errorStatus:true});
        }else{
            this.setState({errorStatus:false});
        }
    }
onChangeData=(value,key) =>{
    if(this.state.validations.hasOwnProperty(key)==true){
    var responseData=ValidationLibrary.checkValidation(value,this.state.validations[key].validations);
    // console.log('responseData',responseData);
    if(responseData.msg!=""){
        var validations=this.state.validations;
        validations[key].msg=responseData.msg;
        validations[key].status=true;
        this.setState({validations});
        // this.setState()
    }else{
        var validations=this.state.validations;
        validations[key].msg=responseData.msg;
        validations[key].status=false;
        this.setState({validations});
    }
}
    this.setState({[key]:value});
    this.checkPendingValidations();
}

render() {
 // console.log("rendering",this.state);

 return (
   <div>
   <form className="dynamic-form" onSubmit={(e) =>{this.onSubmit(e)}} >

   <div className="form-group"> 
   <Grid container spacing={24}>
  
   <Grid item xs={4} md={4}>
   <FormControl  className="form-input"  style={{marginTop:15}} error={this.state.validations.service_type_id.status}>
   <InputLabel>Service Name</InputLabel>
   <Select
   className="form-input"
   value={this.state.service_type_id}
   onOpen={this.handleOpen}
   onClose={this.handleClose}
   onChange={(e) =>this.onChangeData(e.target.value,'service_type_id')}
   >
   <MenuItem value="">
   <em>None</em>
   </MenuItem>
   {this.state.servicetype.map((obj,key) =>{
    return (<MenuItem key={key} value={obj.value}>{obj.value1}</MenuItem>)
})}
   
   </Select>
   {this.state.validations.service_type_id.msg!=""&&
                <FormHelperText>{this.state.validations.service_type_id.msg}</FormHelperText>
            }
   </FormControl>
   </Grid>
    <Grid item xs={4} md={4}>
   <FormControl  className="form-input"  style={{marginTop:15}} error={this.state.validations.emp_id.status}>
   <InputLabel>Employee</InputLabel>
   <Select
   className="form-input"
   value={this.state.emp_id}
   onOpen={this.handleOpen}
   onClose={this.handleClose}
   onChange={(e) =>this.onChangeData(e.target.value,'emp_id')}
   >
   <MenuItem value="">
   <em>None</em>
   </MenuItem>
   {this.state.employee.map((obj,key) =>{
    return (<MenuItem key={key} value={obj.value}>{obj.value1} - {obj.value2}</MenuItem>)
})}
   
   </Select>
   {this.state.validations.emp_id.msg!=""&&
                <FormHelperText>{this.state.validations.emp_id.msg}</FormHelperText>
            }
   </FormControl>
   </Grid>   <Grid item xs={4} md={4}>
   <FormControl  className="form-input"  style={{marginTop:15}} error={this.state.validations.table_id.status}>
   <InputLabel>Table</InputLabel>
   <Select
   className="form-input"
   value={this.state.table_id}
   onOpen={this.handleOpen}
   onClose={this.handleClose}
   onChange={(e) =>this.onChangeData(e.target.value,'table_id')}
   >
   <MenuItem value="">
   <em>None</em>
   </MenuItem>
   {this.state.table.map((obj,key) =>{
    return (<MenuItem key={key} value={obj.value}>{obj.value1} - {obj.value2}</MenuItem>)
})}
   
   </Select>
   {this.state.validations.table_id.msg!=""&&
                <FormHelperText>{this.state.validations.table_id.msg}</FormHelperText>
            }
   </FormControl>
   </Grid><Grid item xs={4} md={4}>
   <FormControl  className="form-input"  style={{marginTop:15}} error={this.state.validations.outlet_id.status}>
   <InputLabel>Outlet</InputLabel>
   <Select
   className="form-input"
   value={this.state.outlet_id}
   onOpen={this.handleOpen}
   onClose={this.handleClose}
   onChange={(e) =>this.onChangeData(e.target.value,'outlet_id')}
   >
   <MenuItem value="">
   <em>None</em>
   </MenuItem>
   {this.state.outlet.map((obj,key) =>{
    return (<MenuItem key={key} value={obj.value}>{obj.value1}</MenuItem>)
})}
   
   </Select>
   {this.state.validations.outlet_id.msg!=""&&
                <FormHelperText>{this.state.validations.outlet_id.msg}</FormHelperText>
            }
   </FormControl>
   </Grid><Grid item xs={4} md={4}>
   <FormControl  className="form-input"  style={{marginTop:15}} error={this.state.validations.cust_id.status}>
   <InputLabel>Customer</InputLabel>
   <Select
   className="form-input"
   value={this.state.cust_id}
   onOpen={this.handleOpen}
   onClose={this.handleClose}
   onChange={(e) =>this.onChangeData(e.target.value,'cust_id')}
   >
   <MenuItem value="">
   <em>None</em>
   </MenuItem>
   {this.state.customer.map((obj,key) =>{
    return (<MenuItem key={key} value={obj.value}>{obj.value1}</MenuItem>)
})}
   
   </Select>
   {this.state.validations.cust_id.msg!=""&&
                <FormHelperText>{this.state.validations.cust_id.msg}</FormHelperText>
            }
   </FormControl>
   </Grid>
   </Grid>

<Button disabled={this.state.errorStatus}  type="submit" color="primary" style={{marginRight:10}} variant="contained">next</Button>
   </div>

   </form>
   </div>
   )
}
}
export default KotMain;