
import React, { Component } from "react";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ValidationLibrary from "../helpers/validation/validationfunction";
import EnhancedTable from "../components/dynTable";
import MaterialUIPickers from "../components/datePicker";


// import { bounce, tada } from "react-animations";

// import DateFnsUtils from '@date-io/date-fns';
import {DatePicker } from 'material-ui-pickers';
function clearobjectvalues(obj){
	for(var i in Object.keys(obj)){
		obj[Object.keys(obj)[i]]=""
	}
	return obj;
}
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

var self=""
class DynForms extends React.Component {
	constructor(props) {
		const { classes, editOpen } = props;
		super(props);
		self=this;
		var {keys,validataions,clearData}=props;
		this.state = {
			// selectedDate: new Date(),
			open: false,
			data:props.formData,
			primaryKey:props.primaryKey,
			keys,
			clearData:Object.assign({},clearData),
			errorStatus:true,
			validators:Object.assign({},validataions),
			validatorMsgs:Object.assign({},validataions)
		};
		
		// console.log('this.state',this.state)

		

	}
	checkPendingValidations(){
		var checkvalidationPending=Object.values(this.state.validators).filter(validation=>validation===false);
		console.log(checkvalidationPending,this.state.validators,"checkvalidationPending");
		if(checkvalidationPending.length!=Object.values(this.state.validators).length){
			this.setState({errorStatus:true});
		}else{
			this.setState({errorStatus:false});
		}
	}
	componentDidMount(){
		
		// alert(JSON.stringify(this.props.keys));
		this.checkPendingValidations();
	}
	componentWillReceiveProps=(props) =>{
		this.setState({validators:props.validataions})
		this.checkPendingValidations();
		console.log(props,"props:coming");
		if(props.keys){
			this.setState({})
		}
	}
	onChange=(e,column_name,validations) =>{

		console.log("validations",e,validations)
		var responseData=ValidationLibrary.checkValidation(e.target.value,validations);

		var keys=this.state.keys;
		keys[column_name]=e.target.value
		this.setState({keys})
		var validators=this.state.validators;
		var validatorMsgs=this.state.validatorMsgs;
		if(responseData.msg!=""){
			validators[column_name]=true;
			this.setState({validators});
			validatorMsgs[column_name]=responseData.msg;
			this.setState({validatorMsgs});
		}else{
			validators[column_name]=false;
			this.setState({validators});
			validatorMsgs[column_name]=responseData.msg;
			this.setState({validatorMsgs});
		}
		console.log("changingdata",keys);
		this.checkPendingValidations();
		
	}
	handleChange(e,column_name,validations){
		console.log(e,column_name,'sdsdfjsdfjksdfjh')
		if(this.props.getMemberId && e.target.name === 'mem_Id'){
			this.props.getMemberId(e.target.value)
		}
		var responseData=ValidationLibrary.checkValidation(e.target.value,validations);
		var keys=self.state.keys;
		console.log("key",e,keys)
		keys[column_name]=e.target.value
		self.setState({keys});
		var validators=self.state.validators;
		var validatorMsgs=self.state.validatorMsgs;
		if(responseData.msg!=""){
			validators[column_name]=true;
			self.setState({validators});
			validatorMsgs[column_name]=responseData.msg;
			self.setState({validatorMsgs});
		}else{
			validators[column_name]=false;
			self.setState({validators});
			validatorMsgs[column_name]=responseData.msg;
			self.setState({validatorMsgs});
		}
		this.checkPendingValidations();
	}
	receiveDate = (columnDate,date) => {
		var keys=this.state.keys;
		keys[columnDate]=date;
		this.setState({keys})
		// this.checkPendingValidations();
		console.log("dateValidation",date)

	};


	renderDynamicFields = (obj) =>{
		// const { selectedDate } = this.state;
		// console.log('obj',obj);
		let key = obj.index+1;
		let type = obj.DATA_TYPE=="varchar"?"text":'text';
		let props = obj.props || {};
		let column_name=obj.COLUMN_NAME;
		var keys=this.state.keys;
		keys.value=obj.value;
		if (obj.hasOwnProperty('dropdown')==true) {
			// console.log('hasOwnProperty');
			return ( <FormControl  className="form-input" style={{marginTop:15}} error={this.state.validators[column_name]}>
				<InputLabel htmlFor={obj.COLUMN_NAME}>{obj.alias}</InputLabel>
				<Select
				value={this.state.keys[obj.COLUMN_NAME]}
				onChange={(e) =>{this.handleChange(e,column_name,obj.validations)}}
				onOpen={this.handleOpen}
				// onClose={this.handleClose}
				inputProps={{
					name: obj.COLUMN_NAME,
					id: obj.alias,
				}}
				>
				<MenuItem value="">
				<em>None</em>
				</MenuItem>
				{obj.dropdown.map((row) =>{
					return (<MenuItem value={row.value}>{row.value1}</MenuItem>)
				})}
				</Select>
				{this.state.validatorMsgs[column_name]!=""&&
				<FormHelperText>{this.state.validatorMsgs[column_name]}</FormHelperText>
			}
			</FormControl>)
		}
		else if(obj.DATA_TYPE== "varchar" || obj.DATA_TYPE== "int" || obj.DATA_TYPE== "bigint" || obj.DATA_TYPE== "char" || obj.DATA_TYPE== "double"){
			return(
				<TextField   {...props}
				label ={obj.alias}
				error={this.state.validators[column_name]}
				className="form-input"
				helperText={this.state.validatorMsgs[column_name]}
				type={type}
				margin="normal"
				value={this.state.keys[column_name]}
				onChange={(e) =>{this.onChange(e,column_name,obj.validations)}}
				style={{whiteSpace:'nowrap',width:'180px'}}
				/>
				)
		}
		else if(obj.DATA_TYPE== "date"){

			return(
				<MaterialUIPickers value={this.state.keys[column_name]} dateAlias={obj.alias} keyDate={obj.COLUMN_NAME}  receiveDate={this.receiveDate}/>
				
				)
		}
	}

	renderForm = () =>{
		// console.log('renderForm',this.props.formData);

		let model = this.state.data;
		let formUI = model.map((m,index) =>{
			
			let key = index+1;
			let type = m.DATA_TYPE ||"text";
			let props = m.props || {};
			let column_name=m.COLUMN_NAME;
			m.index=index;
			return(
				m.COLUMN_NAME!=this.state.primaryKey && m.COLUMN_NAME!=this.props.hideField&&
				<Grid item xs={12} md={4} >

				{this.renderDynamicFields(m)}
				</Grid>

				)
			
		})
		return formUI;
	}
	clearFormValues=() =>{
		var self=this;
	// alert("clearing Values...");
	// console.log(clearobjectvalues(this.state.validators));
	this.setState({keys:clearobjectvalues(this.state.keys)})
	this.setState({validators:clearobjectvalues(this.state.validators)})
	this.setState({validatorMsgs:clearobjectvalues(this.state.validatorMsgs)})
	this.setState({errorStatus:true});

	this.props.handleClose();
}
handleClose=() =>{
	this.clearFormValues();
		// this.props.handleEditClose();

	}
	onSubmit = (e) => {
		// console.log("addData",e)
		console.log("keys",this.state.keys);
		e.preventDefault();
		if(this.props.onSubmit) this.props.onSubmit(JSON.parse(JSON.stringify(this.state.keys)));
		this.handleClose();
	}


	render(){
		// console.log('this.statemystate',this.state);
		console.log("myprops",this.props);

		return(
			<form className="dynamic-form" onSubmit={(e) =>{this.onSubmit(e)}}>

			<Grid container spacing={24}>
			{this.renderForm()}
			</Grid>
			
			<div className="groupButtonCenter">
				<Button  type="submit" color="primary" style={{marginRight:10}} variant="contained" disabled={this.state.errorStatus}>
					{
						this.props.editcontent === true ? "Update" : "Submit"
					}
				</Button>
			<Button variant="contained" onClick={this.handleeditClose}  onClick={this.handleClose} color="secondary">
			Cancel
			</Button>
			</div>

			</form>
			)

	}


}

export default DynForms;