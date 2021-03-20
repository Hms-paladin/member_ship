import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CloseIcon from '@material-ui/icons/Close';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      tblheads:[]
    };
  }
  componentWillReceiveProps(props){
   
    if(props.tblHead){
      this.setState({tblheads:props.tblHead.tblDtatas});
    }

  }
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);

  };

  render() {
    // console.log("asdfasd",this.state.tblheads)
    const { onSelectAllClick, order, orderBy, numSelected, rowCount,TblTitel,selectedVal,primaryKey, statecss } = this.props;
    return (
      <TableHead style={{backgroundColor: "#238fbd",color:"white"}}>
      <TableRow>
      <TableCell
      style={{color:"white" ,width:"10%",paddingRight:"0"}}
      key={"sno"}
      sortDirection={orderBy === "sno" ? order : false}
      >
      <Tooltip
      title="Sort"
      placement={'bottom-end'}
      enterDelay={300}
      >
      <TableSortLabel
      active={orderBy === 'sno'}
      direction={order}
      onClick={this.createSortHandler('sno')}
      >
      S.No.
      </TableSortLabel>
      </Tooltip>
      </TableCell>
      {this.state.tblheads.length>0&&this.state.tblheads.filter((row) =>row.visible===true).map(row => {
        return (

          <TableCell
          style={{color:"white",padding:"0"}}
          key={row.key}
          numeric={row.numeric}
          padding={row.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === row.key ? order : false}
          >{row.key!=primaryKey &&
          <Tooltip
          title="Sort"
          placement={row.numeric ? 'bottom-end' : 'bottom-start'}
          enterDelay={300}
          >
          <TableSortLabel
          active={orderBy === row.key}
          direction={order}
          onClick={this.createSortHandler(row.key)}
          >
          {row.alias}
          </TableSortLabel>
          </Tooltip>
        }
          </TableCell>
          );
      }, this)}
      </TableRow>
      </TableHead>
      );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
  theme.palette.type === 'light'
  ? {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  }
  : {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.dark,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  // console.log('tootolabar',props);
  const {handleClose, numSelected, editOnly,classes,TblTitel,noactions,selectedVal,BILLING,action,editpopup,deleteButtn,sendcustomAction1,sendcustomAction2,viewpopup,unselect,KOTACTIONS } = props;
  var selectedcount=numSelected;
  
  selectedcount=(unselect==true?0:selectedcount);


  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: selectedcount  > 0 && action!=true,
        ["backgroundColorToolbar"]: selectedcount  > 0 && action!=true,
      })}
    >
      <div className={classes.title}>
        {selectedcount > 0   && action!=true ? (
          <Typography color="inherit" variant="subtitle1">
             {/*<Button variant="contained" size="small" color="primary" style={{marginRight: 10,backgroundColor: "#677c8c"}} onClick={event =>viewpopup(selectedVal)} className={classes.fab} className={classes.margin}>
          View
        </Button>*/}
        {noactions!=true &&
          <div>
            <Button variant="contained" size="small" color="primary"  style={{marginRight: 10,backgroundColor: "rgb(35, 143, 189)"}} onClick={event =>editpopup(selectedVal)} className={classes.fab} className={classes.margin}>
          Edit
        </Button>
         <Button  variant="contained" size="small" color="primary" style={{marginRight: 10,backgroundColor: "#F44336"}} onClick={event =>deleteButtn(selectedVal)}className={classes.fab} className={classes.margin}>
          Delete
        </Button>
        </div>
      }
      {KOTACTIONS==true&&
        <div>
         <Button disabled={selectedVal.is_nc_kot=='yes' || selectedVal.isCancel=='yes' ||selectedVal.status==0 } variant="contained" size="small" color="primary"  style={{marginRight: 10,backgroundColor: "rgb(35, 143, 189)"}} onClick={event =>editpopup(selectedVal)} className={classes.fab} className={classes.margin}>
          Alter KOT
        </Button>
         <Button disabled={selectedVal.is_nc_kot=='yes' || selectedVal.isCancel=='yes' ||selectedVal.status==0 } variant="contained" size="small" color="primary" style={{marginRight: 10,backgroundColor: "#F44336"}} onClick={event =>sendcustomAction1(selectedVal)} className={classes.fab} className={classes.margin}>
          Cancel KOT
        </Button> <Button disabled={selectedVal.is_nc_kot=='yes' || selectedVal.isCancel=='yes' ||selectedVal.status==0 } variant="contained" size="small" color="primary" style={{marginRight: 10,backgroundColor: "#673AB7"}} onClick={event =>sendcustomAction2(selectedVal)} className={classes.fab} className={classes.margin}>
          Convert NCKOT
        </Button>
        </div>

      }
      {BILLING==true&&

         <Button disabled={selectedVal.is_nc_kot=='yes' || selectedVal.isCancel=='yes' } variant="contained" size="small" color="primary" style={{marginRight: 10,backgroundColor: "#F44336"}} onClick={event =>sendcustomAction1(selectedVal)} className={classes.fab} className={classes.margin}>
          View
        </Button>

      }
       {editOnly==true &&
       <div>
            <Button variant="contained" size="small" color="primary"  style={{marginRight: 10,backgroundColor: "rgb(35, 143, 189)"}} onClick={event =>editpopup(selectedVal)} className={classes.fab} className={classes.margin}>
          Edit
        </Button>
        </div>}
        <div onClick={handleClose} style={{position:'absolute','top':17,right:0}}>
        <Button variant="contained" size="small" color="primary"  style={{marginRight: 10,backgroundColor: "#F44336"}} onClick={event =>handleClose()} className={classes.fab} className={classes.margin}>Cancel</Button>
      </div>
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {TblTitel}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {/* {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )} */}
      </div>
    </Toolbar>
        );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props){
    // console.log('data.tblDataValues',props) 
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      datas:[],
      primaryKey:props.primaryKey,
      dataValues:props.tblDataValues,
      selected: [],
      selectedrow:"",
      selectedData:"",
    tableHeading:this.props.tableTitel,
      editForm:[],
      data: [],
      page: 0,
      unselect:false,
      // editOpen,
      rowsPerPage: 5,
    };
  }
  componentWillReceiveProps(data){
// console.log(data);
    this.setState({datas:data})
    if(data.unselectData){
      this.setState({unselect:data.unselectData});
    }
     // this.setState({editForm:data.tblHead.tblDtatasEdit});


     var mydata=[];
     var count=0;
     for(var m in data.tblDataValues){
      var groupingHeader={};
      for(var k in data.tblDataValues[m].fieldsArray){

        groupingHeader[data.tblDataValues[m].fieldsArray[k].name]=data.tblDataValues[m].fieldsArray[k].value;
      }
      // if(data.tblDataValues[m].hasOwnProperty('ismultiple')==true){
      //   groupingHeader[data.tblDataValues[m][]]
      // }


      groupingHeader['sno']=count+1;
      count+=1;
      mydata.push(groupingHeader)
    }


    this.setState({data:mydata});
    // console.log(mydata);
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (data) => {
    if(data.blockrecord){
      if(data.blockrecord!=""){
        this.setState({unselect:true});
        return;
      }else{

      }
    }else{

    }
    this.setState({unselect:false});
    this.setState({selectedrow:data.sno});
    this.setState({selected:20});
    this.setState({selectedData:data});
    // const { selected } = this.state;
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //     );
    // }

    // this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  // handleClickEditOpen = (data) => {
  //   this.setState({ open: true });
  // };

  editPopup =(n) =>{
    this.props.editOpen(n)
    // console.log(n)

  }
  handleClose=() =>{
    this.setState({unselect:true});
  }
   viewPopup =(n) =>{
    this.props.viewOpen(n)
    // console.log("viewwww",n)

  }
    dynDelete =(n) =>{
     var r = window.confirm("Are you sure you want to delete");
    // console.log('delete',n)
  if (r == true) {

    this.props.DeleteData(n)

  } else {
// console.log("successfully deleted");
  }
  }
  sendcustomAction1=(n) =>{
  // console.log('cancekot');
  var obj={action:'cancel',kot_id:n.kot_id,data:n};
  this.props.sendcustomAction1(obj);
  }

  sendcustomAction2=(n) =>{
    // console.log("sendcustomAction2");
    var obj={action:'convert',kot_id:n.kot_id}
    this.props.sendcustomAction1(obj);
  }

  render() {
// console.log("newprops",this.props);
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page,selectedrow,selectedData } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (

      <Paper className={classes.root} style={{position:'relative'}}>
      <EnhancedTableToolbar handleClose={this.handleClose} editOnly={this.props.editOnly} action={this.props.action} noactions={this.props.noactions} BILLING={this.props.BILLING} sendcustomAction1={this.sendcustomAction1} sendcustomAction2={this.sendcustomAction2} KOTACTIONS={this.props.KOTACTIONS} unselect={this.state.unselect} editpopup={this.editPopup} deleteButtn={this.dynDelete} viewpopup={this.viewPopup} numSelected={parseInt(selected)} selectedVal={selectedData} TblTitel={this.state.tableHeading}/>
      <div className={classes.tableWrapper}>
      <Table className={classes.table} aria-labelledby="tableTitle">
      <EnhancedTableHead primaryKey={this.state.primaryKey} tblHead={this.state.datas} selectedData={selectedData} numSelected={selected} order={order} orderBy={orderBy} onSelectAllClick={this.handleSelectAllClick}onRequestSort={this.handleRequestSort} rowCount={data.length}/>
      <TableBody>
      {stableSort(data, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((n,index) => {

          // console.log("console",n);
            // console.log(this.state.selectedrow);
          return (
            

            <TableRow
            hover

            role="checkbox"
            aria-checked={this.state.selectedrow == n.sno}
            tabIndex={-1}
            key={n.sno}
            onClick={() =>this.handleClick(n)}
            selected={this.state.selectedrow == n.sno}
            >
            <TableCell style={{paddingLeft:"30px"}}>
            <div>{n.sno}</div>

            </TableCell>
           
            {this.state.datas.tblDtatas.length> 0&&this.state.datas.tblDtatas.filter((row) =>row.visible===true).map((row,key) =>{
              var checkempty=!n[row.key]?'':n[row.key];
              n[row.key]=checkempty;
              return(
                <TableCell key ={key} component="th" scope="row" padding="none">
                {row.key!=this.state.primaryKey ?n[row.key]:''}
                </TableCell>
                )
            })}
            {n.blockrecord&&n.blockrecord!=""&&
            <div style={{position:'absolute','background':n.blockcolor}} className="blockrecordclass" >
          {n.blockrecord}
        </div>
            }
            </TableRow>
            );
        })}

        </TableBody>
        </Table>
        </div>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </Paper>
        );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);