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
import InfoTable from "../components/InfoTable";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ValidationLibrary from "../helpers/validation/validationfunction";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CustomizedSnackbars from '../helpers/snackbar';
import MaterialUIPickers from "../components/datePicker";
import { Select as Antdselect } from 'antd';
import dateFormat from 'dateformat';

import TextareaAutosize from '@material-ui/core/TextareaAutosize'

//generate a dynamic dropDown schema.................
const { Option } = Antdselect;
var t_name = "mas_infoCategory";
var mydata = {
  fields: [{
    "name": 'CategoryType',  // state Name
    "foreign_tbl": "mas_infoCategory",
    "foreign_fields": [{ name: 'mas_info_cat_id', alias: 'value', 'alias1': 'mas_info_cat_id' }, { name: 'mas_info_cat_name', alias: 'value1', 'alias1': 'name' }]
  },

    // {
    // "name":'TagList',  // state Name
    // "foreign_tbl":" mas_info_tags",
    // "foreign_fields":[{name:'info_tags_id',alias:'value','alias1':'info_tags_id'},{name:'mas_info_tags_name',alias:'value1','alias1':'name'}]},

  ], table_name: t_name, wherecondition: "where" + t_name + ".is_Delete=0"
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





var keys = { info_id: '', mas_info_title: '', mas_info_desc: '', mas_info_link: '', mas_info_updated_datetime: '' }
class Infotablepage extends Component {
  constructor(props) {
    console.log("props", props)
    super(props);

    this.state = {
      title: "Info Table",
      value: 0,
      CategoryType: [],
      TagList: [],
      validations: { 'mas_info_cat_id': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'mas_info_tag_id': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'mas_info_title': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'mas_info_desc': { validations: [{ name: "required", params: '' }], msg: '', status: '' }, 'mas_info_link': { validations: [{ "name": "webUrlAccept" }], msg: '', status: '' } },
      info_id: '',
      mas_info_cat_id: '',
      mas_info_tag_id: '',
      mas_info_title: '',
      mas_info_desc: '',
      mas_info_link: '',
      mas_info_updated_datetime: '',

      errorStatus: true,
      item: [],
      editItem: [],
      editOpen: false,
      snackbarstate: false,
      // itemEditData:props.itemEditData,
      message: ''


    };

  }

  componentWillMount = () => {

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
    var keys = ["mas_info_cat_id", "mas_info_tag_id", "mas_info_title", "mas_info_desc", "mas_info_link", "mas_info_updated_datetime"];
    for (var i in keys) {
      this.state[keys[i]] = ''
    }
    this.setState({})
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ editOpen: false });
  };
  editOpen = (data) => {
    // alert(JSON.stringify(data))
    if (this.state.mas_info_updated_datetime != null) {
      // alert("true")
      data.mas_info_updated_datetime = data.mas_info_updated_datetime
    } else {
      // alert("false")
      data.mas_info_updated_datetime = null
    }

    console.log("data", data)
    this.setState({ editDetails: data })
    this.setState({ editOpen: true });
    for (var i in data) {
      if (i == 'mas_info_tag_id') {
        var splitteddata = data.mas_info_tag_id.split(',').map((obj) => parseInt(obj));
        this.setState({ [i]: splitteddata });
      } else {
        this.setState({ [i]: data[i] });
      }
      var validations = this.state.validations;
      if (validations[i] != undefined) {
        validations[i].status = false;
        this.setState({ validations });
      }
      console.log(this.state)
    }

    this.checkPendingValidations();

  }

  closeSnackBar = () => {
    this.setState({ snackbarstate: false })
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
          console.log(responseData[i]);
          var statename = responseData[i].name;
          this.setState({ [statename]: responseData[i].dropdown })
        }

      })

  }



  componentWillReceiveProps = (props) => {
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
  componentDidMount() {
    this.loadData();
    this.loadTagData();
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
  onChangeEdit = (value, key) => {  //..........e=value,key=coloumn name
    console.log("changevalue", value)
    // this.setState({validations:value})
    //   // console.log(e.);
    //   if(this.state.validations.hasOwnProperty(key)==true){
    //     var responseData=ValidationLibrary.checkValidation(value,this.state.validations[key].validations);
    //     console.log('responseData',responseData);
    //     if(responseData.msg!=""){
    //       var validations=this.state.validations;
    //       validations[key].msg=responseData.msg;
    //       validations[key].status=true;
    //       this.setState({validations});
    //       // this.setState()
    //     }else{
    //       var validations=this.state.validations;
    //       validations[key].msg=responseData.msg;
    //       validations[key].status=false;
    //       this.setState({validations});
    //       console.log(validations)
    //     }
    //   }
    //   var editDetails=this.state.editDetails;
    //   editDetails[key]=value; //.........key kula value assign panrom
    //   console.log("editDetails[key]",editDetails[key])
    //   this.setState({editDetails});
    //   this.checkPendingValidations();

  }



  // clearFormValues=() =>{
  //   var self=this;

  //   this.setState({errorStatus:true});

  //   this.props.handleClose();
  // }
  loadTableData = () => {

    fetch(APIURL + "getInformation", {
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
  loadTagData = () => {

    fetch(APIURL + "getTags", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

    })
      .then(response => response.json())
      .then(responseJson => {

        this.setState({ TagList: responseJson.data });
      });
  };
  onSubmit = (e) => {
    console.log("e", e)
    e.preventDefault();

    // alert(JSON.stringify(this.state.mas_info_updated_datetime))

    if (typeof this.state.mas_info_updated_datetime === 'object') {
      var dateformt = dateFormat(this.state.mas_info_updated_datetime.value, 'yyyy-mm-dd');
    } else {
      var dateformt = null
    }

    // console.log("date",dateformt);
    var nextobj = { catId: this.state.mas_info_cat_id, tagId: this.state.mas_info_tag_id, title: this.state.mas_info_title, description: this.state.mas_info_desc, infoLink: this.state.mas_info_link, date: dateformt }
    console.log("insertobj", nextobj)

    fetch(APIURL + 'addInformation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nextobj),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("responseInsert", responseJson);
        this.setState({ item: responseJson })
        this.loadTableData();
        this.setState({ message: "Added Successfully" })
        this.setState({ snackbarstate: true });
        this.setState({ open: false });

      })


  }
  editSubmit = (e) => {
    console.log("e", e)
    e.preventDefault();

    // var nextEditobj={mem_Id:this.state.editDetails.mem_Id,mem_TypeId:this.state.editDetails.mem_TypeId,ins_Name:this.state.editDetails.ins_Name,ins_StdCode:this.state.editDetails.ins_StdCode,ins_Address:this.state.editDetails.ins_Address,ins_CityId:this.state.editDetails.ins_CityId,ins_StateId:this.state.editDetails.ins_StateId,ins_Pincode:this.state.editDetails.ins_Pincode,ins_Website:this.state.editDetails.ins_Website,mem_Name:this.state.editDetails.mem_Name,mem_Email:this.state.editDetails.mem_Email,mem_NumberOfBeds:this.state.editDetails.mem_NumberOfBeds,mem_MobileNo:this.state.editDetails.mem_MobileNo}
    var dateformt;
    if (this.state.mas_info_updated_datetime != null) {
      // alert("true")
      var checkdate = typeof this.state.mas_info_updated_datetime === "object" ? this.state.mas_info_updated_datetime.value : this.state.mas_info_updated_datetime
      // alert(JSON.stringify(checkdate))
      dateformt = dateFormat(checkdate, 'yyyy-mm-dd');
    } else {
      // alert("false")
      dateformt = null
    }

    var nexteditobj = { infoId: this.state.info_id, catId: this.state.mas_info_cat_id, tagId: this.state.mas_info_tag_id, title: this.state.mas_info_title, description: this.state.mas_info_desc, infoLink: this.state.mas_info_link, date: dateformt }
    console.log("insertobj", nexteditobj)
    fetch(APIURL + 'updateInformation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nexteditobj),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("editReponseJson", responseJson);
        this.setState({ editItem: responseJson })
        // this.setState({ snackbarstate: true });
        this.loadTableData();
        this.setState({ message: "Updated Successfully" })
        this.setState({ editOpen: false });
      })
  }


  deleteDynMaster = (data) => {
    console.log("deleteDynMaster", data);


    var obj = { infoId: data.info_id };
    fetch(APIURL + 'deleteInformation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log("deleteresponse", responseJson);
        this.setState({ snackbarstate: true });
        this.setState({ message: "Deleted Successfully" })
        this.setState({ deleteValues: responseJson });

        this.loadTableData();

      })
  }
  handleChange(value) {
    console.log(`selected ${value}`);
    // console.log("e.target",e);
  }
  render() {
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
        <InfoTable

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
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd", color: "white" }}>Add {this.state.title}
          </DialogTitle>

          <DialogContent>
            <form className="dynamic-form" onSubmit={(e) => { this.onSubmit(e) }} >
              <div classNmae="form-group">
                <Grid container spacing={24}>
                  <Grid item xs={4} md={4}>
                    <FormControl className="form-input" style={{ marginTop: 15 }} error={this.state.validations.mas_info_cat_id.status}>
                      <InputLabel>Category Type</InputLabel>
                      <Select
                        className="form-input"
                        value={this.state.mas_info_cat_id}
                        onOpen={this.handleOpen}
                        // onClose={this.handleClose}
                        onChange={(e) => this.onChangeData(e.target.value, 'mas_info_cat_id')}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {this.state.CategoryType.map((obj, key) => {
                          return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
                        })}

                      </Select>
                      {this.state.validations.mas_info_cat_id.msg != "" &&
                        <FormHelperText>{this.state.validations.mas_info_cat_id.msg}</FormHelperText>
                      }
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControl className="form-input" style={{ marginTop: 15 }} error={this.state.validations.mas_info_tag_id.status}>

                      <Antdselect
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select Multi Tags"
                        // defaultValue={['china']}
                        // onChange={()=>this.handleChange()}
                        onChange={(value) => this.onChangeData(value, 'mas_info_tag_id')}
                        optionLabelProp="label"
                        optionFilterProp="label"
                      >{this.state.TagList.map((obj, key) => {
                        console.log("taglist", obj);
                        return (
                          <Option value={obj.info_tags_id} label={obj.mas_info_tags_name}>

                            {obj.mas_info_tags_name}
                          </Option>
                        )
                      })}


                      </Antdselect>
                      {this.state.validations.mas_info_tag_id.msg != "" &&
                        <FormHelperText>{this.state.validations.mas_info_tag_id.msg}</FormHelperText>
                      }
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <TextField
                      error={this.state.validations.mas_info_title.status}
                      helperText={this.state.validations.mas_info_title.msg}
                      label="Title"
                      value={this.state.mas_info_title}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'mas_info_title')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <TextField
                      error={this.state.validations.mas_info_link.status}
                      helperText={this.state.validations.mas_info_link.msg}
                      label="Info Link"
                      value={this.state.mas_info_link}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'mas_info_link')}
                      type="text"
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <MaterialUIPickers
                      dateAlias={'Date'}
                      value={this.state.mas_info_updated_datetime}
                      keyDate={'mas_info_updated_datetime'}
                      receiveDate={(key, value) => this.onChangeData({ value }, key)} />

                  </Grid>

                  <Grid item xs={4} md={8}>
                    <label>Description</label>
                    <TextareaAutosize
                      error={this.state.validations.mas_info_desc.status}
                      helperText={this.state.validations.mas_info_desc.msg}
                      label="Description"
                      value={this.state.mas_info_desc}
                      className="form-input"
                      onChange={(e) => this.onChangeData(e.target.value, 'mas_info_desc')}
                      type="text"
                      margin="normal"
                      rowsMin={3}
                      rowsMax={3}
                    />
                  </Grid>

                </Grid>

                <Button disabled={this.state.errorStatus} type="submit" color="primary" style={{ marginRight: 10 }} variant="contained">
                  Submit
</Button>
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
          <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd", color: "white" }}>Edit {this.state.title}
          </DialogTitle>

          <DialogContent>
            <form className="dynamic-form" onSubmit={(e) => { this.editSubmit(e) }} >
              {this.state.editDetails &&
                <div classNmae="form-group">
                  <Grid container spacing={24}>
                    <Grid item xs={4} md={4}>
                      <FormControl className="form-input" style={{ marginTop: 15 }} error={this.state.validations.mas_info_cat_id.status}>
                        <InputLabel>Category</InputLabel>
                        <Select
                          className="form-input"
                          value={this.state.mas_info_cat_id}
                          onOpen={this.handleOpen}
                          // onClose={this.handleClose}
                          onChange={e => this.onChangeData(e.target.value, 'mas_info_cat_id')}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {this.state.CategoryType.map((obj, key) => {
                            return (<MenuItem value={obj.value}>{obj.value1}</MenuItem>)
                          })}

                        </Select>
                        {this.state.validations.mas_info_cat_id.msg != "" &&
                          <FormHelperText>{this.state.validations.mas_info_cat_id.msg}</FormHelperText>
                        }
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <FormControl className="form-input" style={{ marginTop: 15 }} error={this.state.validations.mas_info_tag_id.status}>

                        <Antdselect
                          mode="multiple"
                          style={{ width: '100%' }}
                          placeholder="Select Multi Tags"
                          // defaultValue={['china']}
                          // onChange={()=>this.handleChange()}
                          // value={this.state.editDetails.mas_info_tag_id.split(',').map((obj)=>parseInt(obj))}
                          value={this.state.mas_info_tag_id}
                          onChange={(value) => this.onChangeData(value, 'mas_info_tag_id')}
                          optionLabelProp="label"
                          optionFilterProp="label"
                        >{this.state.TagList.map((obj, key) => {
                          console.log("taglist", obj);
                          return (
                            <Option value={obj.info_tags_id} label={obj.mas_info_tags_name}>

                              {obj.mas_info_tags_name}
                            </Option>
                          )
                        })}


                        </Antdselect>
                        {this.state.validations.mas_info_tag_id.msg != "" &&
                          <FormHelperText>{this.state.validations.mas_info_tag_id.msg}</FormHelperText>
                        }
                      </FormControl>
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <TextField
                        error={this.state.validations.mas_info_title.status}
                        helperText={this.state.validations.mas_info_title.msg}
                        label="Title"
                        value={this.state.mas_info_title}
                        className="form-input"
                        onChange={(e) => this.onChangeData(e.target.value, 'mas_info_title')}
                        type="text"
                        margin="normal"
                      />
                    </Grid>

                    <Grid item xs={4} md={4}>
                      <TextField
                        error={this.state.validations.mas_info_link.status}
                        helperText={this.state.validations.mas_info_link.msg}
                        label="Info Link"
                        value={this.state.mas_info_link}
                        className="form-input"
                        onChange={(e) => this.onChangeData(e.target.value, 'mas_info_link')}
                        type="text"
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={4} md={4}>
                      <MaterialUIPickers
                        dateAlias={'Date'}
                        value={this.state.mas_info_updated_datetime}
                        keyDate={'mas_info_updated_datetime'}
                        receiveDate={(key, value) => this.onChangeData({ value }, key)} />

                    </Grid>

                    <Grid item xs={4} md={8}>
                      <label>Description</label>
                      <TextareaAutosize
                        error={this.state.validations.mas_info_desc.status}
                        helperText={this.state.validations.mas_info_desc.msg}
                        label="Description"
                        value={this.state.mas_info_desc}
                        className="form-input"
                        onChange={(e) => this.onChangeData(e.target.value, 'mas_info_desc')}
                        type="text"
                        margin="normal"
                        rowMin={4}
                        rowMax={4}
                      />
                    </Grid>

                  </Grid>

                  <Button disabled={this.state.errorStatus} type="submit" color="primary" style={{ marginRight: 10 }} variant="contained">Update</Button>
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
export default Infotablepage;