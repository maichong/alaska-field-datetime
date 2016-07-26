/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-17
 * @author Liang <liang@maichong.it>
 */

'use strict';

const alaska = require('alaska');
const moment = require('moment');

class DatetimeField extends alaska.Field {
  init() {
    let field = this;
    field.format = field.format || 'YYYY-MM-DD HH:mm:ss';
    field.dateFormat = field.dateFormat || 'YYYY-MM-DD';
    field.timeFormat = field.timeFormat || 'HH:mm:ss';
    this.underscoreMethod('format', function (format) {
      return moment(this.get(field.path)).format(format || field.format);
    });
  }

  createFilter(filter) {
    if (!filter) return;
    let value;

    //精确
    if (typeof filter === 'string' || filter instanceof Date) {
      value = filter;
    } else if (typeof filter === 'object' && filter.value) {
      value = filter.value;
    }
    if (value) {
      value = moment(value);
      if (!value.isValid()) {
        return undefined;
      }
      let end = moment(value).endOf('day').toDate();
      let start = moment(value).startOf('day').toDate();
      return { $lte: end, $gte: start };
    }

    //区间
    let bt;
    if (filter instanceof Array) {
      bt = filter;
    } else if (filter.$bt && filter.$bt instanceof Array) {
      bt = filter.$bt;
    } else if (filter.bt && filter.bt instanceof Array) {
      bt = filter.bt;
    }
    if (bt && bt.length === 2) {
      let start = moment(bt[0]);
      let end = moment(bt[1]);
      if (start.isValid() && end.isValid()) {
        return {
          $gte: start.startOf('day').toDate(),
          $lte: end.endOf('day').toDate()
        };
      }
    }

    //比较
    ['gt', 'gte', 'lt', 'lte'].forEach((key) => {
      let val = filter[key] || filter['$' + key];
      if (val) {
        if (!(val instanceof Date)) {
          val = moment(val);
          if (!val.isValid()) return;
          if (key[1] === 'g') {
            //$gt $gte
            val = val.startOf('day').toDate();
          } else {
            //$lt $lte
            val = val.endOf('day').toDate();
          }
        }
        if (!value) {
          value = {};
        }
        value['$' + key] = val;
      }
    });
    if (value) {
      return value;
    }
  }
}

DatetimeField.views = {
  cell: {
    name: 'DatetimeFieldCell',
    path: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'DatetimeFieldView',
    path: __dirname + '/lib/view.js'
  },
  filter: {
    name: 'DatetimeFieldFilter',
    path: __dirname + '/lib/filter.js'
  }
};

DatetimeField.plain = Date;

DatetimeField.options = ['min', 'max', 'expires'];

DatetimeField.viewOptions = ['min', 'max', 'format', 'dateFormat', 'timeFormat']

module.exports = DatetimeField;
