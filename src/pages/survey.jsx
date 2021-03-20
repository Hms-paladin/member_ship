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
import EnhancedSurveyTable from "../components/surveyTable";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ValidationLibrary from "../helpers/validation/validationfunction";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../helpers/snackbar';
import ImagesUpload from "../components/fileUpload";
import Checkbox from '@material-ui/core/Checkbox';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import MaterialUIPickers from "../components/datePicker";

import TextareaAutosize from '@material-ui/core/TextareaAutosize'


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




var objQuestion = { sur_Det_Question: '', sur_Det_Answer: '', sur_Det_AnswerTypeId: '', questionStatus: 1, ckeckvalue: true, newData: true }

var keys = ['sur_Id', 'sur_Title', 'sur_Description', 'sur_Instruction', 'sur_StartDateTime', 'sur_EndDateTIme'];
class surveyTrn extends Component {
  constructor(props) {
    console.log("props", props)
    super(props);

    this.state = {
      title: "Survey",
      value: 0,
      gallerTitle: [],
      validations: { 'sur_Title': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'sur_Description': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'sur_Instruction': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'sur_StartDateTime': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'sur_EndDateTIme': { validations: [{ name: "required", params: '' }], msg: '', status: '' } },
      data: {
        'sur_Id': "",
        'sur_Title': "",
        'sur_Description': "",
        'sur_Instruction': "",
        'sur_StartDateTime': "",
        'sur_EndDateTIme': ""
      },
      questionDetails: [Object.assign({}, objQuestion)],
      deletedQuestions: [],

      errorStatus: true,
      item: [],
      editItem: [],
      editOpen: false,
      snackbarstate: false,
      message: '',
      selectedFile: null,
      viewsOpen: false,
      addViewClose: false,
      IconOpen: false,
      question: true,




    };

  }
  addRow = () => {
    var questionDetails = this.state.questionDetails == undefined ? [] : this.state.questionDetails;
    questionDetails.push(Object.assign({}, objQuestion));
    this.setState({ questionDetails });
    // this.checkValidations();

  }

  handleClickOpen = (data) => {
    var validations = this.state.validations;
    var questionDetails = this.state.questionDetails;
    var data = this.state.data;
    questionDetails = [Object.assign({}, objQuestion)];


    for (var i in keys) {
      data[keys[i]] = ""
      if (validations[keys[i]] != undefined) {
        validations[keys[i]].status = null;
      }
    }
    this.setState({ validations, data, questionDetails });
    this.checkPendingValidations();
    this.setState({ open: true, editOpen: false });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ editOpen: false });
    this.setState({ viewOpen: false });
  };

  editOpen = (data) => {
    console.log("data", data)
    var details = data.completeDetails;
    details.sur_StartDateTime = new Date(Number(details.sur_StartDateTime));
    details.sur_EndDateTIme = new Date(Number(details.sur_EndDateTIme));
    var surveylist = details.surveylist;
    surveylist.map((item) => {
      console.log(item)
      item.editStatus = true;
      item.sur_Det_Answer = item.sur_Det_Options.join(',');
      item.ckeckvalue = false;
      item.questionStatus = 1;
    })
    console.log(surveylist)
    this.setState({ data: details, questionDetails: surveylist })
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
    // this.setState({ckeckvalue:true})
    var data = this.state.data;
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
    data[key] = value
    this.setState({ data });
    this.checkPendingValidations();
  }

  loadTableData = () => {

    fetch(APIURL + "viewListSurvey", {
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
    console.log("e", e)
    e.preventDefault();


    var questionDetails = this.state.questionDetails;
    console.log("questiondetails", this.state.questionDetails);
    var deletedQuestions = this.state.deletedQuestions;
    var data = this.state.data;
    console.log("data", this.state.data);
    var userid = localStorage['userobj'] ? JSON.parse(localStorage['userobj']).user_Id : ''
    var obj = {
      "surid": data.sur_Id,
      "title": data.sur_Title,
      "description": data.sur_Description,
      "instruction": data.sur_Instruction,
      "datetime": data.sur_StartDateTime.getTime(),
      "endDatetime": data.sur_EndDateTIme.getTime(),
      "userid": userid,
    }
    console.log("obj", obj);
    if (this.state.editOpen == false) {

      var surveydetails = [];
      questionDetails = questionDetails.filter((obj) => obj.newData == true && obj.ckeckvalue == true);
      // questionDetails=this.state.questionDetails;
      console.log("questiondetailsnew", questionDetails);
      for (var i in questionDetails) {

        var obj2 = {
          "answertype": questionDetails[i].sur_Det_AnswerTypeId,
          "question": questionDetails[i].sur_Det_Question,
          "options": questionDetails[i].sur_Det_Answer,
          "questionNumber": parseInt(i + 1)
        }
        surveydetails.push(obj2);

      }
      obj.surveydetails = surveydetails;
      console.log(obj)
      fetch(APIURL + 'addSurvey', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({ item: responseJson })
          this.loadTableData();
          this.setState({ message: "Record Added successfully" })
          this.setState({ open: false });
          console.log("responseInsert", responseJson);


          // this.setState({ snackbarstate: true });

        })

    }
    else {
      console.log(this.state)

      var surveydetailsArray = [];
      var addquestionsArray = [];
      var addquestions = questionDetails.filter((obj) => obj.newData == true && obj.questionStatus == 1);
      // var addquestions=this.state.questionDetails;
      var surveydetails = questionDetails.filter((obj) => obj.editStatus == true);
      // var surveydetails=this.state.questionDetails;
      console.log("addquestions", addquestions);
      console.log("surveydetails", surveydetails);
      for (var i in addquestions) {

        var obj2 = {
          "answertype": addquestions[i].sur_Det_AnswerTypeId,
          "question": addquestions[i].sur_Det_Question,
          "options": addquestions[i].sur_Det_Answer,
          "questionNumber": parseInt(i + 1)
        }
        addquestionsArray.push(obj2);
      }

      for (var j in surveydetails) {

        var obj1 = {
          "answerType": surveydetails[j].sur_Det_AnswerTypeId,
          "question": surveydetails[j].sur_Det_Question,
          "options": surveydetails[j].sur_Det_Answer,
          "questionNumber": parseInt(j + 1),
          "questionStatus": surveydetails[j].questionStatus,
          "detailId": surveydetails[j].sur_Det_Id,
        }
        surveydetailsArray.push(obj1);
      }

      obj.surveyDetails = surveydetailsArray;
      obj.addquestions = addquestionsArray;

      console.log(obj)

      fetch(APIURL + 'editSurveyList', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log("responseInsert", responseJson);
          this.setState({ item: responseJson })
          this.loadTableData();
          this.setState({ message: "Record Edited successfully" })
          this.setState({ snackbarstate: true });
          this.setState({ open: false });

        })

    }

  }

  deleteques = () => {

    var questionDetails = this.state.questionDetails;
    var deletedQuestions = this.state.deletedQuestions;

    questionDetails.map((item, i) => {
      if (item.ckeckvalue == true) {
        item.questionStatus = 0;
      }
    }
    )
    console.log(questionDetails)
    // deletedQuestions = questionDetails.filter(function( obj ) {
    //   return obj.ckeckvalue == true && obj.hasOwnProperty('editStatus') && obj.editStatus==true;
    // });  

    // questionDetails = questionDetails.filter(function( obj ) {
    //   return obj.ckeckvalue == false;
    // });

    this.setState({ questionDetails, deletedQuestions });
  }

  onChangeQuestData = (value, index, key) => {

    var questionDetails = this.state.questionDetails;
    questionDetails[index][key] = value;
    this.setState({ questionDetails });

  }



  checkedValues(index, data) {

    var check = this.state.questionDetails;
    check[index].ckeckvalue = !data;
    this.setState({ questionDetails: check });
    console.log(this.state.questionDetails)

  };

  addFunction = () => {

    return (
      <div>
        {this.state.question &&
          <Grid container spacing={24}>
            <Grid item xs={4} md={12}>
              <div style={{
                backgroundColor: "#238fbd", borderRadius: "5px", height: "6vh",
                paddingLeft: "11px", paddingTop: "10px", marginTop: "10px"
              }}>Survey Details<span style={{
                float: "right",
                marginRight: "10px"
              }}><i class="fa fa-plus" onClick={this.addRow} style={{ fontSize: "21px" }} aria-hidden="true"></i> <i class="fa fa-trash-o" onClick={this.deleteques} style={{ fontSize: "21px" }} aria-hidden="true"></i></span></div>
            </Grid>
            <div>
              {this.state.questionDetails && this.state.questionDetails.map((data, index, key) => {
                if (data.questionStatus == 1) {
                  return (
                    <div>
                      <Grid container spacing={24}>
                        <Grid item xs={4} md={12}>
                          <Checkbox
                            checked={data.ckeckvalue}
                            value="checkedB"
                            color="primary"
                            onClick={() => this.checkedValues(index, data.ckeckvalue)}
                          /><lable>Question # {index + 1}</lable>
                        </Grid>
                        <Grid item xs={4} md={4}>

                          <TextField
                            label="Question Name"
                            value={data.sur_Det_Question}
                            className="form-input"
                            onChange={(e) => this.onChangeQuestData(e.target.value, index, 'sur_Det_Question')}
                            type="Text"
                            margin="normal"
                            onClick={this.viewsOpen}
                          />
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <FormControl className="form-input" style={{ marginTop: 15 }} >
                            <InputLabel>Answer</InputLabel>
                            <Select
                              className="form-input"
                              value={data.sur_Det_AnswerTypeId}
                              onOpen={this.handleOpen}
                              // onClose={this.handleClose}
                              onChange={(e) => this.onChangeQuestData(e.target.value, index, 'sur_Det_AnswerTypeId')}
                            >

                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value="CK">
                                <em>Check box</em>
                              </MenuItem>
                              <MenuItem value="RD">
                                <em>Radio button
              </em>
                              </MenuItem>
                            </Select>

                          </FormControl>
                        </Grid>
                        <Grid item xs={4} md={4} style={{ display: "inline-flex" }}>

                          <TextField
                            label="Answers (Separate with ^)"
                            value={data.sur_Det_Answer}
                            className="form-input"
                            onChange={(e) => this.onChangeQuestData(e.target.value, index, 'sur_Det_Answer')}
                            type="Text"
                            margin="normal"
                            onClick={this.viewsOpen}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  )
                }
              })}
            </div>
          </Grid>

        }
      </div>
    )

  }

  submitQuestiont = () => {
    this.setState({ question: true });

  }


  fileSelectedHandler = event => {
    console.log("event", event);
    //image name target edit popup.....
    this.setState({ news_ImagePath: event.target.files[0].name });
    // //..........
    // //.......get image file...
    this.setState({
      selectedFile: event.target.files[0]
    });
    //......
  };


  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
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
        console.log(res);
      });
  };

  deleteDynMaster = (data) => {
    console.log(data)
    var obj = { surid: data.sur_Id };
    fetch(APIURL + 'deleteSurvey', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ snackbarstate: true });
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
        <CustomizedSnackbars vertical="top" horizontal="right" messageData={this.state.message} variant="success" openState={this.state.snackbarstate} snackbarCallback={this.closeSnackBar} />
        <EnhancedSurveyTable
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
            <CancelOutlinedIcon style={{ float: "right" }} onClick={this.handleClose} />

          </DialogTitle>

          <DialogContent>
            <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }} >
              <div classNmae="form-group">
                <Grid container spacing={24}>

                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Title"
                      value={this.state.data.sur_Title}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'sur_Title')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Instruction"
                      value={this.state.data.sur_Instruction}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'sur_Instruction')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4} />

                  <Grid item xs={4} md={4}>

                    <MaterialUIPickers
                      dateAlias={'Start Date'}
                      value={this.state.data.sur_StartDateTime}
                      keyDate={'sur_StartDateTime'}
                      receiveDate={(key, value) => this.onChangeData(value, key)} />

                  </Grid>
                  <Grid item xs={4} md={4} style={{ display: "inline-flex" }}>

                    <MaterialUIPickers
                      dateAlias={'End Date'}
                      value={this.state.data.sur_EndDateTIme}
                      keyDate={'sur_EndDateTIme'}
                      receiveDate={(key, value) => this.onChangeData(value, key)} />

                  </Grid>

                  <Grid item xs={4} md={8}>
                    <label>Description</label>
                    <TextareaAutosize
                      label="Description"
                      value={this.state.data.sur_Description}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'sur_Description')}
                      type="text"
                      margin="normal"
                      rowsMin={3}
                      rowsMax={7}
                    />
                  </Grid>

                </Grid>

                <Button disabled={this.state.errorStatus} type="submit" color="primary" style={{ marginRight: 10, float: "right" }} variant="contained" onClick={this.submitQuestiont}>
                  {
                    this.state.editOpen ? "Update" : "Submit"
                  }
                </Button>


                {this.addFunction()}



              </div>

            </form>
          </DialogContent>
        </Dialog>

      </div>
    )
  }
}
export default surveyTrn;