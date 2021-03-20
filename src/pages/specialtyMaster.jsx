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

      //**********************************************************
      //**************Dynamic Form Validation Schema**************
      const APIURL=apiurl;
      var t_name='mas_specialty';    
      var objkey={'spec_Name':''};
      var objkey1={'spec_Name':''};
      var validataions={'spec_Name':''}
      var validataions1={'spec_Name':''}
      var clearData={'spec_Name':''}
      var primary_key='spec_Id';

      //**************Dynamic Form Schema*************************
      var mydata={fields:[

        //.........................Index frist one is static
        {
          "key":"spec_Id",
          "alias":"Speciality ID" ,
          "validations":[ {name:"required",params:''}]
        },
        //..........................
        {
          "key":"spec_Name",
          "alias":"Speciality Name" ,
          "validations":[ {name:"required",params:''}]
        },

        ],table_name:t_name};

        //******************************************************
        //*****************Dynamic Table Schema*****************

        var tableSchema={fields:[
          {
            //................index first is static
            "key":"spec_Id",
            "alias":"Speciality ID" ,
            visible:false,
            queryValid:true
          },
          //...................
          {
            "key":"spec_Name",
            "alias":"Speciality Name" ,
            visible:true,
            queryValid:true
          },
           {
            "key":"is_Delete",
            "alias":"isDelete" ,
            visible:false,
            queryValid:true,
          }

          ],table_name:t_name,wherecondition:"where "+t_name+".is_Delete=0"};


  //**************************************************************
  //**************************************************************

  var self=""
  class SpecialtyMaster extends Component {
    constructor(props) {
     // console.log("props",props)
     super(props);
     this.state = {
       error: null,
       isLoaded: false,
       title:"Speciality",
       handleEditOpen:false,
       datas:props.editPopup,
       snackbarstate:false,
       unselectData:null,
       items: [],
       editcontent:false
     };

   }
      //addPopup............

      handleClickOpen = (data) => {

        this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
        this.setState({ handleEditOpen: false });
        objkey=Object.assign({},objkey1);
        validataions=Object.assign({},validataions1);
      };

        //editPopup..........

        handleClickEditOpen = (data) => {
          this.setState({unselectData:true});
          this.setState({editcontent:true});
          // console.log("items",this.state.items)
          var items=this.state.items;

          var datakeys= Object.keys(data);
          var datavalues=Object.values(data);

          for (var i = 0; i< items.length; i++) {
            var getIndex=datakeys.indexOf(items[i].COLUMN_NAME);
            // items[i].value=datavalues[getIndex];
            objkey[items[i].COLUMN_NAME]=datavalues[getIndex];
            objkey[items[i].COLUMN_NAME]==""?validataions[items[i].COLUMN_NAME]="Field Required":validataions[items[i].COLUMN_NAME]=false;
          }
          this.setState({items});
          this.setState({ handleEditOpen: true });
          
        };

        handleEditClose = () => {
          this.setState({ handleEditOpen: false });
          this.setState({editcontent:false});
        };


        loadData = () =>{

          fetch(APIURL+'dynamicMaster/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(mydata),
          }).then((response) => response.json())
          .then((responseJson) => {
            // console.log("responseJsondynMas",responseJson);
            this.setState({items:responseJson})
          })

        }
        componentWillMount(){
          this.loadData()
        }
        insertDynMaster(data){
          var obj={fields:data,table_name:t_name};
          fetch(APIURL+'insertDyn', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
          }).then((response) => response.json())
          .then((responseJson) => {
            console.log("insertValues",responseJson);
            this.setState({insertValues:responseJson})
            this.loadTableData();

          })
        }

        updatetDynMaster(data){
          var obj={fields:data,table_name:t_name,primarykey:"spec_Id"};
          fetch(APIURL+'updateDynamic', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
          }).then((response) => response.json())
          .then((responseJson) => {
            // console.log("updateValues",responseJson);
            this.setState({updateValues:responseJson})
            this.loadTableData();

          })
        }


        loadTableData =() =>{
          fetch(APIURL+'getDynApi', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tableSchema),
          }).then((response) => response.json())
          .then((responseJson) => {
            // console.log("tblValues",responseJson);
            this.setState({tblValues:responseJson})

          })

        }
        closeSnackBar=() =>{
          this.setState({snackbarstate:false})
        }


        deleteDynMaster=(data) =>{

          // console.log("deleteDynMaster",data);
          var obj={fields:data,table_name:t_name,primarykey:"spec_Id"};
          fetch(APIURL+'deleteDyn', {
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
            // console.log("deleteValues",responseJson);

            this.loadTableData();

          })
        }


        componentDidMount(){
          this.loadTableData();


        }
        editonSubmit=(data) =>{
          // console.log(" I am edited",data);
          // objkey=objkey1;
          // validataions=validataions1;
          this.updatetDynMaster(data);
        }
        onSubmit = (data) => {
          console.log('formChildrendata',data);
          this.insertDynMaster(data);
        }



        render() {
          // console.log("rendering");

          return (
            <div>
            <card>

            <div style={{textAlign: "left"}}>
            <Fab color="primary" aria-label="Add" onClick={this.handleClickOpen} style={{
              margin: 13,backgroundColor:"#677c8c" }}>
              <AddIcon />
              </Fab>

              </div>
              <CustomizedSnackbars vertical="top" horizontal="right" message="Detail Deleted Successfully" variant="success" openState={this.state.snackbarstate} snackbarCallback={this.closeSnackBar} />


              <EnhancedTable  unselectData={this.state.unselectData} primaryKey={primary_key} tableTitel={this.state.title} tblDtatas={tableSchema.fields} tblDataValues={this.state.tblValues} editOpen={this.handleClickEditOpen} DeleteData={this.deleteDynMaster}/>

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
              maxWidth="sm"
              aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title"  style={{ backgroundColor: "#238fbd",color:"white"}}>Add {this.state.title}</DialogTitle>

              <DialogContent>
              <div classNmae="form-group"> 

              {this.state.items.length>0&&
                <DynForms  primaryKey={primary_key} clearData={clearData} validataions={validataions} handleClose={this.handleClose} keys={objkey} formData={this.state.items}  onSubmit={this.onSubmit}/>
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
              <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#238fbd",color:"white"}}>Edit {this.state.title}</DialogTitle>

              <DialogContent>
              <div classNmae="form-group"> 

              {this.state.items.length>0&&
                <DynForms editcontent={this.state.editcontent}  primaryKey={primary_key} clearData={clearData} validataions={validataions} handleClose={this.handleClose} keys={objkey} formData={this.state.items}  onSubmit={this.editonSubmit}/>
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

      export default SpecialtyMaster;
