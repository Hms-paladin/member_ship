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
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../helpers/snackbar';
import { Upload, Icon, message } from 'antd';
import CloudUpload from '@material-ui/icons/CloudUpload';




//generate a dynamic dropDown schema.................


const service = [
 {
   value: 1,
   value1: "Speciality"
 },
 {
   value: 2,
   value1: "Multi Speciality"
 },
 {
   value: 1,
   value1: "Super Speciality"
 }
]

const laboratory = [
 {
   value: 1,
   value1: "Inhouse"
 },
 {
   value: 2,
   value1: "Out House"
 },
 {
   value: 3,
   value1: "check"
 }
]

const imaging_center = [
 {
   value:1,
   value1:"XRay"
 },
 {
   value: 2,
   value1: "CT Scan"
 },
 {
   value: 3,
   value1: "MRI"
 },
 {
   value: 4,
   value1: "Ultra Scan"
 }
]

// const imaging_center = [
//   'fd',
//   'da',
//   'de'
// ]

var mydata={fields:[{
   "name":'MemberType',  // state Name
   "foreign_tbl":"mas_membertype",
   "foreign_fields":[{name:'mem_TypeId',alias:'value','alias1':'mem_TypeId'},{name:'mem_TypeName',alias:'value1','alias1':'name'}]},
   {
   "name":'City',  // state Name
   "foreign_tbl":"mas_city",
   "foreign_fields":[{name:'city_Id',alias:'value','alias1':'city_Id'},{name:'city_Name',alias:'value1','alias1':'name'}]
 },
 {
   "name":'State',  // state Name
   "foreign_tbl":"mas_state",
   "foreign_fields":[{name:'state_Id',alias:'value','alias1':'state_Id'},{name:'state_Name',alias:'value1','alias1':'name'}]
 }
 ]};
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







var keys={mem_TypeId:'',ins_Name:'',ins_PhoneNo:'',ins_Address:'',ins_CityId:'',ins_StateId:'',ins_Pincode:'',ins_Website:'',mem_Name:'',mem_Email:'',mem_NumberOfBeds:'',mem_MobileNo:''}
class Member extends Component {
 constructor(props) {
   console.log("props",props)
   super(props);

   this.state = {
     title:"Member",
     value:0,
     MemberType:[],
     // test:"https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
     City:[],
     State:[],
     MemberCity:[],
     MemberState:[],
     validations:{'mem_TypeId':{validations:[ {name:"required",params:''}],msg:'',status:''},'ins_Name':{validations:[ {name:"required",params:''}],msg:'',status:''},'ins_PhoneNo':{validations:[ {name:"required",params:''}],msg:'',status:''},'ins_Address':{validations:[ {name:"required",params:''}],msg:'',status:''},'ins_CityId':{validations:[ {name:"required",params:''}],msg:'',status:''},'ins_StateId':{validations:[ {name:"required",params:''}],msg:'',status:''},'ins_Pincode':{validations:[ {name:"required",params:''}],msg:'',status:''},'ins_Website':{validations:[ {name:"required",params:''}],msg:'',status:''},'mem_Name':{validations:[ {name:"required",params:''}],msg:'',status:''},'mem_Email':{validations:[ {name:"required",params:''}],msg:'',status:''},'mem_NumberOfBeds':{validations:[ {name:"required",params:''}],msg:'',status:''},'mem_MobileNo':{validations:[ {name:"required",params:''}],msg:'',status:''}},
     mem_Id:'',
     mem_TypeId:'',
     ins_Name:'',
     ins_PhoneNo:'',
     ins_Address:'',
     ins_CityId:'',
     ins_StateId:'',
     ins_Pincode:'',
     ins_Website:'',
     mem_Name:'',
     mem_Email:'',
     mem_NumberOfBeds:'',
     mem_MobileNo:'',
     mem_Laboratory:'',
     mem_Imaging: [],
     speciality:'',
     mem_Designation:'',
     errorStatus:true,
     item:[],
     editItem:[],
     editOpen:false,
     snackbarstate:false,
     imageUrl:'',
     // itemEditData:props.itemEditData,
     message:''


   };

 }
 
getBase64  = (img, callback) => {
 const reader = new FileReader();
 reader.addEventListener('load', () => callback(reader.result));
 reader.readAsDataURL(img);
}

beforeUpload = (file) => {
 const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
 if (!isJpgOrPng) {
   message.error('You can only upload JPG/PNG file!');
 }
 const isLt2M = file.size / 1024 / 1024 < 2;
 if (!isLt2M) {
   message.error('Image must smaller than 2MB!');
 }
 return isJpgOrPng && isLt2M;
}

handleChangeImage = info => {
 if (info.file.status === 'uploading') {
   this.setState({ loading: true });
   this.setState({imageUrl:info});
   return;
 }
 if (info.file.status === 'done') {
   // Get this url from response in real world.
   this.getBase64(info.file.originFileObj, imageUrl =>
     this.setState({
       imageUrl,
       loading: false,
     }),
   );
 }
};

handlePreview = async file => {
 console.log("fileList",this.state.fileList)
 if (!this.state.fileList && !file.preview) {
   file.preview = await this.getBase64(this.state.fileList.originFileObj);
 }
 const fileUrl=this.state.fileList
 this.setState({
   previewImage: fileUrl,
   previewVisible: true,
 });
};

 componentWillMount=() =>{

   // if(this.props.itemEditData){
   //   var itemkeys=Object.keys(this.props.itemEditData);
   //   var itemvalues=Object.values(this.props.itemEditData);
   //   for(var i in itemkeys){
   //   // if(itemkeys[i]!='itemArrays'){
   //     if(this.state.hasOwnProperty(itemkeys[i])==true){
   //       console.log(itemkeys[i]);
   //       this.setState({[itemkeys[i]]:itemvalues[i]});
   //       var validations=this.state.validations;
   //       if(validations[itemkeys[i]]!=undefined){
   //         validations[itemkeys[i]].status=false;
   //         this.setState({validations});
   //       }
   //     }

   // }
//   }
//   this.checkPendingValidations();
// }
}
handleClickOpen = (data) => {
 console.log(data)

 this.setState({ open: true });
};

handleClose = () => {
 this.setState({ open: false });
 this.setState({ editOpen: false });
};

editOpen = (data) =>{
 console.log("data",data)
 this.setState({editDetails:data})
 this.setState({editOpen:true});
 this.setState({imageUrl:data.imageUrl})
 for(var i in data){
   this.setState({i:data[i]});
   var validations=this.state.validations;
   if(validations[i]!=undefined){
     validations[i].status=false;
     this.setState({validations});
   }
   console.log(this.state)
 }
 this.checkPendingValidations();

}

closeSnackBar=() =>{
 this.setState({snackbarstate:false})
}


loadData = () =>{
 console.log('loading...');

 fetch(APIURL+'dynamicDropdown', {
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
 //     console.log(itemkeys[i]);
 //     this.setState({[itemkeys[i]]:itemvalues[i]});
 //   }
 // }
}
componentDidMount(){
 this.loadData();
 this.loadTableData();
}



checkPendingValidations(){
 var checkvalidationPending=Object.values(this.state.validations).filter(validation=>validation.status===false);
 console.log(checkvalidationPending);
 if(checkvalidationPending.length!=Object.keys(this.state.validations).length){
   this.setState({errorStatus:true});
 }else{
   this.setState({errorStatus:false});
 }
}
onChangeData=(value,key) =>{
 if(this.state.validations.hasOwnProperty(key)==true){
   var responseData=ValidationLibrary.checkValidation(value,this.state.validations[key].validations);
   console.log('responseData',responseData);
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
       console.log(validations)
     }
   }
   this.setState({[key]:value});
   this.checkPendingValidations();
 }

 onChangeEdit=(value,key) =>{  //..........e=value,key=coloumn name
  console.log(value)
  // this.setState({validations:value})
  // console.log(e.);
  if(key=='mem_Imaging'){

  }
  if(this.state.validations.hasOwnProperty(key)==true){
    var responseData=ValidationLibrary.checkValidation(value,this.state.validations[key].validations);
    console.log('responseData',responseData);
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
      console.log(validations)
    }
  }
  var editDetails=this.state.editDetails;
  editDetails[key]=value; //.........key kula value assign panrom
  console.log("editDetails[key]",this.state.editDetails)
  this.setState({editDetails});
  this.checkPendingValidations();

}

 

 // clearFormValues=() =>{
 //   var self=this;

 //   this.setState({errorStatus:true});

 //   this.props.handleClose();
 // }

 // handleChangeMultiple = event => {
 //   console.log("event",event.target.value);
 //   var options = [];
 //   options  = event.target.value;
 //   console.log("opt",options)
 //   const value = [];
 //   for (let i = 0, l = options.length; i < l; i += 1) {
 //     if (options[i].selected) {
 //       alert("hey")
 //       value.push(options[i].value);
 //     }
 //   }
 //   console.log('val',value)
 //   this.setState({mem_Imaging:[...this.state.mem_Imaging, value]})
 // };
handleChange = (e) => {
 this.setState({mem_Imaging:e.target.value})
}
 loadTableData = () => {

   fetch(APIURL + "getMember", {
     method: "GET",
     headers: {
       Accept: "application/json",        
       "Content-Type": "application/json"
     },

   })
   .then(response => response.json())
   .then(responseJson => {
     console.log("tblValues",responseJson);

     this.setState({ tblValues: responseJson.data });
   });
 };
 onSubmit = (e) => {
   console.log("e",e)
   e.preventDefault();
   var formData=new FormData();
   for(var i in this.state.imageUrl){
     formData.append('imageArray',this.state.imageUrl[i].originFileObj);
   }
   formData.set("mem_TypeId",this.state.mem_TypeId);
   formData.set("ins_Name",this.state.ins_Name);
   formData.set("ins_PhoneNo",this.state.ins_PhoneNo);
   formData.set("ins_Address",this.state.ins_Address);
   formData.set("ins_CityId",this.state.ins_CityId);
   formData.set("ins_StateId",this.state.ins_StateId);
   formData.set("ins_Pincode",this.state.ins_Pincode);
   formData.set("ins_Website",this.state.ins_Website);
   formData.set("mem_Name",this.state.mem_Name);
   formData.set("mem_Email",this.state.mem_Email);
   formData.set("mem_NumberOfBeds",this.state.mem_NumberOfBeds);
   formData.set("mem_MobileNo",this.state.mem_MobileNo);
   formData.set("speciality",this.state.speciality);
   formData.set("mem_Laboratory",this.state.mem_Laboratory);
   formData.set("mem_Imaging",this.state.mem_Imaging);
   formData.set("mem_Designation",this.state.mem_Designation);


   // var nextobj= {
   //   mem_TypeId:this.state.mem_TypeId,
   //   ins_Name:this.state.ins_Name,
   //   ins_PhoneNo:this.state.ins_PhoneNo,
   //   ins_Address:this.state.ins_Address,
   //   ins_CityId:this.state.ins_CityId,
   //   ins_StateId:this.state.ins_StateId,
   //   ins_Pincode:this.state.ins_Pincode,
   //   ins_Website:this.state.ins_Website,
   //   mem_Name:this.state.mem_Name,
   //   mem_Email:this.state.mem_Email,
   //   mem_NumberOfBeds:this.state.mem_NumberOfBeds,
   //   mem_MobileNo:this.state.mem_MobileNo,
   //   speciality: this.state.speciality,
   //   mem_Laboratory:this.state.mem_Laboratory,
   //   mem_Imaging:this.state.mem_Imaging,
   //   mem_Designation:this.state.mem_Designation
   // }
   //console.log("nextobj",nextobj)

   fetch(APIURL+'insertMember', {
     method: 'POST',
     // headers: {
     //   Accept: 'application/json',
     //   'Content-Type': 'application/json',
     // },
     // body: JSON.stringify(nextobj),
     body: formData,
   }).then((response) => response.json())
   .then((responseJson) => {
     console.log("responseInsert",responseJson);
     this.setState({item:responseJson})
     this.loadTableData();
     this.setState({message:"Added Successfully"})
     // this.setState({ snackbarstate: true });
     this.setState({ open: false });

   })


 }
 editSubmit= (e) =>{
   console.log("e",e)
   e.preventDefault();

   var nextEditobj={mem_Id:this.state.editDetails.mem_Id,mem_TypeId:this.state.editDetails.mem_TypeId,ins_Name:this.state.editDetails.ins_Name,ins_PhoneNo:this.state.editDetails.ins_PhoneNo,ins_Address:this.state.editDetails.ins_Address,ins_CityId:this.state.editDetails.ins_CityId,ins_StateId:this.state.editDetails.ins_StateId,ins_Pincode:this.state.editDetails.ins_Pincode,ins_Website:this.state.editDetails.ins_Website,mem_Name:this.state.editDetails.mem_Name,mem_Email:this.state.editDetails.mem_Email,mem_NumberOfBeds:this.state.editDetails.mem_NumberOfBeds,mem_MobileNo:this.state.editDetails.mem_MobileNo,speciality:this.state.editDetails.speciality,      mem_Laboratory:this.state.editDetails.mem_Laboratory,mem_Imaging:this.state.editDetails.mem_Imaging,mem_Designation:this.state.editDetails.mem_Designation}
   console.log("updatedata",nextEditobj);
   fetch(APIURL+'updateMember',{
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body:JSON.stringify(nextEditobj),
   }).then((response) => response.json())
   .then((responseJson) =>{
     console.log("editReponseJson",responseJson);
     this.setState({editItem:responseJson})
     // this.setState({ snackbarstate: true });
     this.loadTableData();
     this.setState({message:"Updated Successfully"})
     this.setState({ editOpen: false }); 
   })
 }


 deleteDynMaster=(data) =>{
 // console.log("deleteDynMaster",data.m);


 var obj={primarykey:data.mem_Id};
 fetch(APIURL+'memberDelete', {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(obj),
 }).then((response) => response.json())
 .then((responseJson) => {
   this.setState({ snackbarstate: true });
   this.setState({message:"Deleted Successfully"})
   this.setState({ deleteValues: responseJson });

   this.loadTableData();

 })
}





render() {
 console.log("member",this.state.MemberType)
 console.log("editDetails",this.state.editDetails);

 const uploadButton = (
   <div>
     <Icon type={this.state.loading ? 'loading' : 'plus'} />
     <div className="ant-upload-text">Upload</div>
   </div>
 );
 const { imageUrl } = this.state;

 return (
   <div>
   <card>

   <div style={{textAlign: "left"}}>
   <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen} style={{
     margin: 13,backgroundColor:"#677c8c" }}>
     <AddIcon />
     </Fab>
     </div>
     </card>
     <CustomizedSnackbars vertical="top" horizontal="right" messageData={this.state.message} variant="success" openState={this.state.snackbarstate} snackbarCallback={this.closeSnackBar} />
     <EnhancedItemTable

     tableTitel={this.state.title}
     tblDataValues={this.state.tblValues}
     viewOpen={this.handleClickOpen}
     editOpen={this.editOpen}
     unselectData={this.state.unselectData}
     deteted={this.deleteDynMaster}
     />


     <Dialog
     open={this.state.open}
     onClose={this.handleClose}
     fullWidth={true}
     maxWidth="md"
     aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd",color:"white"}}>Add {this.state.title}
     </DialogTitle>

     <DialogContent>
     <form className="dynamic-form" onSubmit={(e) =>{this.onSubmit(e)}} >
     <div className="form-group"> 
     <Grid container spacing={24}>

     {/* <Grid>
     <input type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={(e) =>this.onChangeData(e.target,'eve_ImagePath')}/>
     <div style={{display:'flex','align-items': 'flex-end'}}> 
     <CloudUpload style={{'margin-bottom': '12px','margin-right': '10px'}}/> 
     <TextField   
     error={this.state.validations.eve_ImagePath .status}
     helperText={this.state.validations.eve_ImagePath .msg}
     label ="Image"<
     value={this.state.data.eve_ImagePath}
     className="form-input"
     onClick={(e) => this.myInput.click() }
     type="text"
     margin="normal"
     InputProps={{
       readOnly: true,
     }}
     />
     </div>

     </Grid> */}
     
     <Grid item xs={4} md={4}>
     <Upload
       name="avatar"
       listType="picture-card"
       className="avatar-uploader"
       showUploadList={false}
      //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
       beforeUpload={this.beforeUpload}
       onChange={this.handleChangeImage}
     >
       {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
     </Upload>
     </Grid> 


     <Grid item xs={4} md={4}>
     <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
     <InputLabel>Member Type</InputLabel>
     <Select
     className="form-input"
     value={this.state.mem_TypeId}
     onOpen={this.handleOpen}
     onClose={this.handleClose}
     onChange={(e) =>this.onChangeData(e.target.value,'mem_TypeId')}
     >
     
     {this.state.MemberType.map((obj,key) =>{
       return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
     })}

     </Select>
     {this.state.validations.mem_TypeId.msg!=""&&
     <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
   }
   </FormControl>
   </Grid>
   <Grid item xs={4} md={4}>
   <TextField   
   error={this.state.validations.ins_Name.status}
   helperText={this.state.validations.ins_Name.msg}
   label ="Name of The Institution"
   value={this.state.ins_Name}
   className="form-input"
   onChange={(e) =>this.onChangeData(e.target.value,'ins_Name')}
   type="text"
   margin="normal"
   />
   </Grid>
   <Grid item xs={4} md={4}>
   <TextField   
   error={this.state.validations.ins_Address.status}
   helperText={this.state.validations.ins_Address.msg}
   label ="Address"
   value={this.state.ins_Address}
   className="form-input"
   onChange={(e) =>this.onChangeData(e.target.value,'ins_Address')}
   type="text"
   margin="normal"
   />
   </Grid>

   <Grid item xs={4} md={4}>
   <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.ins_CityId.status}>
   <InputLabel>City</InputLabel>
   <Select
   className="form-input"
   value={this.state.ins_CityId}
   onOpen={this.handleOpen}
   onClose={this.handleClose}
   onChange={(e) =>this.onChangeData(e.target.value,'ins_CityId')}
   >
  
   {this.state.City.map((obj,key) =>{
     return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
   })}

   </Select>
   {this.state.validations.ins_CityId.msg!=""&&
   <FormHelperText>{this.state.validations.ins_CityId.msg}</FormHelperText>
 }
 </FormControl>
 </Grid>
 <Grid item xs={4} md={4}>
 <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.ins_StateId.status}>
 <InputLabel>State</InputLabel>
 <Select
 className="form-input"
 value={this.state.ins_StateId}
 onOpen={this.handleOpen}
 onClose={this.handleClose}
 onChange={(e) =>this.onChangeData(e.target.value,'ins_StateId')}
 >
 
 {this.state.State.map((obj,key) =>{
   return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
 })}

 </Select>
 {this.state.validations.ins_StateId.msg!=""&&
 <FormHelperText>{this.state.validations.ins_StateId.msg}</FormHelperText>
}
</FormControl>
</Grid>

<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_PhoneNo.status}
helperText={this.state.validations.ins_PhoneNo.msg}
label ="Tel No (with STD code)"
value={this.state.ins_PhoneNo}
className="form-input"
onChange={(e) =>this.onChangeData(e.target.value,'ins_PhoneNo')}
type="number"
margin="normal"
/>
</Grid>


<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_Pincode.status}
helperText={this.state.validations.ins_Pincode.msg}
label ="Pin Code"
value={this.state.ins_Pincode}
className="form-input"
onChange={(e) =>this.onChangeData(e.target.value,'ins_Pincode')}
type="number"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_Name.status}
helperText={this.state.validations.mem_Name.msg}
label ="Name of The Member"
value={this.state.mem_Name}
className="form-input"
onChange={(e) =>this.onChangeData(e.target.value,'mem_Name')}
type="text"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_Website.status}
helperText={this.state.validations.ins_Website.msg}
label ="Website"
value={this.state.ins_Website}
className="form-input"
onChange={(e) =>this.onChangeData(e.target.value,'ins_Website')}
type="text"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_MobileNo.status}
helperText={this.state.validations.mem_MobileNo.msg}
label ="Mobile"
value={this.state.mem_MobileNo}
className="form-input"
onChange={(e) =>this.onChangeData(e.target.value,'mem_MobileNo')}
type="number"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_Email.status}
helperText={this.state.validations.mem_Email.msg}
label ="Email"
value={this.state.mem_Email}
className="form-input"
onChange={(e) =>this.onChangeData(e.target.value,'mem_Email')}
type="email"
margin="normal"
/>
</Grid>

 <Grid item xs={4} md={4}>
 <TextField   
 error={this.state.validations.mem_NumberOfBeds.status}
 helperText={this.state.validations.mem_NumberOfBeds.msg}
 label ="Number of Beds"
 value={this.state.mem_NumberOfBeds}
 className="form-input"
 onChange={(e) =>this.onChangeData(e.target.value,'mem_NumberOfBeds')}
 type="text"
 margin="normal"
 />
 </Grid>


{/* Service Provider */}
     <Grid item xs={4} md={4}>
     <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
     <InputLabel>Types of Service</InputLabel>
     <Select
     className="form-input"
     value={this.state.speciality}
     onOpen={this.handleOpen}
     onClose={this.handleClose}
     onChange={(e) =>this.onChangeData(e.target.value,'speciality')}
     >
    
     {service.map((obj,key) =>{
       return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
     })}

     </Select>
     {this.state.validations.mem_TypeId.msg!=""&&
     <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
   }
   </FormControl>
   </Grid>
{/* Service Provider */}


{/* Laboratory */}
     <Grid item xs={4} md={4}>
     <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
     <InputLabel>Laboratory</InputLabel>
     <Select
     className="form-input"
     value={this.state.mem_Laboratory}
     onOpen={this.handleOpen}
     onClose={this.handleClose}
     onChange={(e) =>this.onChangeData(e.target.value,'mem_Laboratory')}
     >
    
     {laboratory.map((obj,key) =>{
       return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
     })}

     </Select>
     {this.state.validations.mem_TypeId.msg!=""&&
     <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
   }
   </FormControl>
   </Grid>
{/* Laboratory */}


{/* Imaging Center */}
<Grid item xs={4} md={4}>
     <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
     <InputLabel>Imaging Center</InputLabel>
     <Select
     
     className="form-input"
     multiple
     value={this.state.mem_Imaging}
     onOpen={this.handleOpen}
     onClose={this.handleClose}
     onChange={this.handleChange}
     //renderValue={selected => selected.join(',')}
     //onChange={(e) =>this.onChangeData(e.target.value,'mem_Imaging')}
     >
     
     {imaging_center.map((obj,key) =>{
       return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
     })}
     {/* <MenuItem value={1 }>Speciality</MenuItem>
     <MenuItem value={2}>Speciality</MenuItem>
     <MenuItem value={3}>Speciality</MenuItem> */}
     </Select>
     {this.state.validations.mem_TypeId.msg!=""&&
     <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
   }
   </FormControl>
   </Grid>
{/* Imaging Center */}

{/* Designation */}
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_Name.status}
helperText={this.state.validations.ins_Name.msg}
label ="Designation"
value={this.state.mem_Designation}
className="form-input"
onChange={(e) =>this.onChangeData(e.target.value,'mem_Designation')}
type="text"
margin="normal"
/>
</Grid>

{/* Designation End*/}

</Grid>

<Button disabled={this.state.errorStatus}  type="submit" color="primary" style={{marginRight:10}} variant="contained">Submit</Button>
<Button variant="contained" onClick={this.handleClose} color="secondary">
Cancel
</Button>


</div>

</form>
</DialogContent>
</Dialog>









<Dialog
open={this.state.editOpen}
onClose={this.handleClose}
fullWidth={true}
maxWidth="md"
aria-labelledby="form-dialog-title">
<DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd",color:"white"}}>Edit {this.state.title}
</DialogTitle>

<DialogContent>
<form className="dynamic-form" onSubmit={(e) =>{this.editSubmit(e)}} >
{this.state.editDetails && 
 <div classNmae="form-group"> 
 <Grid container spacing={24}>
 <Grid item xs={4} md={4}>
   
     <Upload
       name="avatar"
       listType="picture-card"
       className="avatar-uploader"
       showUploadList={false}
      //  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
       beforeUpload={this.beforeUpload}
       onChange={this.handleChangeImage}
       //onPreview={this.handlePreview}
     >
       
       {this.state.editDetails.ins_Image ? <img src={this.state.editDetails.ins_Image} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
     </Upload>
     
     </Grid>

 <Grid item xs={4} md={4}>
 <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
 <InputLabel>Member Type</InputLabel>
 <Select
 className="form-input"
 value={this.state.editDetails.mem_TypeId}
 onOpen={this.handleOpen}
 onClose={this.handleClose}
 onChange={e => this.onChangeEdit(e.target.value,'mem_TypeId')}
 >
 
 {this.state.MemberType.map((obj,key) =>{
   return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
 })}

 </Select>
 {this.state.validations.mem_TypeId.msg!=""&&
 <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
}
</FormControl>
</Grid>

<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_Name.status}
helperText={this.state.validations.ins_Name.msg}
label ="Name of The Institution"
value={this.state.editDetails.ins_Name}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'ins_Name')}
type="text"
margin="normal"
/>
</Grid>

<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_Address.status}
helperText={this.state.validations.ins_Address.msg}
label ="Address"
value={this.state.editDetails.ins_Address}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'ins_Address')}
type="text"
margin="normal"
/>
</Grid>

<Grid item xs={4} md={4}>
<FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.ins_CityId.status}>
<InputLabel>City</InputLabel>
<Select
className="form-input"
value={this.state.editDetails.ins_CityId}
onOpen={this.handleOpen}
onClose={this.handleClose}
onChange={(e) =>this.onChangeEdit(e.target.value,'ins_CityId')}
>

{this.state.City.map((obj,key) =>{
 return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
})}

</Select>
{this.state.validations.ins_CityId.msg!=""&&
<FormHelperText>{this.state.validations.ins_CityId.msg}</FormHelperText>
}
</FormControl>
</Grid>
<Grid item xs={4} md={4}>
<FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.ins_StateId.status}>
<InputLabel>State</InputLabel>
<Select
className="form-input"
value={this.state.editDetails.ins_StateId}
onOpen={this.handleOpen}
onClose={this.handleClose}
onChange={(e) =>this.onChangeEdit(e.target.value,'ins_StateId')}
>

{this.state.State.map((obj,key) =>{
 return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
})}

</Select>
{this.state.validations.ins_StateId.msg!=""&&
<FormHelperText>{this.state.validations.ins_StateId.msg}</FormHelperText>
}
</FormControl>
</Grid>

<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_PhoneNo.status}
helperText={this.state.validations.ins_PhoneNo.msg}
label ="Tel No (with STD code)"
value={this.state.editDetails.ins_PhoneNo}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'ins_PhoneNo')}
type="number"
margin="normal"
/>
</Grid>


<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_Pincode.status}
helperText={this.state.validations.ins_Pincode.msg}
label ="Pin Code"
value={this.state.editDetails.ins_Pincode}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'ins_Pincode')}
type="number"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_Name.status}
helperText={this.state.validations.mem_Name.msg}
label ="Name of The Member"
value={this.state.editDetails.mem_Name}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'mem_Name')}
type="text"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.ins_Website.status}
helperText={this.state.validations.ins_Website.msg}
label ="Website"
value={this.state.editDetails.ins_Website}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'ins_Website')}
type="text"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_MobileNo.status}
helperText={this.state.validations.mem_MobileNo.msg}
label ="Mobile"
value={this.state.editDetails.mem_MobileNo}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'mem_MobileNo')}
type="number"
margin="normal"
/>
</Grid>
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_Email.status}
helperText={this.state.validations.mem_Email.msg}
label ="Email"
value={this.state.editDetails.mem_Email}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'mem_Email')}
type="email"
margin="normal"
/>
</Grid>

{/* Service Start*/}
<Grid item xs={4} md={4}>
 <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
 <InputLabel>Type of Service</InputLabel>
 <Select
 className="form-input"
 value={this.state.editDetails.speciality}
 onOpen={this.handleOpen}
 onClose={this.handleClose}
 onChange={e => this.onChangeEdit(e.target.value,'speciality')}
 >

 {service.map((obj,key) =>{
   return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
 })}

 </Select>
 {this.state.validations.mem_TypeId.msg!=""&&
 <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
}
</FormControl>
</Grid>

{/* Service End */}

{/* Laboratory */}
<Grid item xs={4} md={4}>
     <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
     <InputLabel>Laboratory</InputLabel>
     <Select
     className="form-input"
     value={this.state.editDetails.mem_Laboratory}
     onOpen={this.handleOpen}
     onClose={this.handleClose}
     onChange={(e) =>this.onChangeEdit(e.target.value,'mem_Laboratory')}
     >
    
     {laboratory.map((obj,key) =>{
       return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
     })}

     </Select>
     {this.state.validations.mem_TypeId.msg!=""&&
     <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
   }
   </FormControl>
   </Grid>
{/* Laboratory */}


{/* Imaging Center */}
<Grid item xs={4} md={4}>
     <FormControl  className="form-input"  style={{marginTop:15}}  error={this.state.validations.mem_TypeId.status}>
     <InputLabel>Imaging Center</InputLabel>
     {/* {JSON.stringify(this.state.editDetails.mem_ImagingList)}; */}
     <Select
     
     className="form-input"
     multiple
     value={this.state.editDetails.mem_Imaging?this.state.editDetails.mem_Imaging:this.state.editDetails.mem_ImagingList.map(val => parseInt(val.id))}
     onOpen={this.handleOpen}
     onClose={this.handleClose}
     onChange={(e) =>{
      var datalist=JSON.parse(JSON.stringify(this.state.editDetails.mem_Imaging?this.state.editDetails.mem_Imaging:this.state.editDetails.mem_ImagingList.map(val => val.id)));
      datalist=e.target.value;
      this.onChangeEdit(datalist,'mem_Imaging')
     }}
     >
     
     {imaging_center.map((obj,key) =>{
       return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
     })}
     </Select>
     {this.state.validations.mem_TypeId.msg!=""&&
     <FormHelperText>{this.state.validations.mem_TypeId.msg}</FormHelperText>
   }
   </FormControl>
   </Grid>
{/* Imaging Center */}

<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_NumberOfBeds.status}
helperText={this.state.validations.mem_NumberOfBeds.msg}
label ="Number of Beds"
value={this.state.editDetails.mem_NumberOfBeds}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'mem_NumberOfBeds')}
type="text"
margin="normal"
/>
</Grid>


{/* Designation */}
<Grid item xs={4} md={4}>
<TextField   
error={this.state.validations.mem_NumberOfBeds.status}
helperText={this.state.validations.mem_NumberOfBeds.msg}
label ="Designation"
value={this.state.editDetails.mem_Designation}
className="form-input"
onChange={(e) =>this.onChangeEdit(e.target.value,'mem_Designation')}
type="text"
margin="normal"
/>
</Grid>
{/* Designation End 
  // "scripts": {
 //   "start": "react-scripts start --env=jsdom",
 //   "build": "GENERATE_SOURCEMAP=false react-scripts build",
 //   "test": "react-scripts test",
 //   "eject": "react-scripts eject"
 // },
*/}

</Grid>

<Button disabled={this.state.errorStatus}  type="submit" color="primary" style={{marginRight:10}} variant="contained">Submit</Button>
<Button variant="contained" onClick={this.handleClose} color="secondary">
Cancel
</Button>


</div>
}
</form>
</DialogContent>
</Dialog>
</div>
)
}
}
export default Member;

