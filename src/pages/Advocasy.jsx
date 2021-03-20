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
import EnhancedAdvocasyTable from "../components/advocasyTable";
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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


import { Upload, Icon, message } from 'antd';

import dateFormat from 'dateformat';
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





const keys = ['adv_Id', 'adv_Title', 'adv_content', 'adv_Link', 'adv_Photo']

class Advocasy extends Component {
  constructor(props) {
    console.log("props", props)
    super(props);

    this.state = {
      title: "Advocacy",
      value: 0,
      validations: {
        'adv_Title': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        'adv_content': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        // 'adv_Document':{validations:[ {name:"required",params:''}],msg:'',status:''},
        // 'adv_Link': { validations: [{ name: 'webUrl' }], msg: '', status: '' },
        // 'adv_Photo':{validations:[ {name:"required",params:''}],msg:'',status:''},
      },
      data: {
        'adv_Id': '',
        'adv_Title': '',
        'adv_content': '',
        'adv_Document': '',
        'adv_Link': '',
        'adv_Photo': '',
      },
      fileList: [],
      docList: [],


      advName: '',
      advTitle: '',
      advContent: '',
      advDocument: '',
      advLink: '',
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
  };

  editOpen = (data) => {
    console.log("myData", data)
    var data1 = this.state.data;
    data1 = data;
    data.fileList = []
    this.setState({ imageUrl: data.adv_Photo, docFile: data.adv_Document })
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
    if (key == 'adv_Photo') {
      var data = this.state.data;
      data.fileList = value.files[0];

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



  loadTableData = () => {
    fetch(APIURL + "getAdvocacy", {
      method: "POST",
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
    //  this.fileUploadHandler();
  }

  fileUploadHandler = () => {
    if (this.state.data.imageData.length <= 0) {
      this.onSubmitData();
    } else {


      const fd = new FormData();
      console.log("imageArray", this.state.data.imageData);
      fd.append("imageArray", this.state.data.imageData);
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




  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };



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

  onSubmitData = (e) => {
    console.log(this.state.fileList);
    var formData = new FormData();
    for (var i in this.state.fileList) {
      formData.append('imageArray', this.state.fileList[i].originFileObj);

    }
    for (var i in this.state.docList) {
      formData.append('imageDocument', this.state.docList[i].originFileObj);

    }
    formData.set("adv_Id", this.state.data.adv_Id);
    formData.set("title", this.state.data.adv_Title);
    formData.set("content", this.state.data.adv_content);
    formData.set("link", this.state.data.adv_Link);


    console.log("formData", formData)
    if (this.state.editOpen == false) {
      fetch(APIURL + 'addAdvocacy', {
        method: 'POST',
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("responseInsert", responseJson);
          this.setState({ item: responseJson })
          this.loadTableData();
          this.setState({ message: "Added Successfully" })
          this.setState({ snackbarstate: true });
          this.setState({ open: false });

        })
    } else {
      console.log("formData", formData)
      fetch(APIURL + 'updateAdvocacy', {
        method: 'POST',
        body: formData,
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("responseInsert", responseJson);
          this.setState({ item: responseJson })
          this.loadTableData();
          this.setState({ message: "Record Updated successfully" })
          this.setState({ snackbarstate: true });
          this.setState({ open: false, editOpen: false });

        })
    }


  }

  // onSubmitData = () => {
  //  var obj={
  //    adv_Id:this.state.data.adv_Id,
  //    title :this.state.data.adv_Title,
  //    content :this.state.data.adv_content,
  //    link :this.state.data.adv_Link,
  //    imageArray :this.state.data.adv_Photo,
  //    imageDocument: "adv_Document_32_pdf.pdf",
  //  }

  //  console.log("nextobj",obj)
  //  if(this.state.editOpen==false){

  //    fetch(APIURL+'addAdvocacy', {
  //      method: 'POST',
  //      headers: {
  //        Accept: 'application/json',
  //        'Content-Type': 'application/json',
  //      },
  //      body: JSON.stringify(obj),
  //    }).then((response) => response.json())
  //    .then((responseJson) => {
  //      console.log("responseInsert",responseJson);
  //      this.loadTableData();
  //      this.setState({message:"Record Added successfully"})
  //      this.setState({ snackbarstate: true });
  //      this.setState({ open: false,editOpen:false });

  //    })
  //  }

  // else{
  //  console.log('obj',obj);
  //    fetch(APIURL+'updateAdvocacy', {
  //      method: 'POST',
  //      headers: {
  //        Accept: 'application/json',
  //        'Content-Type': 'application/json',
  //      },
  //      body: JSON.stringify(obj),
  //    }).then((response) => response.json())
  //    .then((responseJson) => {
  //      console.log("responseInsert",responseJson);
  //      this.loadTableData();
  //      this.setState({message:"Record Updated successfully"})
  //      this.setState({ snackbarstate: true });
  //      this.setState({ open: false,editOpen:false });

  //    })
  //  }
  // }


  deleteDynMaster = (data) => {
    var obj = { adv_Id: data.adv_Id };
    fetch(APIURL + 'deleteAdvocacy', {
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

    console.log("editDetails", this.state.editDetails);
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
        <EnhancedAdvocasyTable
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
                      error={this.state.validations.adv_Title.status}
                      helperText={this.state.validations.adv_Title.msg}
                      label="Title"
                      value={this.state.data.adv_Title}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'adv_Title')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <TextField
                      // error={this.state.validations.adv_Link.status}
                      // helperText={this.state.validations.adv_Link.msg}
                      label="Advocacy Link"
                      value={this.state.data.adv_Link}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'adv_Link')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} md={4} />

                  <Grid item xs={4} md={4}>
                    <div className="upload_space">Upload Image</div>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      showUploadList={false}
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      onChange={this.handleChangeDoc}
                    >
                      {this.state.docFile ? <img src={this.state.docFile} alt={"Document"} style={{ width: '100%' }} /> : uploadButtonDoc}
                    </Upload>

                  </Grid>

                  <Grid item xs={4} md={8}>
                    <label>Content</label>
                    <TextareaAutosize
                      error={this.state.validations.adv_content.status}
                      helperText={this.state.validations.adv_content.msg}
                      label="Content"
                      value={this.state.data.adv_content}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target, 'adv_content')}
                      type="text"
                      margin="normal"
                      rowsMin={3}
                      rowsMax={8}
                    />
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

      </div>
    )
  }
}
export default Advocasy;