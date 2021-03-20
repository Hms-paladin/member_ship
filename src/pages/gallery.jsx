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
import EnhancedGalleryTable from "../components/galleryTable";
import ImagesUpload from "../components/fileUpload";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ValidationLibrary from "../helpers/validation/validationfunction";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../helpers/snackbar';
import MaterialUIPickers from "../components/datePicker";
import CloudUpload from '@material-ui/icons/CloudUpload';


//generate a dynamic dropDown schema.................

const APIURL = apiurl;
// const uploadURL='http://localhost/MemberShipAPI/uploads/';

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

const keys = ['gal_Id', 'gal_Title', 'gal_Desc', 'gal_Name', 'gal_Date']
class Gallery extends Component {
  constructor(props) {
    console.log("props", props)
    super(props);

    this.state = {
      title: "Gallery",
      thumbnailReq: false,
      value: 0,
      gallerTitle: [],

      validations: {
        'gal_Title': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'gal_Desc': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'gal_Name': { validations: [{ name: "required", params: '' }], msg: '', status: '' },
        'gal_thumbnail': { validations: [{ name: '', params: '' }], msg: '', status: '' }, 'gal_Date': { validations: [{ name: "required", params: '' }], msg: '', status: '' }
      },
      imageDataThumbNail:[],
      imageDataThumbNailName:'',
      gal_Id: '',
      gal_Title: '',
      gal_Desc: '',
      gal_Name: '',
      gal_Date: '',
      gal_Details: [],
      gal_Delete_Details: [],
      errorStatus: true,
      item: [],
      editItem: [],
      editOpen: false,
      viewOpen: false,
      snackbarstate: false,
      // itemEditData:props.itemEditData,
      message: '',
      selectedFile: null,
      addViewClose: false


    };

  }

  componentWillMount = () => {

  }
  handleClickOpen = (data) => {
    console.log(data)

    this.setState({ open: true, editOpen: false, gal_Details: [], gal_Delete_Details: [] });
    var validations = this.state.validations;


    for (var i in keys) {
      this.setState({ [keys[i]]: "" })
      if (validations[keys[i]] != undefined) {
        validations[keys[i]].status = null;
      }
    }
    this.setState({ validations });
    this.checkPendingValidations();

  };

  handleClose = () => {
    this.setState({  open: false, editOpen: false });
    this.setState({})
  };
  editOpen = (data) => {
    console.log("data", data)

    var cdata = data.completeDetails
    var gal_Id = cdata.gal_Id;
    var gal_Title = cdata.gal_Title;
    var gal_Desc = cdata.gal_Description;
    var gal_Date = new Date(Number(cdata.gal_PublishDate));
    var gal_Details = [];
    var gal_Name = [];
    this.state.imageDataThumbNailName=data.completeDetails.galimages[0].gal_Det_ThumbnailURL

    for (var i = 0; cdata.galimages.length > i; i++) {
      var obj = {
        uid: i + 1,
        name: cdata.galimages[i].gal_Name,
        status: 'done',
        url: cdata.galimages[i].gal_Det_GlobalMediaURL,
        editStatus: true,
        deleteID: cdata.galimages[i].gal_Det_Id
      };
      gal_Name.push(cdata.galimages[i].gal_Name);
      gal_Details.push(obj)
    }

    this.setState({ editDetails: data, gal_Name: gal_Name.join(','), gal_Id, gal_Title, gal_Desc, gal_Date, gal_Details })
    this.setState({ editOpen: true, open: true });



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

  closeSnackBar = () => {
    this.setState({ snackbarstate: false })
  }
  addViewClose = () => {
    this.setState({ viewOpen: false })
  }



  componentDidMount() {
    this.loadTableData();
  }

  receiveDate = (columnDate, date) => {
    var keys = this.state.keys;
    keys[columnDate] = date;
    this.setState({ keys })
    // this.checkPendingValidations();
    console.log("dateValidation", date)

  };



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
    if (key == 'gal_thumbnail') {
      this.state.imageDataThumbNail = value.files[0];
      this.state.imageDataThumbNailName =  value.files[0] == undefined ? "" : value.files[0].name;
      console.log(value.files[0],'sdfdsjksdfjk')
      this.setState({ });
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
    this.setState({ [key]: value });
    this.checkPendingValidations();
  }

  loadTableData = () => {

    fetch(APIURL + "viewlistofgallery", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("tblValues", responseJson);

        var response = responseJson.data;
        console.log(response,"sdfsdf")
        for (var j = 0; response.length > j; j++) {
          response[j].gal_Det_GlobalMediaURL = response[j].galimages[0].gal_Det_GlobalMediaURL;
          response[j].gal_Det_MediaType = response[j].galimages[0].gal_Det_MediaType;
          var responsegal = response[j].galimages;
          console.log("resposnse", responsegal);
          for (var i = 0; responsegal.length > i; i++) {
            response[j].galimages[i].gal_Name = responsegal[i].gal_Det_GlobalMediaURL;
            response[j].galimages[i].gal_Det_GlobalMediaURL = responsegal[i].gal_Det_GlobalMediaURL;
          }

        }
        console.log(response)
        this.setState({ tblValues: response });
      });
  };
  onSubmit = (e) => {
    console.log("e", e)
    e.preventDefault();
    console.log(this.state)
    this.thumbnailImage()
  }

  thumbnailImage = () => {
    if (this.state.imageDataThumbNail.length <= 0) {
    this.fileUploadHandler()
    } else {


      const fd = new FormData();
      fd.append("image", this.state.imageDataThumbNail);
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
            if(this.state.gal_Details.length > 0){
              this.fileUploadHandler()
            }
          }
        });
    }
  }


  deleteDynMaster = (data) => {
    console.log("deleteDynMaster", data.completeDetails.gal_Id);


    var obj = { galid: data.completeDetails.gal_Id };
    fetch(APIURL + 'deletegallerylist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ snackbarstate: true });
        this.setState({ deleteValues: responseJson });
        this.setState({ unselectData: true });

        this.loadTableData();

      })
  }


  fileSelectedHandler = event => {
    console.log("event", event.target.files[0].type);
    //image name target edit popup.....
    this.setState({ gal_Det_GlobalMediaURL: event.target.files[0].name });
    // //..........
    // //.......get image file...
    this.setState({
      selectedFile: event.target.files[0]
    });
    //......
  };


  fileUploadHandler = () => {
    const fd = new FormData();
    var finalImgArray = [];
    var imgArray = this.state.gal_Details;
    console.log(imgArray)
    for (var i = 0; imgArray.length > i; i++) {

      if (!imgArray[i].hasOwnProperty('editStatus') && !imgArray[i].editStatus == true) {
        var obj = { "mediaType": imgArray[i].originFileObj.type.split('/')[0], "mediaUrl": imgArray[i].originFileObj.name, "userId": "", "loadImage": i == 0 ? 1 : 0 }
        finalImgArray.push(obj)

        fd.append('image', imgArray[i].originFileObj);
      }

    }

    if (finalImgArray.length <= 0) {
      this.submitData([]);
      return
    }

    console.log(fd);
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
        console.log(res);
        if (res.data.statusCode == 1) {
          this.submitData(finalImgArray);

        }
      });
  };

  submitData = (imgArray) => {
    console.log(this.state.imgArray)

    if (this.state.editOpen == false) {


      var obj = {
        "title": this.state.gal_Title,
        "description": this.state.gal_Desc,
        "date": this.state.gal_Date.getTime(),
        'galleryDetails': imgArray,
        'thumbnailURL':this.state.imageDataThumbNailName
      }
      console.log(obj.date)


      fetch(APIURL + 'addgallerycontent', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({ snackbarstate: true, open: false,imageDataThumbNailName:null,imageDataThumbNail:[] });
          this.loadTableData();

        })
    } else if (this.state.editOpen == true) {

      var galleryDetails = this.state.gal_Delete_Details;

      galleryDetails.map((item, i) => {
        galleryDetails[i].detailId = item.deleteID;
        galleryDetails[i].imageStatus = 1;
      })
      var obj = {
        "galid": this.state.gal_Id,
        "userid": '',
        "title": this.state.gal_Title,
        "description": this.state.gal_Desc,
        "date": this.state.gal_Date.getTime(),
        'galleryDetails': galleryDetails,
        'addimage': imgArray,
        'thumbnailURL':this.state.imageDataThumbNailName
      }
      console.log(obj)

      fetch(APIURL + 'editgallery', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({ message: "Edited Successfully" })
          this.setState({ snackbarstate: true,open: false,imageDataThumbNailName:null,imageDataThumbNail:[] });
          this.loadTableData();
        })

    }

  };

  closeUpload = (insertData, deleteData) => {

    var gal_Details = this.state.gal_Details;
    var gal_Delete_Details = this.state.gal_Delete_Details;

    gal_Details = insertData;
    gal_Delete_Details = deleteData;
    var imageName = [];
    gal_Details.map((value) => {

      if (value.hasOwnProperty('editStatus') && value.editStatus == true) {
        imageName.push(value.name);
      } else {
        imageName.push(value.originFileObj.name);
      }
    });

    this.onChangeData(imageName.join(','), 'gal_Name')
    this.setState({ gal_Details, gal_Delete_Details, viewOpen: false });
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
        <CustomizedSnackbars vertical="top" horizontal="right" messageData={this.state.message} variant="success" openState={this.state.snackbarstate} snackbarCallback={this.closeSnackBar} />
        <EnhancedGalleryTable
          tableTitel={this.state.title}
          tblDataValues={this.state.tblValues}
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
                      error={this.state.validations.gal_Title.status}
                      helperText={this.state.validations.gal_Title.msg}
                      label="Title"
                      value={this.state.gal_Title}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'gal_Title')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <TextField
                      error={this.state.validations.gal_Desc.status}
                      helperText={this.state.validations.gal_Desc.msg}
                      label="Description"
                      value={this.state.gal_Desc}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'gal_Desc')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>
                  <Grid>
                    <input type="file" ref={(ref) => this.myInput = ref} style={{ display: 'none' }} onChange={(e) => this.onChangeData(e.target, 'gal_thumbnail')} />
                    <div style={{ display: 'flex', 'align-items': 'flex-end' }}>
                      <CloudUpload style={{ 'margin-bottom': '12px', 'margin-right': '10px' }} />
                      <TextField
                        error={this.state.validations.gal_thumbnail.status}
                        helperText={this.state.validations.gal_thumbnail.msg}
                        label="Thumbnail Image"
                        value={this.state.imageDataThumbNailName}
                        className="form-input"
                        onClick={(e) => this.myInput.click()}
                        type="text"
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                          readOnly: true,
                        }}
                      />
                    </div>

                  </Grid>


                  <Grid item xs={4} md={4} style={{ display: "inline-flex" }}>
                    <TextField
                      error={this.state.validations.gal_Name.status}
                      helperText={this.state.validations.gal_Name.msg}
                      label="Media Images"
                      value={this.state.gal_Name}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'gal_Name')}
                      type="text"
                      margin="normal"
                      InputProps={{
                        readOnly: true,
                      }}
                      onClick={this.viewsOpen}
                    />

                  </Grid>
                  <Grid item xs={4} md={4}>
                    <MaterialUIPickers
                      dateAlias={'Date'}
                      value={this.state.gal_Date}
                      keyDate={'gal_Date'}
                      receiveDate={(key, value) => this.onChangeData(value, key)} />
                  </Grid>

                </Grid>

                <Button disabled={this.state.errorStatus} onClick={this.onSubmit} type="submit" color="primary" style={{ marginRight: 10 }} variant="contained">
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

        <Dialog
          open={this.state.viewOpen}
          close={this.state.addViewClose}
          fullWidth={true}
          maxWidth="md"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd", color: "white" }}>Choose a File
        </DialogTitle>

          <DialogContent>
            <form className="dynamic-form"  >
              <div classNmae="form-group">
                <Grid container spacing={24}>


                  <ImagesUpload closeUpload={this.closeUpload} sendData={this.state.gal_Details} closePopup={() => { this.setState({ viewOpen: false }) }} />

                </Grid>

              </div>

            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
export default Gallery;