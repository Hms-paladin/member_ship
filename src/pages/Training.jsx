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
import EnhancedTrainingTable from "../components/trainingTable";
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

import VideoThumbnail from 'react-video-thumbnail'; // use npm published version

import { Upload, Icon, message } from 'antd';

import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import pdf_alt from '../images/pdf_alt.png';




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





const keys = ['trn_Id', 'trn_Name', 'trn_Description', 'trn_FromDate', 'trn_ToDate', 'trn_StartTime', 'trn_EndTime', 'trn_Location', 'trn_Url', 'trn_CityId', 'trn_ImagePath']

class Training extends Component {
  constructor(props) {
    console.log("props", props)
    super(props);

    this.state = {
      City: [],
      title: "Training",
      value: 0,
      gallerTitle: [],
      validations: {
        'trn_Name': { validations: [{ name: "", params: '' }], msg: '', status: '' },
        'trn_Description': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        // 'trn_Url': { validations: [{ name: "required", params: '' }, { name: 'webUrlAccept' }], msg: '', status: '' },
        // 'trn_CityId': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
      },

      data: {
        'trn_Id': '',
        'trn_Name': '',
        'trn_Description': '',
        'trn_FromDate': '',
        'trn_ToDate': '',
        'trn_StartTime': '',
        'trn_EndTime': '',
        'trn_Location': '',
        'trn_Url': '',
        'trn_CityId': '',
        'trn_Document': '',
        'trn_ImagePath': '',
      },

      fileList: [],
      docList: [],

      trainingname: '',
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
      addViewClose: false,
      imageData: []

    };

  }

  handleChangeImage = info => {
    console.log("info", info);

    if (info.file.status === 'uploading') {
      this.setState({ imageUrl: false });
      this.setState({ loading: true });
      this.setState({ fileList: info });
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

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // message.error('You can only upload JPG/PNG file!');
      alert("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      // message.error('Image must smaller than 3MB!');
      alert("Image must smaller than 3MB!")
    }
    return isJpgOrPng && isLt2M;
  }

  beforeUploadDocument = (file) => {
    const isJpgOrPng = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/pdf';
    if (!isJpgOrPng) {
      // message.error('You can only upload docx/pdf file!');
      alert("You can only upload docx/pdf file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      // message.error('Image must smaller than 3MB!');
      alert("Document must smaller than 3MB!")
    }
    return isJpgOrPng && isLt2M;
  }


  handleChangeDoc = info => {
    console.log("info", info);

    if (info.file.status === 'uploading') {
      this.setState({ docFile: false });
      this.setState({ loading_doc: true });
      this.setState({ docList: info });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

      this.setState({ message: "Document File Updated" })
      this.state.editOpen && this.setState({ snackbarstate: true });


      this.getBase64(info.file.originFileObj, docFile =>
        this.setState({
          docFile,
          loading_doc: false,
        }),
      );
    }
    this.setState({ snackbarstate: false });
  };


  handleClickOpen = () => {
    this.setState({ imageUrl: false, docFile: false })
    var validations = this.state.validations;
    var data = this.state.data;
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
    this.state.fileList = [];
    this.state.docList = []
  };

  editOpen = (data) => {
    console.log(data.trn_Document)

    var data1 = this.state.data;
    var initialdate = `${"2010-10-01"}` + ` ${data.trn_StartTime}`;
    console.log(new Date(initialdate));
    data1 = data;
    // alert(JSON.stringify(data1.trn_FromDate))

    // if (data1.trn_FromDate != null && data1.trn_FromDate.length > 4) {
    //   data1.trn_FromDate = dateFormat(data.trn_FromDate, 'yyyy-mm-dd');
    //   data1.trn_ToDate = dateFormat(data.trn_ToDate, 'yyyy-mm-dd')
    // } else {
    //   data1.trn_FromDate = null;
    //   data1.trn_ToDate = null;

    // }

    if (data1.trn_Location === "null" || null) {
      data1.trn_Location = null
    }

    console.log(data1.trn_StartTime, "starttime")

    if (data1.trn_StartTime != null && data1.trn_StartTime.length > 4) {
      data1.trn_StartTime = new Date(`${"2010/10/01"}` + ` ${data.trn_StartTime}`);
      data1.trn_EndTime = new Date(`${"2010/10/01"}` + ` ${data.trn_EndTime}`);
      data1.trnStartTime = data1.trn_StartTime.toISOString();
      data1.trn_EndTime = data1.trn_EndTime.toISOString();
    } else {
      data1.trn_StartTime = null;
      data1.trn_EndTime = null;
    }

    console.log(data1.trn_StartTime);
    data.fileList = []
    console.log(data.trn_Document, data.trn_ImagePath)
    this.setState({ imageUrl: data.trn_ImagePath, docFile: data.trn_Document })
    this.setState({ editOpen: true, open: true, data: data1 });

    this.setState({})

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
    if (key == 'trn_ImagePath') {
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

    fetch(APIURL + "trainingList", {
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
    this.onSubmitData();
  }


  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };



  onSubmitData = () => {

    var formData = new FormData();
    // alert(JSON.stringify(this.state.fileList.length))
    for (var i in this.state.fileList) {
      console.log(this.state.fileList[i].originFileObj)
      formData.append('imageArray', this.state.fileList[i].originFileObj);

    }
    for (var i in this.state.docList) {
      console.log(this.state.docList[i].originFileObj)
      formData.append('imageDocument', this.state.docList[i].originFileObj);

    }

    if (this.state.editOpen === false) {
      var fromdate = null
      var todate = null
      var location = null;
      formData.set("fromdate", fromdate);
      formData.set("todate", todate);
      formData.set("location", location);
    }

    if (this.state.editOpen === false && typeof this.state.data.trn_FromDate === "object") {
      // alert("obj")
      var fromdate = dateFormat(this.state.data.trn_FromDate, 'yyyy-mm-dd')
      var todate = dateFormat(this.state.data.trn_ToDate, 'yyyy-mm-dd')
      formData.set("fromdate", fromdate);
      formData.set("todate", todate);
    }

    if (this.state.editOpen === false && this.state.data.trn_Location != null) {
      formData.set("location", this.state.data.trn_Location);
    }


    if (this.state.editOpen === true) {
      var fromdate = null;
      var todate = null;
      var location = null;
      formData.set("fromdate", fromdate);
      formData.set("todate", todate);
      formData.set("location", location);
    }

    if (this.state.editOpen === true && this.state.data.trn_FromDate != "null" && this.state.data.trn_FromDate != null) {
      // alert("edit true date")
      // alert(JSON.stringify(this.state.data.trn_FromDate))
      var fromdate = dateFormat(this.state.data.trn_FromDate, 'yyyy-mm-dd')
      var todate = dateFormat(this.state.data.trn_ToDate, 'yyyy-mm-dd')
      formData.set("fromdate", fromdate);
      formData.set("todate", todate);
    }
    if (this.state.editOpen === true && this.state.data.trn_Location != "null") {
      formData.set("location", this.state.data.trn_Location);
    }

    if (this.state.editOpen === false) {
      var starttime = null
      var endtime = null
      formData.set("starttime", starttime);
      formData.set("endtime", endtime);
    }

    if (this.state.editOpen === false && typeof this.state.data.trn_StartTime === "object") {
      // alert("obj")
      var starttime = dateFormat(this.state.data.trn_StartTime, 'hh:MM TT')
      var endtime = dateFormat(this.state.data.trn_ToDate, 'hh:MM TT')
      formData.set("starttime", starttime);
      formData.set("endtime", endtime);
    }


    if (this.state.editOpen === true) {
      var starttime = null
      var endtime = null
      formData.set("starttime", starttime);
      formData.set("endtime", endtime);
    }

    // alert(JSON.stringify(this.state.data.trn_StartTime))

    if (this.state.editOpen === true && typeof this.state.data.trn_StartTime === 'object' && this.state.data.trn_StartTime != null) {
      // alert("set Date")
      var starttime = dateFormat(this.state.data.trn_StartTime, 'hh:MM TT')
      var endtime = dateFormat(this.state.data.trn_EndTime, 'hh:MM TT')
      formData.set("starttime", starttime);
      formData.set("endtime", endtime);
    }



    // if (this.state.data.trn_StartTime === null || "null") {
    //   var fromtime = null
    //   var totime = null
    //   formData.set("fromtime", fromtime);
    //   formData.set("totime", totime);
    // } else {
    //   var fromtime = dateFormat(this.state.data.trn_StartTime, 'hh:MM TT')
    //   var totime = dateFormat(this.state.data.trn_EndTime, 'hh:MM TT')
    // }

    formData.set("trainingId", this.state.data.trn_Id);
    formData.set("trainingname", this.state.data.trn_Name);
    formData.set("description", this.state.data.trn_Description);
    // formData.set("starttime", trn_EndTime);
    // formData.set("endtime", trn_EndTime);
    formData.set("cityid", this.state.data.trn_CityId);
    formData.set("location", this.state.data.trn_Location);
    formData.set("fileurl", this.state.data.trn_Url);

    if (this.state.editOpen == false) {
      fetch(APIURL + 'addtraining', {
        method: 'POST',
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("responseInsert", responseJson);
          this.setState({ item: responseJson })
          this.loadTableData();
          this.setState({ message: "Record Added Successfully" })
          this.setState({ snackbarstate: true });
          this.setState({ open: false });

        })
    } else {
      console.log("formData", formData)
      fetch(APIURL + 'updateTrainingList', {
        method: 'POST',
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("responseInsert", responseJson);
          this.setState({ item: responseJson })
          this.loadTableData();
          this.setState({ message: "Updated successfully" })
          this.setState({ snackbarstate: true });
          this.setState({ open: false, editOpen: false });

        })
    }

  }


  deleteDynMaster = (data) => {
    var obj = { trainingId: data.trn_Id };
    fetch(APIURL + 'deleteTrainingList', {
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const uploadButtonDoc = (
      <div>
        <Icon type={this.state.loading_doc ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    console.log("editDetails", this.state.docFile);
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
        <EnhancedTrainingTable
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
                      error={this.state.validations.trn_Name.status}
                      helperText={this.state.validations.trn_Name.msg}
                      label="Name"
                      value={this.state.data.trn_Name}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'trn_Name')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>

                    <MaterialUIPickers
                      dateAlias={'From Date'}
                      value={this.state.data.trn_FromDate}
                      keyDate={'trn_FromDate'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />

                  </Grid>
                  <Grid item xs={4} md={4}>

                    <MaterialUIPickers
                      dateAlias={'To Date'}
                      value={this.state.data.trn_ToDate}
                      keyDate={'trn_ToDate'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>

                    <MaterialUITimePickers
                      value={this.state.data.trn_StartTime}
                      keyDate={'trn_StartTime'}
                      dateAlias={'Start Time'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />

                  </Grid>
                  <Grid item xs={4} md={4}>

                    <MaterialUITimePickers
                      value={this.state.data.trn_EndTime}
                      keyDate={'trn_EndTime'}
                      dateAlias={'End Time'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)}
                      clear
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Location"
                      value={this.state.data.trn_Location}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'trn_Location')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <TextField
                      // error={this.state.validations.trn_Url.status}
                      // helperText={this.state.validations.trn_Url.msg}
                      label="Training Url"
                      value={this.state.data.trn_Url}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'trn_Url')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <FormControl className="form-input" style={{ marginTop: 15 }} >
                      <InputLabel>City</InputLabel>
                      <Select
                        className="form-input"
                        value={this.state.data.trn_CityId}
                        onOpen={this.handleOpen}
                        // onClose={this.handleClose}
                        onChange={(e) => this.onChangeData(e.target, 'trn_CityId')}
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

                  <Grid item xs={4} md={4} />

                  <Grid item xs={4} md={8}>
                    <label>Description</label>
                    <TextareaAutosize
                      error={this.state.validations.trn_Description.status}
                      helperText={this.state.validations.trn_Description.msg}
                      label="Description"
                      value={this.state.data.trn_Description}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'trn_Description')}
                      type="text"
                      margin="normal"
                      rowsMin={3}
                      rowsMax={7}
                    />
                  </Grid>

                  <Grid item xs={2} md={2} />

                  <Grid item xs={4} md={4}>
                    <div className="upload_space">Upload Image</div>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      showUploadList={false}
                      //         headers={{
                      //           authorization: 'authorization-text',
                      //           Host: 'localhost:8000',
                      //           Origin: 'http://localhost:8000'
                      // }}
                      headers={{
                        authorization: 'authorization-text',
                      }}
                      // action="http://18.213.120.48/ahpi/"

                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChangeImage}
                    >
                      {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <div className="upload_space">Upload Document</div>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      showUploadList={false}
                      headers={{
                        authorization: 'authorization-text',
                      }}
                      // action="http://18.213.120.48/ahpi/"
                      beforeUpload={this.beforeUploadDocument}
                      onChange={this.handleChangeDoc}
                    >
                      {this.state.docFile ? <img src={pdf_alt} alt={''} style={{ width: '100%' }} /> : uploadButtonDoc}

                    </Upload>

                  </Grid>


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

      </div >
    )
  }
}
export default Training;