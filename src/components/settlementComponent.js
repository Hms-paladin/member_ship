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
 import CardActions from "@material-ui/core/CardActions";
 import CardContent from "@material-ui/core/CardContent";
 import Table from "@material-ui/core/Table";
 import TableBody from "@material-ui/core/TableBody";
 import TableCell from "@material-ui/core/TableCell";
 import TableHead from "@material-ui/core/TableHead";
 import TableRow from "@material-ui/core/TableRow";
 import Input from '@material-ui/core/Input';
 import apiurl from "../helpers/apiurl";
 import OutlinedInput from '@material-ui/core/OutlinedInput';
 import FilledInput from '@material-ui/core/FilledInput';
 import InputLabel from '@material-ui/core/InputLabel';
 import FormControl from '@material-ui/core/FormControl';
 import Select from '@material-ui/core/Select';
 import MenuItem from '@material-ui/core/MenuItem';
 import Fab from '@material-ui/core/Fab';
 import AddIcon from '@material-ui/icons/Add';
 import Tabs from '@material-ui/core/Tabs';
 import Tab from '@material-ui/core/Tab';
 import Typography from '@material-ui/core/Typography';
 import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

 import DeleteIcon from '@material-ui/icons/Delete';
 import IntegrationDownshift from './autocomplete';


//****************Dynamic Field Generate**************
const APIURL=apiurl;

var mydata={fields:[{
    "name":'items', // state Name
    "foreign_tbl":"mas_item",
    "foreign_fields":[{name:'item_id',alias:'value','alias1':'item_id'},{name:'item_code',alias:'value1','alias1':'item_code'},{name:'item_name',alias:'value2','alias1':'item_name'}],
}]
};

//**********************************
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



var objItemRate={"service_type_id":"","item_tax_id":"","item_rate":"",created_by:1}
class SettlementComponent extends Component {
  constructor(props) {
     console.log("props",props)
     const { classes } = props;
     super(props);
     this.state = {
        title:"Item",
        rows:[],
        items:[],
        value:0,
        itemData:props.itemData,
        totalAmount:0,
        itemArray:[]



    };

}
componentWillReceiveProps=(props) =>{
    console.log('props.itemsresponse',props);
    this.setState({rows:[]})
    if(props.itemData){
        this.setState({itemData:props.itemData});
    }
    if(props.itemsresponse){
        if(props.itemsresponse.data){
        this.setState({itemArray:props.itemsresponse.data.orderDetails});
        this.setState({totalAmount:props.itemsresponse.data.totalAmount});
    }
    }
    if(props.itemEditData){
        console.log("asdfasdfprops",);
        this.setState({rows:props.itemEditData.itemArrays})

        // console.log();
    }
}
handleClickOpen = (data) => {

 this.setState({ open: true });
};

handleClose = () => {
 this.setState({ open: false });
};


loadData = () =>{

    fetch(APIURL+'dynamicDropdown/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(mydata),
  }).then((response) => response.json())
    .then((responseJson) => {
        console.log("response",responseJson);
        var responseData=responseJson;
        for(var i in responseData){
            console.log(responseData[i]);
            var statename=responseData[i].name;
        for(var j in responseJson[i].dropdown){
            responseJson[i].dropdown[j].label=responseJson[i].dropdown[j].value1+" - "+responseJson[i].dropdown[j].value2
        }
            this.setState({[statename]:responseData[i].dropdown})
        }

    })

}
componentDidMount(){
  this.loadData();
}


onChange(e,data,key,index){
    console.log(e.target.value);
    var textvalue=e.target.value;
    var rows=this.state.rows;
    rows[index][key]=textvalue;
    // console.log(rows);
    this.setState({rows});


    // data[key]=textvalue;
    // this.setState({rows})

}
checkValidations(){
     var taxLength=this.state.rows.filter((data) =>data.item_tax_id=="").length;
    var serviceLength=this.state.rows.filter((data) =>data.service_type_id=="").length;

    // console.log(taxLength +"--"+serviceLength);
    if(taxLength == 0 && serviceLength==0){
        // alert("proceed");
        this.setState({fielderror:false})
        return true;
    }else{
        // alert("fields is missing");
        this.setState({fielderror:true})
        return false;
        // this.setState({error:true})
    }
}
submitItems=() =>{
    var obj={data:this.state.itemArray,amount:this.state.totalAmount};
    this.props.onSubmit(obj);
   // var checkvalidStatus=this.checkValidations();
   // // console.log(checkvalidStatus);
   // if(checkvalidStatus==true){
   //  // console.log();
   //  var finalResponse=this.state.itemData;
   //  finalResponse.itemRates=this.state.rows;
   //  // console.log('finalResponse',finalResponse);
   //  this.props.finalDataSent({finalResponse})
   // }else{
   //  console.log("error");
   // }
}


//.......key=>index
Delete =(key) =>{

    var rows=this.state.rows;
    console.log("key",key)
    rows.splice(key,1);
    this.setState({rows})
    this.checkValidations();
    // rows[index].splice(e);
    // console.log("delete")
    // rows.splice(objItemRate)
}


addFunction =() =>{
    // console.log(this.staet.rows)
    return(
        <form className="dynamic-form" onSubmit={(e) =>{this.onSubmit(e)}}>
        {this.state.rows&&this.state.rows.map((data,key) =>{
            console.log(key);
          return (  <div classNmae="form-group" key={key}> 
            <Grid container spacing={24}>

            <Grid item xs={4} md={3}>
            <FormControl  className="form-input"  style={{marginTop:15}}>
            <InputLabel>Service Name</InputLabel>
            <Select
            className="form-input"
            value={data.service_type_id}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            onChange={(e) =>this.onChange(e,data,'service_type_id',key)}
            >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {this.state.ServiceName.length>0&&this.state.ServiceName.map((obj,key) =>{
                return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
            })}

            </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4} md={3}>
            <FormControl  className="form-input"  style={{marginTop:15}}>
            <InputLabel>Tax Name</InputLabel>
            <Select
            className="form-input"
            value={data.item_tax_id}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            onChange={(e) =>this.onChange(e,data,'item_tax_id',key)}
            >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {this.state.TaxName.length>0&&this.state.TaxName.map((obj,key) =>{
                return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
            })}

            </Select>
            </FormControl>
            </Grid>

            <Grid item xs={4} md={3}>
            <TextField   
            label ="Item Rate"
            className="form-input"
            type="text"
            onChange={(e) =>this.onChange(e,data,'item_rate',key)}
            value={data.item_rate}
            margin="normal"
            />
            </Grid> 
            <Grid item xs={4} md={3} >
            <DeleteOutlinedIcon onClick={() =>this.Delete(key)} style={{marginTop: "40"}} />
            </Grid>
            </Grid>


            </div>)  
      })}


        </form>
        )

}


addRow =() =>{
 console.log("data",objItemRate);
 var rows=this.state.rows==undefined?[]:this.state.rows;
 rows.push(Object.assign({},objItemRate));
 this.setState({rows});
 // this.checkValidations();
 
}
tableResponse=(data)=>{
    console.log('data',data);
}
render() {
  console.log("rendering",this.state);

  return (
    <div>
    {this.state.itemArray.length>0&&
    <small>Item Details</small>
}
   {this.state.itemArray.map((obj)=>{
return(
     <Grid container spacing={24}>
      <Grid item xs={4} md={3}>
            <TextField   
            label ="Item Code"
            className="form-input" 
            type="text"
            value={obj.item_code}
            margin="normal"
            disabled
            />
            </Grid>   
              <Grid item xs={4} md={3}>
            <TextField   
            label ="Item Code"
            className="form-input"
            type="text"
            value={obj.item_name}
            margin="normal"
            disabled
            />
            </Grid>
            <Grid item xs={4} md={3}>
             <TextField   
            label ="Amount"
            className="form-input"
            type="text"
            value={obj.percentageAmount}
            margin="normal"
            disabled
            />
            </Grid> </Grid>)
   })}
   {this.state.itemArray.length==0&&<div class="errorMsg1">No Data</div>}
   {this.state.itemArray.length>0&&
    
          <div>Total Amount : {this.state.totalAmount}</div>
       }

    <div style={{minHeight:50,maxHeight:400,overflowY:'auto',overflowX:'hidden'}}>
    </div>
    <div className="groupButtonCenter" >
       {/*  <Button variant="contained" onClick={this.handleClose} style={{marginRight:10}} color="secondary"> Cancel</Button>*/}
         <Button disabled={this.state.itemArray.length==0?true:false} onClick={this.submitItems} type="submit" color="primary" style={{marginRight:10}} variant="contained">Submit</Button>
         </div>
    </div>
    )
}
}
export default SettlementComponent;