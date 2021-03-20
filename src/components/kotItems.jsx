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


//****************Dynamic Field Generate**************
const APIURL=apiurl;

var groupdropdown={fields:[{
    "name":'group', // state Name
    "foreign_tbl":"mas_group",
    "foreign_fields":[{name:'grp_id',alias:'value','alias1':'grp_id'},{name:'group_name',alias:'value1','alias1':'group_name'}],
},{
    "name":'item', // state Name
    "foreign_tbl":"mas_item",
    "foreign_fields":[{name:'item_id',alias:'value','alias1':'item_id'},{name:'item_name',alias:'value1','alias1':'item_name'}]
}]};

var itemDropdown={fields:[{
    "name":'item', // state Name
    "foreign_tbl":"mas_item",
    "foreign_fields":[{name:'item_id',alias:'value','alias1':'item_id'},{name:'item_name',alias:'value1','alias1':'item_name'}],
}]}

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



var objItemRate={"item_code":"","item_qty":"",grp_id:'',items:[],created_by:1}
class KotItems extends Component {
  constructor(props) {
     // console.log("props",props)
     const { classes } = props;
     super(props);
     this.state = {
        title:"Item",
        rows:[],
        item:[],
        group:[],
        value:0,
        grp_id:'',
        itemData:props.itemData



    };

}
componentWillReceiveProps=(props) =>{
    this.setState({rows:[]})
    if(props.itemData){
        this.setState({itemData:props.itemData});
    }
    if(props.itemEditData){
        // console.log("asdfasdfprops",this.state);
        for(var i in props.itemEditData.itemArrays){
            props.itemEditData.itemArrays[i].items=this.state.item;
            props.itemEditData.itemArrays[i].grp_id=props.itemEditData.itemArrays[i].group_id;
        }
        this.setState({rows:props.itemEditData.itemArrays});

        // console.log();
    }
}
handleClickOpen = (data) => {

 this.setState({ open: true });
};

handleClose = () => {
 this.setState({ open: false });
};


loadData = (obj,data,key) =>{

    fetch(APIURL+'dynamicDropdown/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
  }).then((response) => response.json())
    .then((responseJson) => {
        // console.log("response",responseJson);
        var responseData=responseJson;
        for(var i in responseData){
            // console.log(responseData[i]);
            var statename=responseData[i].name;
        if(data){
            // console.log("hii i am state");
            var rows=this.state.rows;
            rows[key].items=responseData[i].dropdown;
            this.setState({rows});
        }else{
            this.setState({[statename]:responseData[i].dropdown})
        }
        }
    })
}
componentDidMount(){
  this.loadData(groupdropdown);
}


onChange=(e,data,key,index)=>{
    // console.log(e.target.value);
    var textvalue=e.target.value;
    var rows=this.state.rows;
    if(key=='grp_id'){
        // loadData
        itemDropdown.fields[0].conditionkey={'group_id':textvalue};
        // console.log(itemDropdown);
        this.loadData(itemDropdown,data,index);
    }
    rows[index][key]=textvalue;
    // console.log(rows);
    this.setState({rows});


    // data[key]=textvalue;
    // this.setState({rows})

}
checkValidations(){
     var taxLength=this.state.rows.filter((data) =>data.grp_id=="").length;
    var serviceLength=this.state.rows.filter((data) =>data.item_code=="").length;

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
   var checkvalidStatus=this.checkValidations();
   // console.log(checkvalidStatus);
   if(checkvalidStatus==true){
    // console.log();
    var finalResponse=this.state.itemData;
    finalResponse.kot_items=this.state.rows;
    // console.log('finalResponse',finalResponse);
    this.props.finalDataSent({finalResponse})
   }else{
    // console.log("error");
   }
}


//.......key=>index
Delete =(key) =>{

    var rows=this.state.rows;
    // console.log("key",key)
    rows.splice(key,1);
    this.setState({rows})
    this.checkValidations();
    // rows[index].splice(e);
    // console.log("delete")
    // rows.splice(objItemRate)
}


addFunction =() =>{
    // console.log(this.state)
    return(
        <form className="dynamic-form" onSubmit={(e) =>{this.onSubmit(e)}}>
        {this.state.rows.length>0&&this.state.rows.map((data,key) =>{
            // console.log(key);
          return (  <div classNmae="form-group" key={key}> 
            <Grid container spacing={24}>

            <Grid item xs={4} md={3}>
            <FormControl  className="form-input"  style={{marginTop:15}}>
            <InputLabel>Group</InputLabel>
            <Select
            className="form-input"
            value={data.grp_id}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            onChange={(e) =>this.onChange(e,data,'grp_id',key)}
            >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {this.state.group.length>0&&this.state.group.map((obj,key) =>{
                return (<MenuItem key={key} value={obj.value}>{obj.value1}</MenuItem>)
            })}

            </Select>
            </FormControl>
            </Grid>
            <Grid item xs={4} md={3}>
            <FormControl  className="form-input"  style={{marginTop:15}}>
            <InputLabel>Item</InputLabel>
            <Select
            className="form-input"
            value={data.item_code}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            onChange={(e) =>this.onChange(e,data,'item_code',key)}
            >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {data.items.length>0&&data.items.map((obj,key) =>{
                return (<MenuItem key={key} value={obj.value}>{obj.value1}</MenuItem>)
            })}

            </Select>
            </FormControl>
            </Grid>

            <Grid item xs={4} md={3}>
            <TextField   
            label ="Quantity"
            className="form-input"
            type="text"
            onChange={(e) =>this.onChange(e,data,'item_qty',key)}
            value={data.item_qty}
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
 // console.log("data",objItemRate);
 var rows=this.state.rows==undefined?[]:this.state.rows;
 rows.push(Object.assign({},objItemRate));
 this.setState({rows});
 // this.checkValidations();
 
}

render() {
  // console.log("rendering");

  return (
    <div >
    <Button  type="submit" color="primary" onClick= {this.addRow} variant="contained">Add Items</Button>
    {this.state.fielderror&&<span className="spanerror">Some Fields are empty</span>}
    <div style={{minHeight:50,maxHeight:400,overflowY:'auto',overflowX:'hidden'}}>
    {this.state.rows.length==0&&
        <span className="spanerror">No Records Found</span>
    }
    {this.addFunction()}
    </div>
    <div className="groupButtonCenter" >
         <Button  type="submit" color="primary" style={{marginRight:10}} variant="contained"onClick={() =>this.props.goback()}>back</Button>
       {/*  <Button variant="contained" onClick={this.handleClose} style={{marginRight:10}} color="secondary"> Cancel</Button>*/}
         <Button disabled={this.state.rows&&this.state.rows.length==0?true:false} onClick={this.submitItems} type="submit" color="primary" style={{marginRight:10}} variant="contained">Submit</Button>
         </div>
    </div>
    )
}
}
export default KotItems;