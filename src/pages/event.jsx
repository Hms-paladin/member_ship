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
import EnhancedEventTable from "../components/eventTable";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ValidationLibrary from "../helpers/validation/validationfunction";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../helpers/snackbar';
import ImagesUpload from "../components/fileUpload";
import CloudUpload from '@material-ui/icons/CloudUpload';
import MaterialUITimePickers from "../components/TimePicker";
import MaterialUIPickers from "../components/datePicker";
import dateFormat from 'dateformat';

import TextareaAutosize from '@material-ui/core/TextareaAutosize'



//generate a dynamic dropDown schema.................
var mydata = {
  fields: [{
    name: 'City',  // state Name
    foreign_tbl: "mas_city",
    foreign_fields: [{ name: 'city_Id', alias: 'value', alias1: 'city_Id' }, { name: 'city_Name', alias: 'value1', alias1: 'name' }]
  }
  ]
};



const APIURL = apiurl;

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





const keys = ['eve_Id', 'eve_Name', 'eve_Description', 'eve_FromDate', 'eve_ToDate', 'eve_StartTime', 'eve_EndTime', 'eve_Location', 'eve_Url', 'eve_CityId', 'eve_ImagePath']

class Event extends Component {
  constructor(props) {
    console.log("props", props)
    super(props);

    this.state = {
      City: [],
      title: "Event",
      value: 0,
      gallerTitle: [],
      validations: {
        'eve_Name': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        'eve_Description': { validations: [{ name: "", params: '' }], msg: '', status: '' },
        // 'eve_CityId': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        'eve_ImagePath': { validations: [{ name: "required", params: '' }], msg: '', status: '' }
      },

      data: {
        'eve_Id': '',
        'eve_Name': '',
        'eve_Description': '',
        'eve_FromDate': '',
        'eve_ToDate': '',
        'eve_StartTime': '',
        'eve_EndTime': '',
        'eve_Location': '',
        'eve_Url': '',
        'eve_CityId': '',
        'eve_ImagePath': '',
        'imageData': []
      },

      eventname: '',
      description: '',
      fromdate: '',
      todate: '',
      starttime: '',
      cityid: '',
      location: '',
      endtime: '',
      fileurl: '',
      imagepath: '',

      errorStatus: true,
      item: [],
      editItem: [],
      editOpen: false,
      snackbarstate: false,
      message: '',
      selectedFile: null,
      viewOpen: false,
      addViewClose: false

    };

  }

  componentWillMount = () => {

  }
  handleClickOpen = () => {
    var validations = this.state.validations;
    var data = this.state.data;
    data.imageData = []



    for (var i in keys) {
      data[keys[i]] = ""
      if (validations[keys[i]] != undefined) {
        validations[keys[i]].status = null;
      }
    }
    this.setState({ validations, data });
    this.checkPendingValidations();
    this.setState({ open: true, editOpen: false });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ editOpen: false });
  };

  editOpen = (data) => {
    console.log(data)
    var data1 = this.state.data;

    // var initialdate = `${"2010-10-01"}`+` ${data.eve_StartTime}`;
    // console.log(new Date(initialdate));
    data1 = data;


    if (data.eve_StartTime === null || data.eve_StartTime.length <= 3) {
      data1.eve_StartTime = null;
      data1.eve_EndTime = null;
    }


    if (data.eve_StartTime != null && data.eve_StartTime.length > 4) {
      data1.eve_StartTime = new Date(`${"2010/10/01"}` + ` ${data.eve_StartTime}`);
      data1.eve_EndTime = new Date(`${"2010/10/01"}` + ` ${data.eve_EndTime}`);
      data1.eve_StartTime = data1.eve_StartTime.toISOString();
      data1.eve_EndTime = data1.eve_EndTime.toISOString();
    }
    if (data1.eve_Url === "null" || null) {
      data1.eve_Url = null
    }

    if(data1.eve_Location === "null" || null){
      data1.eve_Location=null
    }


    data.imageData = []
    this.setState({ editOpen: true, open: true, data: data1 });

    var validations = this.state.validations;
    for (var i in validations) {
      if (validations[i] != undefined) {
        validations[i].status = false;
        this.setState({ validations });
      }
    }
    this.setState({ unselectData: true });
    console.log(this.state)
    this.checkPendingValidations();

  }
  viewsOpen = () => {
    this.setState({ viewOpen: true });

  }
  addViewClose = () => {
    this.setState({ viewOpen: false });
  }

  closeSnackBar = () => {
    this.setState({ snackbarstate: false })
  }


  componentDidMount() {
    this.loadTableData();
    this.loadData();
  }



  checkPendingValidations() {
    var checkvalidationPending = Object.values(this.state.validations).filter(validation => validation.status === false);
    console.log(checkvalidationPending);
    if (checkvalidationPending.length != Object.keys(this.state.validations).length) {
      this.setState({ errorStatus: true });
    } else {
      this.setState({ errorStatus: false });
    }
  }
  onChangeData = (value, key) => {
    console.log("value", value);
    if (key == 'eve_ImagePath') {
      var data = this.state.data;
      data.imageData = value.files[0];

      console.log(value.files[0])

      this.setState({ data });
      value = value.files[0] == undefined ? "" : value.files[0].name;
    } else {
      value = value.value;
    }


    if (this.state.validations.hasOwnProperty(key) == true) {
      var responseData = ValidationLibrary.checkValidation(value, this.state.validations[key].validations);
      console.log('responseData', responseData);
      if (responseData.msg != "") {
        var validations = this.state.validations;
        validations[key].msg = responseData.msg;
        validations[key].status = true;
        this.setState({ validations });
        // this.setState()
      } else {
        var validations = this.state.validations;
        validations[key].msg = responseData.msg;
        validations[key].status = false;
        this.setState({ validations });
        console.log(validations)
      }
    }
    var data = this.state.data;
    data[key] = value;
    this.setState({ data });
    this.checkPendingValidations();
  }
  onChangeEdit = (value, key) => {  //..........e=value,key=coloumn name
    console.log(value)
    // this.setState({validations:value})
    // console.log(e.);
    if (this.state.validations.hasOwnProperty(key) == true) {
      var responseData = ValidationLibrary.checkValidation(value, this.state.validations[key].validations);
      console.log('responseData', responseData);
      if (responseData.msg != "") {
        var validations = this.state.validations;
        validations[key].msg = responseData.msg;
        validations[key].status = true;
        this.setState({ validations });
        // this.setState()
      } else {
        var validations = this.state.validations;
        validations[key].msg = responseData.msg;
        validations[key].status = false;
        this.setState({ validations });
        console.log(validations)
      }
    }
    var editDetails = this.state.editDetails;
    editDetails[key] = value; //.........key kula value assign panrom
    console.log("editDetails[key]", editDetails[key])
    this.setState({ editDetails });
    this.checkPendingValidations();

  }



  //   // clearFormValues=() =>{
  //   //   var self=this;

  //   //   this.setState({errorStatus:true});

  //   //   this.props.handleClose();
  //   // }
  loadData = () => {
    console.log('loading...');

    fetch(APIURL + 'dynamicDropdown', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mydata),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("response", responseJson);
        var responseData = responseJson;
        for (var i in responseData) {
          var statename = responseData[i].name;
          console.log(responseData[i].name);
          this.setState({ [statename]: responseData[i].dropdown })
          // console.log(responseData[i])
        }

      })

  }

  loadTableData = () => {

    fetch(APIURL + "eventList", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("tblValues", responseJson.data);

        this.setState({ tblValues: responseJson.data });
      });
  };


  onSubmit = (e) => {
    e.preventDefault();
    this.fileUploadHandler();
  }

  fileUploadHandler = () => {
    if (this.state.data.imageData.length <= 0) {
      this.onSubmitData();
    } else {


      const fd = new FormData();
      fd.append("image", this.state.data.imageData);
      console.log(fd);
      axios
        .post(APIURL + "uploadfile", fd, {
          onUploadProgress: progressEvent => {
            console.log(
              "upload progrees:" +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
            );
          }
        })

        .then(res => {
          if (res.data.statusCode == 1) {
            this.onSubmitData();
          }
        });
    }
  }


  onSubmitData = () => {
    var fromdate;
    var todate;
    var starttime;
    var endtime;

    if (this.state.editOpen === false) {
      fromdate = null
      todate = null
    }

    if (this.state.editOpen === false && typeof this.state.data.eve_FromDate === "object") {
      // alert("obj")
      fromdate = dateFormat(this.state.data.eve_FromDate, 'yyyy-mm-dd')
      todate = dateFormat(this.state.data.eve_ToDate, 'yyyy-mm-dd')
    }

    if (this.state.editOpen === true) {
      fromdate = null;
      todate = null;
    }

    if (this.state.editOpen === true && this.state.data.eve_FromDate != "null" && this.state.data.eve_FromDate != null) {
      // alert("edit true date")
      fromdate = dateFormat(this.state.data.eve_FromDate, 'yyyy-mm-dd')
      todate = dateFormat(this.state.data.eve_ToDate, 'yyyy-mm-dd')
    }

    if (this.state.editOpen === false) {
      starttime = null
      endtime = null
    }

    if (this.state.editOpen === false && typeof this.state.data.eve_StartTime === "object") {
      starttime = dateFormat(this.state.data.eve_StartTime, 'hh:MM TT')
      endtime = dateFormat(this.state.data.eve_ToDate, 'hh:MM TT')
    }


    if (this.state.editOpen === true) {
      starttime = null
      endtime = null
    }

    // alert(JSON.stringify(this.state.data.eve_StartTime))

    if (this.state.editOpen === true && this.state.data.eve_StartTime != "null" && this.state.data.eve_StartTime != null) {
      // alert("obj")
      starttime = dateFormat(this.state.data.eve_StartTime, 'hh:MM TT')
      endtime = dateFormat(this.state.data.eve_EndTime, 'hh:MM TT')
    }
    if (this.state.editOpen === true && this.state.data.eve_StartTime != "null" && this.state.data.eve_StartTime != null) {
      // alert("obj")
      starttime = dateFormat(this.state.data.eve_StartTime, 'hh:MM TT')
      endtime = dateFormat(this.state.data.eve_EndTime, 'hh:MM TT')
    }

    var imagepath = this.state.data.eve_ImagePath.split("/").pop();

    var obj = {
      eventId: this.state.data.eve_Id,
      eventname: this.state.data.eve_Name,
      description: this.state.data.eve_Description,
      fromdate: fromdate,
      todate: todate,
      starttime: starttime,
      endtime: endtime,
      cityid: this.state.data.eve_CityId,
      location: this.state.data.eve_Location,
      fileurl: this.state.data.eve_Url,
      imagepath: imagepath,
    }

    console.log("nextobj", obj)
    if (this.state.editOpen == false) {

      fetch(APIURL + 'addevents', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("responseInsert", responseJson);
          this.loadTableData();
          this.setState({ message: "Record Added successfully" })
          this.setState({ snackbarstate: true });
          this.setState({ open: false, editOpen: false });

        })
    }
    else {
      console.log('obj', obj);
      fetch(APIURL + 'updateEventsList', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("responseInsert", responseJson);
          this.loadTableData();
          this.setState({ message: "Record Updated successfully" })
          this.setState({ snackbarstate: true });
          this.setState({ open: false, editOpen: false });

        })
    }
  }


  deleteDynMaster = (data) => {
    var obj = { eventId: data.eve_Id };
    fetch(APIURL + 'deleteEventList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ message: "Record Deleted Successfully" })
        this.setState({ snackbarstate: true });
        this.setState({ deleteValues: responseJson });
        this.setState({ unselectData: true });

        this.loadTableData();

      })
  }


  render() {
    console.log("editDetails", this.state);
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
        </card>
        <CustomizedSnackbars vertical="top" horizontal="right" custommsg={this.state.message} variant="success" openState={this.state.snackbarstate} snackbarCallback={this.closeSnackBar} />
        <EnhancedEventTable
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
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd", color: "white" }}>{this.state.editOpen == true ? 'Edit' : 'Add'} {this.state.title}
          </DialogTitle>

          <DialogContent>
            <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }} >
              <div classNmae="form-group">
                <Grid container spacing={24}>

                  <Grid item xs={4} md={4}>
                    <TextField
                      error={this.state.validations.eve_Name.status}
                      helperText={this.state.validations.eve_Name.msg}
                      label="Name"
                      value={this.state.data.eve_Name}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'eve_Name')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>

                    <MaterialUIPickers
                      dateAlias={'From Date'}
                      value={this.state.data.eve_FromDate}
                      keyDate={'eve_FromDate'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />

                  </Grid>
                  <Grid item xs={4} md={4}>

                    <MaterialUIPickers
                      dateAlias={'To Date'}
                      value={this.state.data.eve_ToDate}
                      keyDate={'eve_ToDate'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />


                  </Grid>
                  <Grid item xs={4} md={4}>

                    <MaterialUITimePickers
                      value={this.state.data.eve_StartTime}
                      keyDate={'eve_StartTime'}
                      dateAlias={'Start Time'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />

                  </Grid>
                  <Grid item xs={4} md={4}>

                    <MaterialUITimePickers
                      value={this.state.data.eve_EndTime}
                      keyDate={'eve_EndTime'}
                      dateAlias={'End Time'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />

                  </Grid>

                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Location"
                      value={this.state.data.eve_Location}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'eve_Location')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Event Url"
                      value={this.state.data.eve_Url}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'eve_Url')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <FormControl className="form-input" style={{ marginTop: 15 }} >
                      <InputLabel>City</InputLabel>
                      <Select
                        className="form-input"
                        value={this.state.data.eve_CityId}
                        onOpen={this.handleOpen}
                        // onClose={this.handleClose}
                        onChange={(e) => this.onChangeData(e.target, 'eve_CityId')}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {this.state.City.map((obj, key) => {
                          return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
                        })}

                      </Select>

                    </FormControl>
                  </Grid>
                  <Grid>
                    <input type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={(e) => this.onChangeData(e.target, 'eve_ImagePath')} />
                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                      <CloudUpload style={{ 'margin-bottom': '12px', 'margin-right': '10px' }} />
                      <TextField
                        error={this.state.validations.eve_ImagePath.status}
                        helperText={this.state.validations.eve_ImagePath.msg}
                        label="Image"
                        value={this.state.data.eve_ImagePath}
                        className="form-input"
                        onClick={(e) => this.myInput.click()}
                        type="text"
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </div>

                  </Grid>
                  <Grid item xs={4} md={8}>
                    <label>Description</label>
                    <TextareaAutosize
                      error={this.state.validations.eve_Description.status}
                      helperText={this.state.validations.eve_Description.msg}
                      label="Description"
                      value={this.state.data.eve_Description}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'eve_Description')}
                      type="text"
                      margin="normal"
                      rowsMin={3}
                      rowsMax={7}
                    />
                  </Grid>
                  {/* <Grid item xs={4} md={4}>
        <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={this.fileSelectedHandler}
        />
        <label htmlFor="raised-button-file">
        <Button variant="raised" component="span">
        Upload
        </Button>
        </label> 
        </Grid>
      */}
                </Grid>
                <div style={{ marginTop: "10px" }}>

                  <Button disabled={this.state.errorStatus} type="submit" color="primary" style={{ marginRight: 10 }} variant="contained">
                    {
                      this.state.editOpen ? "Update" : "Submit"
                    }
                  </Button>
                  <Button variant="contained" onClick={this.handleClose} color="secondary">
                    Cancel
      </Button>
                </div>


              </div>

            </form>
          </DialogContent>
        </Dialog>

      </div>
    )
  }
}
export default Event;