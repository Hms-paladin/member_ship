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
import dateFormat from 'dateformat';
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
import EnhancedNewsTable from "../components/newsTable";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ValidationLibrary from "../helpers/validation/validationfunction";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../helpers/snackbar';
import ImagesUpload from "../components/fileUpload";
import CloudUpload from '@material-ui/icons/CloudUpload';
import MaterialUIPickers from "../components/datePicker";
import { message } from 'antd';
import DragandDropImage from './DragandDropImage';
// import DropNCrop from '@synapsestudios/react-drop-n-crop';

// import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
//generate a dynamic dropDown schema.................



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

function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}
function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}




var keys = ['news_Id', 'news_Title', 'news_Description', 'news_PublishedDate', 'news_ImagePath', 'news_icon'];
class News extends Component {
  constructor(props) {
    console.log("props", props)
    super(props);

    this.state = {
      checkDate:false,
      title: "News",
      value: 0,
      gallerTitle: [],
      validations: {
        'news_Title': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        'news_Description': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        // 'news_PublishedDate':{validations:[ {name:"",params:''}],msg:'',status:''},
        'news_ImagePath': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        'news_icon': { validations: [{ name: "required", params: '' }], msg: '', status: '' }
      },

      data: {
        "news_Id": "",
        "news_Title": "",
        "news_Description": "",
        "news_PublishedDate": "",
        "news_ImagePath": "",
        "news_icon": "",
        'IconFile': [],
        'ImageFile': [],
      },

      news_Title: '',
      news_Description: '',
      news_PublishedDate: '',
      news_ImagePath: '',
      news_icon: '',
      errorStatus: true,
      item: [],
      editItem: [],
      editOpen: false,
      snackbarstate: false,
      message: '',
      selectedFile: null,
      viewsOpen: false,
      addViewClose: false,
      IconOpen: false
    };

  }


  handleClickOpen = () => {
    var validations = this.state.validations;
    var data = this.state.data;
    data.ImageFile = [];
    data.IconFile = [];


    for (var i in keys) {
      data[keys[i]] = ""
      if (validations[keys[i]] != undefined) {
        validations[keys[i]].status = null;
      }
    }
    if(this.state.editOpen === false){
      data.news_PublishedDate=null
    }
    this.setState({ validations, data });
    this.checkPendingValidations();
    this.setState({ open: true, editOpen: false });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ editOpen: false });
    this.setState({ viewOpen: false });
  };

  editOpen = (data) => {
    this.setState({checkDate:true})
    console.log(data)
    console.log("imagepathurl", this.state.tblValues[0].ImagePathUrl);
    var data1 = this.state.data;
    data1 = data;
    //data1.news_PublishedDate=new Date(Number(data.news_PublishedDate));

    if (data1.news_PublishedDate != null && data1.news_PublishedDate.length > 4) {
      // alert("true")
      data1.news_PublishedDate = new Date(data.news_PublishedDate);
    } else {
      // alert(JSON.stringify(data1.news_PublishedDate))
      // alert("false")
      data1.news_PublishedDate = null;
    }


    data.ImageFile = []
    data.IconFile = []
    var ImagePathUrl = this.state.tblValues[0].ImagePathUrl
    data.news_ImagePath = data.news_ImagePath.replace(`${ImagePathUrl}`, "")
    data.news_icon = data.news_icon.replace(`${ImagePathUrl}`, "")
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

  closeSnackBar = () => {
    this.setState({ snackbarstate: false })
  }
  viewsOpen = () => {

    this.setState({ viewOpen: true });

  }
  addViewClose = () => {
    this.setState({ viewOpen: false });

  }
  iconClick = () => {
    this.setState({ IconOpen: true })
  }
  addIconClose = () => {
    this.setState({ IconOpen: false });
  }

  componentDidMount() {
    this.loadTableData();
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
    console.log("key", key);
    if (key == 'news_ImagePath' || key == 'news_icon') {
      var fileUpload = document.getElementById("fileUpload");
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
      if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (fileUpload.files) != "undefined") {
          var reader = new FileReader();
          reader.readAsDataURL(fileUpload.files[0]);
          reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            //  image.onload = function () {
            //       var height = this.height;
            //       var width = this.width;
            //       console.log("height",height);
            //       if (height > 500 || width > 500) {
            //         alert("Height and Width must not exceed 500px")
            //           return false;
            //       }else{
            //       alert("Uploaded image has valid Height and Width")
            //       return true;
            //     }
            //   };

          }
        }
      }
    }
    var data = this.state.data;
    if (key == 'news_icon' || key == 'news_ImagePath') {

      if (key == 'news_icon') {
        data.IconFile = value.files[0];
      }

      if (key == 'news_ImagePath') {
        data.ImageFile = value.files[0];
      }

      console.log(value.files[0])

      // if(value.files[0] !=undefined && value.files[0].size > 12500000){
      //   alert("Please upload image less than 2 MB");
      //   return
      // }
      // else if( value.files[0] !=undefined) {

      //   var extensionArray = ['mp4'];
      //   var imageExtension = value.files[0].name.split('.')[1];
      //   var isCheck = extensionArray.includes(imageExtension);

      //   if(!isCheck){
      //     alert("Please upload .mp4 Video only");
      //     return
      //   }

      // }

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
    data[key] = value;
    this.setState({ data });
    this.checkPendingValidations();
  }

  loadTableData = () => {

    fetch(APIURL + "getNewsWeb", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("tblValues", responseJson);

        this.setState({ tblValues: responseJson.data });
      });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.fileUploadHandler();
  }

  fileUploadHandler = () => {

    if (isArray(this.state.data.IconFile) && isArray(this.state.data.ImageFile)) {
      this.onSubmitData();
    } else {
      const fd = new FormData();
      if (!isArray(this.state.data.IconFile)) {

        fd.append("image", this.state.data.IconFile);
      }

      if (!isArray(this.state.data.ImageFile)) {

        fd.append("image", this.state.data.ImageFile);
      }
      axios.post(APIURL + "uploadfile", fd, {
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
    var userid = localStorage['userobj'] ? JSON.parse(localStorage['userobj']).user_Id : ''
    //console.log("imagepath",this.state.news_ImagePath);
    var mydate;
    if (this.state.editOpen === false) {
      mydate = null
    }

    if (this.state.editOpen === false && this.state.data.news_PublishedDate != null) {
      // alert("MyData")
      // alert(JSON.stringify(this.state.data.news_PublishedDate))
      mydate = dateFormat(this.state.data.news_PublishedDate, "yyyy-mm-dd")
    }


    if (this.state.editOpen === true) {
      mydate = null;
    }

    if (this.state.editOpen === true && this.state.data.news_PublishedDate != null) {
      // alert("edit true date")
      // alert(this.state.data.news_PublishedDate)
      mydate = dateFormat(this.state.data.news_PublishedDate, 'yyyy-mm-dd')

    }

    var obj = {
      newsid: this.state.data.news_Id,
      title: this.state.data.news_Title,
      description: this.state.data.news_Description,
      date: mydate,
      imgPath: this.state.data.news_ImagePath,
      imgIcon: this.state.data.news_icon,
      userId: userid,
    }
    console.log("nextobj", obj)
    if (this.state.editOpen == false) {

      fetch(APIURL + 'addNews', {
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
    } else {
      fetch(APIURL + 'updateNews', {
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
    var obj = { newsid: data.news_Id };
    fetch(APIURL + 'deleteNews', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ snackbarstate: true });
        this.setState({ message: "Record Deleted Successfully" })
        this.setState({ deleteValues: responseJson });
        this.setState({ unselectData: true });

        this.loadTableData();

      })
  }

  render() {

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
        <EnhancedNewsTable
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
                      label="Title"
                      value={this.state.data.news_Title}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'news_Title')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Description"
                      value={this.state.data.news_Description}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'news_Description')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <MaterialUIPickers
                      dateAlias={'Date'}
                      value={this.state.data.news_PublishedDate}
                      keyDate={'news_PublishedDate'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)} 
                      clear
                      />

                  </Grid>

                  <Grid item xs={4} md={4}>

                    <input type="file" ref={(ref) => this.NewaIcon = ref} style={{ display: 'none' }} onChange={(e) => this.onChangeData(e.target, 'news_icon')} />
                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                      <CloudUpload style={{ 'margin-bottom': '12px', 'margin-right': '10px' }} />
                      <TextField
                        label="News Icon"
                        value={this.state.data.news_icon}
                        className="form-input"
                        onClick={(e) => this.NewaIcon.click()}
                        type="text"
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </div>
                    {/* <label style={{color:'red',marginLeft:'10%'}}>Image upload Max Size 500px</label> */}

                  </Grid>

                  <Grid item xs={4} md={4}>

                    <input type="file" id="fileUpload" ref={(ref) => this.NewsImage = ref} style={{ display: 'none' }} onChange={(e) => this.onChangeData(e.target, 'news_ImagePath')} />
                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                      <CloudUpload style={{ 'margin-bottom': '12px', 'margin-right': '10px' }} />
                      <TextField
                        label="News Image"
                        value={this.state.data.news_ImagePath}
                        className="form-input"
                        onClick={(e) => this.NewsImage.click()}
                        type="text"
                        margin="normal"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </div>

                    {/* <label style={{color:'red',marginLeft:'10%'}}>Image upload Max Size 500px</label> */}
                  </Grid>




                </Grid>

                <Button disabled={this.state.errorStatus} type="submit" color="primary" style={{ marginRight: 10 }} variant="contained">
                  {
                    this.state.editOpen ? "Update" : "Submit"
                  }
                </Button>
                <Button variant="contained" onClick={this.handleClose} color="secondary">
                  Cancel
      </Button>


              </div>

            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default News;