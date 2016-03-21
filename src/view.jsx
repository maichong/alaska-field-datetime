/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { shallowEqual } from 'alaska-admin-view';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import 'moment/locale/zh-cn';

export default class DatetimeFieldView extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? new Date(props.value) : new Date
    };
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || !shallowEqual(state, this.state);
  }

  render() {
    let props = this.props;
    let value = props.value;
    let field = props.field;
    if (field.format && value) {
      value = moment(value).format(field.format);
    }
    return (
      <div className="form-group">
        <label className="col-sm-2 control-label">{field.label}</label>
        <div className="col-sm-10">
          <DateTime
            value={value}
            dateFormat={field.dateFormat}
            timeFormat={field.timeFormat}
            onChange={props.onChange}
          />
        </div>
      </div>
    );
  }
}
