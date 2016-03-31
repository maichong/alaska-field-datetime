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
import 'moment/locale/zh-tw';
import 'moment/locale/zh-cn';

export default class DatetimeFieldView extends React.Component {

  static propTypes = {};
  static contextTypes = {
    settings: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? new Date(props.value) : new Date
    };
  }

  componentWillMount() {
    moment.locale(this.context.settings.locale);
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || !shallowEqual(state, this.state);
  }

  render() {
    let props = this.props;
    let value = props.value;
    let field = props.field;
    let disabled = props.disabled;
    if (field.format && value) {
      value = moment(value).format(field.format);
    }
    let errorText = props.errorText;
    let help = field.help;
    let className = 'form-group';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let helpElement = help ? <p className="help-block">{help}</p> : null;
    return (
      <div className={className}>
        <label className="col-sm-2 control-label">{field.label}</label>
        <div className="col-sm-10">
          {
            disabled ? <input type="text" className="form-control" disabled value={value}/> : <DateTime
              value={value}
              dateFormat={field.dateFormat}
              timeFormat={field.timeFormat}
              onChange={props.onChange}
            />
          }
          {helpElement}
        </div>
      </div>
    );
  }
}
