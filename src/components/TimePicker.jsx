import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
  grid: {
    width: '100%',
  },
};

class MaterialUITimePickers extends React.Component {
  constructor(props) {
    super(props);
    console.log('newProps',props);
    this.state = { selectedDate:this.props.value === "" || this.props.value === "null" ? null : this.props.value};
  }

  handleDateChange = (date,columnDate) => {
    var columnDate = this.props.keyDate;
    this.setState({ selectedDate: date });
    this.props.receiveDate(columnDate,date);
  };

  render() {
     // const beginDate = moment(values.BeginDate_1).format('YYYY-MM-DD')
     const { classes,dateAlias,keyDate, value} = this.props;
     const { selectedDate } = this.state;

     console.log("keyyy",keyDate);

     return (
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <Grid container className={classes.grid}>
       <TimePicker
       margin="normal"
       label="Time picker"
       value={selectedDate}
       onChange={this.handleDateChange}
       clearable={this.props.clear ? true : false}
       />
       </Grid>
       </MuiPickersUtilsProvider>
       );
   }
 }

 MaterialUITimePickers.propTypes = {
   classes: PropTypes.object.isRequired,
 };

 export default withStyles(styles)(MaterialUITimePickers);