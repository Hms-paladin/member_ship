import React, { Component } from "react";
import DynForms from "../components/dynForm";
import EnhancedTable from "../components/dynTable";
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
import apiurl from "../helpers/apiurl";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../helpers/snackbar';
// params ,{name:"minLength",params:'10'}
// import WarningIcon from '@material-ui/icons/Warning';

//**********************************************************
//**************Dynamic Form Validation Schema**************
const APIURL = apiurl;
var t_name = 'mas_user';  //**********Table Name  
var objkey = { 'user_Name': '', 'user_roleId': '2', 'user_Designation': '', 'user_CountryCode': '91', 'user_MobileNumber': '', 'user_HospitalName': '', 'user_Email': '', 'user_Address': '', 'user_password': '' };
var objkey1 = { 'user_Name': '', 'user_roleId': '', 'user_Designation': '', 'user_CountryCode': '', 'user_MobileNumber': '', 'user_HospitalName': '', 'user_Email': '', 'user_Address': '', 'user_password': '' };
var validataions = { 'user_Name': '', 'user_roleId': '', 'user_Designation': '', 'user_CountryCode': '', 'user_MobileNumber': '', 'user_HospitalName': '', 'user_Email': '', 'user_Address': '', 'user_password': '' }
var validataions1 = { 'user_Name': '', 'user_roleId': '', 'user_Designation': '', 'user_CountryCode': '', 'user_MobileNumber': '', 'user_HospitalName': '', 'user_Email': '', 'user_Address': '', 'user_password': '' }
var clearData = { 'user_Name': '', 'user_roleId': '', 'user_Designation': '', 'user_CountryCode': '', 'user_MobileNumber': '', 'user_HospitalName': '', 'user_Email': '', 'user_Address': '', 'user_password': '' }
var primary_key = 'user_Id';//........hiding purpose of dynamic master

//*******************************************************
//........dyn add & edit form generate

//***********************************************************

var mydata = {
  fields: [

    //.........................Index frist one is static
    {
      "key": "user_Id",
      "alias": "User ID",
      "validations": [{ name: "required", params: '' }]
    },
    //..........................
    {
      "key": "user_Name",
      "alias": "User Name",
      "validations": [{ name: "required", params: '' }]
    },

    {
      "key": "user_roleId",
      "alias": "User Role",
      "foreign_tbl": 'mas_role',
      "foreign_fields": [{ 'name': 'role_Id', 'alias': 'value' }, { 'name': 'role_name', 'alias': 'value1' }],
      "validations": [{ name: "required", params: '' }]
    },
    {
      "key": "mem_Id",
      "alias": "Member",
      "foreign_tbl": 'mas_member',
      "foreign_fields": [{ 'name': 'mem_Id', 'alias': 'value' }, { 'name': 'ins_Name', 'alias': 'value1' }],
      "validations": [{ name: "required", params: '' }]
    },
    {
      "key": "user_Designation",
      "alias": "User Designation",
      "validations": [{ name: "required", params: '' }]
    },
    {
      "key": "user_CountryCode",
      "alias": "User Country Code",
      "validations": [{ name: "required", params: '' }, { name: 'country_code', params: '3' }]
    },
    {
      "key": "user_MobileNumber",
      "alias": "User Mobile Number",
      "validations": [{ name: "required", params: '' }, { name: 'allowNumaricOnly', params: '' }, { name: 'mobile', params: '10' },]
    },
    {
      "key": "user_HospitalName",
      "alias": "User Hospital Name",
      "validations": [{ name: "required", params: '' },]
    },
    {
      "key": "user_Email",
      "alias": "User Email",
      "validations": [{ name: "required", params: '' }, { name: 'email', params: '' }]
    },
    {
      "key": "user_Address",
      "alias": "User Address",
      "validations": [{ name: "required", params: '' }]
    },

    // {
    //   "key": "user_password",
    //   "alias": "User Password",
    //   "validations": [{ name: "required", params: '' }]
    // }


  ], table_name: t_name
};

//**************Dynamic Form Schema*************************

var tableSchema = {
  fields: [
    {
      //................index first is static
      "key": "user_Id",
      "alias": "User ID",
      visible: false,
      queryValid: true
    },
    //...................

    {
      "key": "user_Name",
      "alias": "User Name",
      visible: true,
      queryValid: true
    },
    {
      "key": "user_roleId",
      "alias": "User Role",
      visible: false,
      queryValid: true
    },
    {
      "key": "mem_Id",
      "alias": "Member",
      visible: false,
      queryValid: true
    },
    {
      "key": "mas_role_role_name",
      "alias": "Role Name",
      "querValid": false,
      visible: true
    },
    {
      key: 'user_roleId',
      alias: 'user_roleId',
      visible: false,
      queryValid: true,
      foreign_tbl: 'mas_role',
      foreign_fields: [{ name: 'role_Id', alias: 'role_Id', alias1: 'role_Id' }, { name: 'role_name', alias: 'role_name', alias1: 'role_name' }]
    },
    {
      key: 'mem_Id',
      alias: 'mem_Id',
      visible: false,
      queryValid: true,
      foreign_tbl: 'mas_member',
      foreign_fields: [{ name: 'mem_Id', alias: 'mem_Id', alias1: 'mem_Id' }, { name: 'ins_Name', alias: 'ins_Name', alias1: 'ins_Name' }]
    },
    {
      "key": "user_Designation",
      "alias": "User Designation",
      visible: true,
      queryValid: true
    },
    {
      "key": "user_CountryCode",
      "alias": "User Contry Code",
      visible: true,
      queryValid: true
    },
    {
      "key": "user_MobileNumber",
      "alias": "User Mobile Number",
      visible: true,
      queryValid: true
    },

    {
      "key": "user_HospitalName",
      "alias": "User Hospital Name",
      visible: true,
      queryValid: true
    },

    {
      "key": "user_Email",
      "alias": "User Email",
      visible: true,
      queryValid: true
    },

    {
      "key": "user_Address",
      "alias": "User Address",
      visible: true,
      queryValid: true
    },
    //  {
    //   "key":"user_password",
    //   "alias":"User Password" ,
    //   visible:true,
    //   queryValid:true
    // },
    {
      "key": "is_Delete",
      "alias": "isDelete",
      visible: false,
      queryValid: true,
    }

  ], table_name: t_name, wherecondition: "where " + t_name + ".is_Delete=0"
};


//**************************************************************
//******************************************************************

var self = ""
class UserMaster extends Component {
  constructor(props) {
    // console.log("props",props)
    super(props);
    this.state = {
      validataions: { 'user_Name': '', 'user_roleId': '', 'user_Designation': '', 'user_CountryCode': '', 'user_MobileNumber': '', 'user_HospitalName': '', 'user_Email': '', 'user_Address': '' },
      memberFormData: [],
      error: null,
      isLoaded: false,
      title: "User",
      handleEditOpen: false,
      datas: props.editPopup,
      snackbarstate: false,
      unselectData: null,
      items: [],
      editcontent: false,
      message: ''
    };

  }
  //addPopup............

  handleClickOpen = (data) => {

    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ handleEditOpen: false });
    objkey = Object.assign({}, objkey1);
    this.state.validataions = Object.assign({}, validataions1);
  };

  //editPopup..........

  handleClickEditOpen = (data) => {
    this.setState({ unselectData: true });
    // console.log("items",this.state.items)
    this.setState({ editcontent: true })
    var items = this.state.items;

    var datakeys = Object.keys(data);
    var datavalues = Object.values(data);

    for (var i = 0; i < items.length; i++) {
      var getIndex = datakeys.indexOf(items[i].COLUMN_NAME);
      // items[i].value=datavalues[getIndex];
      console.log(objkey, 'sdfsdf')
      objkey[items[i].COLUMN_NAME] = datavalues[getIndex];
      objkey[items[i].COLUMN_NAME] == "" ? this.state.validataions[items[i].COLUMN_NAME] = "Field Required" : this.state.validataions[items[i].COLUMN_NAME] = false;
    }
    console.log("itesms", items, datakeys, datavalues);
    this.setState({ items });
    this.setState({ handleEditOpen: true });

  };

  handleEditClose = () => {
    this.setState({ handleEditOpen: false });
    this.setState({ editcontent: false });
  };


  loadData = () => {

    fetch(APIURL + 'dynamicMaster/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mydata),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ items: responseJson })
        console.log("items", this.state.items)
      })

  }
  componentWillMount() {
    this.loadData()
  }

  insertDynMaster(data) {
    var obj = { fields: data, table_name: t_name };
    fetch(APIURL + 'insertDyn', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("insertValues", responseJson);
        this.setState({ insertValues: responseJson });
        this.setState({ message: "Record Added Successfully" })
        this.setState({ snackbarstate: true })
        this.loadTableData();

      })
  }

  updatetDynMaster(data) {
    var obj = { fields: data, table_name: t_name, primarykey: "user_Id" };
    fetch(APIURL + 'updateDynamic', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.log("updateValues",responseJson);
        this.setState({ message: "Record Updated Successfully" })
        this.setState({ snackbarstate: true })
        this.setState({ updateValues: responseJson })
        this.loadTableData();

      })
  }


  loadTableData = () => {
    fetch(APIURL + 'getDynApi', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableSchema),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("tblValues", responseJson);
        this.setState({ tblValues: responseJson })

      })

  }
  closeSnackBar = () => {
    this.setState({ snackbarstate: false })
  }


  deleteDynMaster = (data) => {

    // console.log("deleteDynMaster",data);
    var obj = { fields: data, table_name: t_name, primarykey: "user_Id" };
    fetch(APIURL + 'deleteDyn', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson)
        this.setState({ message: "Record Deleted Successfully" })
        this.setState({ snackbarstate: true });
        this.setState({ unselectData: true });
        this.loadTableData();

        if (responseJson.data == 0) {
          // alert('Detail Deleted');
          // console.log("deleteValues",responseJson);

          this.loadTableData();
        }

      })
  }


  componentDidMount() {
    this.loadTableData();
  }
  editonSubmit = (data) => {
    this.updatetDynMaster(data);
  }
  onSubmit = (data) => {
    this.insertDynMaster(data);
  }


  getMemberId = (id) => {
    var obj = {
      'mem_id': id
    }
    fetch(APIURL + "getMemberById", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json())
      .then(responseJson => {
        console.log("membersList", responseJson.data);
        this.setState({ memberFormData: responseJson.data }, () => this.setFormValues());
      });
  }

  setFormValues = () => {
    var items = this.state.items;
    // objkey.user_Designation = this.state.memberFormData[0].mem_Designation
    objkey.user_CountryCode = this.state.memberFormData[0] && this.state.memberFormData[0].mem_CountryCode ? this.state.memberFormData[0].mem_CountryCode : "91"
    objkey.user_MobileNumber = this.state.memberFormData[0] ? this.state.memberFormData[0].mem_MobileNo : ""
    objkey.user_HospitalName = this.state.memberFormData[0] ? this.state.memberFormData[0].ins_Name : "null"
    objkey.user_Email = this.state.memberFormData[0] ? this.state.memberFormData[0].mem_Email : ""
    objkey.user_Address = this.state.memberFormData[0] ? this.state.memberFormData[0].ins_Address : ""
    objkey.user_roleId = "2"


    // objkey.user_Designation === "" || objkey.user_Designation === null ? validataions.user_Designation = "Field Required" : false
    // objkey.user_CountryCode === "" || objkey.user_CountryCode === null ? validataions.user_CountryCode = "Field Required" : false
    // objkey.user_MobileNumber === "" || objkey.user_MobileNumber === null ? validataions.user_MobileNumber = "Field Required" : false
    // objkey.user_HospitalName === "" || objkey.user_HospitalName === null ? validataions.user_HospitalName = "Field Required" : false
    // objkey.user_Email === "" || objkey.user_Email === null ? validataions.user_Email = "Field Required" : false
    // objkey.user_Address === "" || objkey.user_Email === null ? validataions.user_Email = "Field Required" : false

    this.state.validataions.user_Designation = objkey.user_Designation === "" || objkey.user_Designation === null ? "Field Required" : false
    this.state.validataions.user_CountryCode = objkey.user_CountryCode === "" || objkey.user_CountryCode === null ? "Field Required" : false
    this.state.validataions.user_MobileNumber = objkey.user_MobileNumber === "" || objkey.user_MobileNumber === null ? "Field Required" : false
    this.state.validataions.user_HospitalName = objkey.user_HospitalName === "" || objkey.user_HospitalName === null ? "Field Required" : false
    this.state.validataions.user_Email = objkey.user_Email === "" || objkey.user_Email === null ? "Field Required" : false
    this.state.validataions.user_Address = objkey.user_Address === "" || objkey.user_Address === null ? "Field Required" : false
    this.state.validataions.user_Name = objkey.user_Name === "" || objkey.user_Name === null ? "Field Required" : false
    // this.state.validataions.user_password = objkey.user_password === "" || objkey.user_password === null ? "Field Required" : false
    this.state.validataions.user_password = false
    this.state.validataions.user_roleId = objkey.user_roleId === "" || objkey.user_roleId === null ? "Field Required" : false


    this.setState({ items })
  }



  render() {
    console.log(this.state, "fsdfasdfasdf")
    return (
      <div>
        <card>

          <div style={{ textAlign: "left" }}>
            <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen} style={{
              margin: 13, backgroundColor: "#677c8c"
            }}>
              <AddIcon />
            </Fab>

          </div>
          <CustomizedSnackbars vertical="top" horizontal="right" custommsg={this.state.message} variant="success" openState={this.state.snackbarstate} snackbarCallback={this.closeSnackBar} />


          <EnhancedTable custommsg={this.state.msg} unselectData={this.state.unselectData} primaryKey={primary_key} tableTitel={this.state.title} tblDtatas={tableSchema.fields} tblDataValues={this.state.tblValues} editOpen={this.handleClickEditOpen} DeleteData={this.deleteDynMaster} />

          <CardContent>
            <Typography variant="h5" component="h2">
            </Typography>
          </CardContent>
        </card>

        <Dialog
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth={true}
          maxWidth="md"
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd", color: "white" }}>Add {this.state.title}</DialogTitle>

          <DialogContent>
            <div classNmae="form-group">

              {this.state.items.length > 0 &&
                <DynForms getMemberId={(id) => this.getMemberId(id)} primaryKey={primary_key} clearData={clearData} validataions={this.state.validataions} handleClose={this.handleClose} keys={objkey} formData={this.state.items} onSubmit={this.onSubmit} />
              }

            </div>

          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>

        <Dialog
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
          open={this.state.handleEditOpen}
          onClose={this.handleEditClose}
          fullWidth={true}
          maxWidth="sm"
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd", color: "white" }}>Edit{this.state.title}</DialogTitle>

          <DialogContent>
            <div classNmae="form-group">

              {this.state.items.length > 0 &&
                <DynForms editcontent={this.state.editcontent} hideField={"user_password"} primaryKey={primary_key} clearData={clearData} validataions={this.state.validataions} handleClose={this.handleClose} keys={objkey} formData={this.state.items} onSubmit={this.editonSubmit} />
              }

            </div>

          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>


      </div>
    );


  }



}

export default UserMaster;


