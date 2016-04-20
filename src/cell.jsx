/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
const moment = require('moment');

export default class DatetimeFieldCell extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  shouldComponentUpdate(props) {
    return props.value != this.props.value;
  }

  render() {
    let props = this.props;
    if (!props.value) {
      return <div></div>;
    }
    return (
      <div>
        {moment(props.value).format(props.field.format)}
      </div>
    );
  }
}
