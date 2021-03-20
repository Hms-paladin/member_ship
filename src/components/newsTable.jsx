import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
// import "node_modules/video-react/dist/video-react.css";
import { Player, BigPlayButton } from 'video-react';
import dateFormat from 'dateformat';
// import 'antd/dist/antd.css';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import Highlighter from 'react-highlight-words';
// import {
//    Input, Icon,
// } from 'antd';

const theme = createMuiTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

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
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  // {
  //   id: "name",
  //   numeric: false,
  //   disablePadding: true,
  //   // label: "emp_code (100g serving)"
  // },
  { id: "news_Title", numeric: false, disablePadding: false, label: "Title" },
  { id: "news_Description", numeric: false, disablePadding: false, label: "Description" },
  { id: "news_ImagePath", numeric: false, disablePadding: false, label: "News Images" },
  { id: "news_icon", numeric: false, disablePadding: false, label: "Icons" }

];
// var common =
// localStorage["language"] == "RTL"
// ? require("../translations/common/tablenamertl.json")
// : require("../translations/common/tablenameltr.json");

class EnhancedItemTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead

        style={{
          backgroundColor: "#238fbd",

        }}
      >
        <TableRow>
          <TableCell padding="checkbox"
            style={{
              color: "white"
            }}>

            SI.No
        </TableCell>
          {rows.map(
            row => (
              <TableCell
                style={{
                  color: "white"
                }}

                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedItemTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedItemTableToolbar = props => {
  const {
    handleClose,
    editPopup,
    numSelected,
    classes,
    itemTitle,
    action,
    unselect,
    viewpopup,
    deletepopup
  } = props;
  var selectedcount = numSelected;

  selectedcount = unselect == true ? 0 : selectedcount;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: selectedcount > 0 && action != true,
        ["backgroundColorToolbar"]: selectedcount > 0 && action != true
      })}
    >
      <div className={classes.title}>
        {selectedcount > 0 && action != true ? (
          <Typography color="inherit" variant="subtitle1">
            <div>
              {/*<Button
        variant="contained"
        size="small"
        color="primary"
        style={{ marginRight: 10, backgroundColor: "#F44336" }}
        onClick={() =>viewpopup()}
        className={classes.fab}
        className={classes.margin}
        >
        view
        </Button>*/}
              <Button
                style={{ marginRight: 10, backgroundColor: "rgb(35, 143, 189)" }}

                variant="contained"
                size="small"
                color="primary"
                onClick={() => editPopup()}
                className={classes.fab}
                className={classes.margin}
              >
                Edit
        </Button>
              <Button
                style={{ marginRight: 10, backgroundColor: "#F44336" }}
                variant="contained"
                size="small"
                color="primary"
                onClick={() => deletepopup()}
                className={classes.fab}
                className={classes.margin}
              >
                Delete
        </Button>
            </div>
            <div
              onClick={handleClose}
              className=
              "cancelRightButton"


              style={{ position: 'absolute', 'top': 17, right: 0 }}
            >
              <Button
                style={{ marginRight: 10, backgroundColor: "#F44336" }}
                variant="contained"
                size="small"
                color="primary"
                onClick={event => handleClose()}
                className={classes.fab}
                className={classes.margin}
              >
                cancel
        </Button>

            </div>
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              {itemTitle}
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {/* {numSelected > 0 ? (
          <Tooltip title="Delete">
        <IconButton aria-label="Delete"><DeleteIcon /></IconButton>
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

EnhancedItemTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedItemTableToolbar = withStyles(toolbarStyles)(EnhancedItemTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class EnhancedNewsTable extends React.Component {
  constructor(props) {
    console.log("tblDataValues", props);
    super(props);
    this.state = {
      order: "asc",
      orderBy: "calories",
      tableItemTitle: this.props.tableTitel,
      selected: [],
      dataValues: props.tblDataValues,
      data: [],
      page: 0,
      rowsPerPage: 5,
      selectedrow: "",
      unselect: false,
      searchText: '',
    };
  }

  componentWillReceiveProps(data) {
    console.log("tblDataValues", data.tblDataValues)
    if (data.unselectData) {
      this.setState({ unselect: data.unselectData });
    }
    var mydata = [];
    var count = 0;

    if (data.tblDataValues) {

      for (var i in data.tblDataValues) {
        console.log(data)
        count += 1;
        var obj = { id: count, news_Id: data.tblDataValues[i].news_Id, news_Title: data.tblDataValues[i].news_Title, news_Description: data.tblDataValues[i].news_Description, news_PublishedDate: data.tblDataValues[i].news_PublishedDate, news_ImagePath: data.tblDataValues[i].news_ImagePath, news_icon: data.tblDataValues[i].news_icon, completeDetails: data.tblDataValues[i] }
        mydata.push(obj);

      }
      this.setState({ data: mydata });

    }
    // console.log(this.state.data);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
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

    console.log(data);
    this.setState({ unselect: false });
    this.setState({ selectedrow: data.id });
    this.setState({ selected: 20 });
    this.setState({ selectedData: data });
    this.setState({ selectedEditData: data });
    this.setState({ selectedDeleteData: data });

  };

  handleChangePage = (event, page) => {
    this.setState({ unselect: true });
    this.setState({ page });
  };
  viewPopup = () => {

    this.props.viewOpen(this.state.selectedData);
  };
  handleChangeRowsPerPage = event => {
    this.setState({ unselect: true });
    this.setState({ rowsPerPage: event.target.value });
  };
  handleClose = () => {
    this.setState({ unselect: true });


  }
  editPopup = (data) => {
    console.log(data)
    this.props.editOpen(this.state.selectedEditData);
  }
  deletepopup = (data) => {
    // alert("deleted successfully",data)
    console.log("deleted", data)

    var r = window.confirm("Are you sure you want to delete");
    if (r == true) {
      this.props.deteted(this.state.selectedDeleteData);

    } else {

    }

  }
  CustomDate(MilliSeconds) {

    console.log("millisec", MilliSeconds)
    var value = Number(MilliSeconds);

    var date = new Date(value);

    return dateFormat(MilliSeconds, "yyyy-mm-dd");

  }



  //filter.....................
  // getColumnSearchProps = (id) => ({
  //     filterDropdown: ({
  //       setSelectedKeys, selectedKeys, confirm, clearFilters,
  //     }) => (
  //       <div style={{ padding: 8 }}>
  //         <Input
  //           ref={node => { this.searchInput = node; }}
  //           placeholder={`Search ${id}`}
  //           value={selectedKeys[0]}
  //           onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
  //           onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
  //           style={{ width: 188, marginBottom: 8, display: 'block' }}
  //         />
  //         <Button
  //           type="primary"
  //           onClick={() => this.handleSearch(selectedKeys, confirm)}
  //           icon="search"
  //           size="small"
  //           style={{ width: 90, marginRight: 8 }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => this.handleReset(clearFilters)}
  //           size="small"
  //           style={{ width: 90 }}
  //         >
  //           Reset
  //         </Button>
  //       </div>
  //     ),
  //     filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
  //     onFilter: (value, record) => record[id].toString().toLowerCase().includes(value.toLowerCase()),
  //     onFilterDropdownVisibleChange: (visible) => {
  //       if (visible) {
  //         setTimeout(() => this.searchInput.select());
  //       }
  //     },

  //   })


  //  handleSearch = (selectedKeys, confirm) => {
  //     confirm();
  //     this.setState({ searchText: selectedKeys[0] });
  //   }

  //   handleReset = (clearFilters) => {
  //     clearFilters();
  //     this.setState({ searchText: '' });
  //   }
  //..........................................


  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    console.log("fdd", this.state.data.map(val => val.news_PublishedDate))
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    console.log(this.state.data,"news_PublishedDate")
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} style={{ position: "relative" }}>
        <EnhancedItemTableToolbar
          handleClose={this.handleClose}
          itemTitle={this.state.tableItemTitle}
          numSelected={parseInt(selected)}
          viewpopup={this.viewPopup}
          unselect={this.state.unselect}
          editPopup={this.editPopup}
          deletepopup={this.deletepopup}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedItemTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              numSelected={selected}
              action={this.props.action}
            />
            <TableBody>
              
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  {/*const isSelected = this.isSelected(n.id);*/ }
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(n)}
                      role="checkbox"
                      aria-checked={this.state.selectedrow == n.id}
                      tabIndex={-1}
                      key={n.id}
                      selected={this.state.selectedrow == n.id}
                    >

                      <TableCell align="right">{n.id}</TableCell>
                      <TableCell align="left"><div className="text-truncate">{n.news_Title}</div></TableCell>
                      <TableCell align="left"><div className="text-truncate">{n.news_Description}</div></TableCell>
                      {/* <TableCell align="left">{this.CustomDate(n.news_PublishedDate)}</TableCell> */}
                      <TableCell align="left"><img src={n.news_ImagePath} style={{ width: "100px" }} /></TableCell>
                      <TableCell align="left"><img src={n.news_icon} style={{ width: "100px" }} /></TableCell>
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
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedNewsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedNewsTable);
