/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import ContextPure from 'material-ui/lib/mixins/context-pure';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
import { shallowEqual } from 'alaska-admin-view';
const moment = require('moment');
export default class DatetimeFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static mixins = [
    ContextPure
  ];

  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.state = {
      value: props.value ? new Date(props.value) : new Date
    };
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || !shallowEqual(state, this.state);
  }

  formatDate(date) {
    return moment(date).format(this.props.field.format);
  }

  handleDateChange(event, value) {
    let date = new Date(this.state.value);
    date.setFullYear(value.getFullYear());
    date.setMonth(value.getMonth());
    date.setDate(value.getDate());
    this.setState({ value: date });
    this.props.onChange && this.props.onChange(date);
  }

  handleTimeChange(event, value) {
    let date = new Date(this.state.value);
    date.setHours(value.getHours());
    date.setMinutes(value.getMinutes());
    date.setSeconds(value.getSeconds());
    this.setState({ value: date });
    this.props.onChange && this.props.onChange(date);
  }

  render() {
    let props = this.props;
    let state = this.state;
    return (
      <div>
        <DatePicker
          autoOk={true}
          disabled={props.disabled}
          floatingLabelText={props.field.label}
          onChange={this.handleDateChange}
          formatDate={this.formatDate}
          value={state.value}
          style={{marginRight:10,display:'inline-block'}}
        />
        <TimePicker
          disabled={props.disabled}
          autoOk={true}
          format={this.props.field.timeFormat}
          defaultTime={state.value}
          onChange={this.handleTimeChange}
          style={{display:'inline-block'}}
        />
      </div>
    );
  }
}
