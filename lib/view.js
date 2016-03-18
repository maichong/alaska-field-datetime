'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getMuiTheme = require('material-ui/lib/styles/getMuiTheme');

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _contextPure = require('material-ui/lib/mixins/context-pure');

var _contextPure2 = _interopRequireDefault(_contextPure);

var _datePicker = require('material-ui/lib/date-picker/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = require('material-ui/lib/time-picker/time-picker');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _alaskaAdminView = require('alaska-admin-view');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-17
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var moment = require('moment');

var DatetimeFieldView = function (_React$Component) {
  _inherits(DatetimeFieldView, _React$Component);

  function DatetimeFieldView(props, context) {
    _classCallCheck(this, DatetimeFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatetimeFieldView).call(this, props));

    _this.handleDateChange = _this.handleDateChange.bind(_this);
    _this.handleTimeChange = _this.handleTimeChange.bind(_this);
    _this.formatDate = _this.formatDate.bind(_this);
    _this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : (0, _getMuiTheme2.default)(),
      views: context.views,
      settings: context.settings,
      value: props.value ? new Date(props.value) : new Date()
    };
    return _this;
  }

  _createClass(DatetimeFieldView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        muiTheme: this.state.muiTheme,
        views: this.context.views,
        settings: this.context.settings
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var newState = {};
      if (nextContext.muiTheme) {
        newState.muiTheme = nextContext.muiTheme;
      }
      if (nextContext.views) {
        newState.views = nextContext.views;
      }
      this.setState(newState);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model') || !(0, _alaskaAdminView.shallowEqual)(state, this.state);
    }
  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      return moment(date).format(this.props.field.format);
    }
  }, {
    key: 'handleDateChange',
    value: function handleDateChange(event, value) {
      var date = new Date(this.state.value);
      date.setFullYear(value.getFullYear());
      date.setMonth(value.getMonth());
      date.setDate(value.getDate());
      this.setState({ value: date });
      this.props.onChange && this.props.onChange(date);
    }
  }, {
    key: 'handleTimeChange',
    value: function handleTimeChange(event, value) {
      var date = new Date(this.state.value);
      date.setHours(value.getHours());
      date.setMinutes(value.getMinutes());
      date.setSeconds(value.getSeconds());
      this.setState({ value: date });
      this.props.onChange && this.props.onChange(date);
    }
    //{props.disabled}

  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_datePicker2.default, {
          autoOk: true,
          disabled: false,
          floatingLabelText: props.field.label,
          onChange: this.handleDateChange,
          formatDate: this.formatDate,
          style: { marginRight: "10px", display: 'inline-block' }
        }),
        _react2.default.createElement(_timePicker2.default, {
          disabled: false,
          autoOk: true,
          format: this.props.field.timeFormat,
          defaultTime: state.value,
          onChange: this.handleTimeChange,
          style: { display: 'inline-block' }
        })
      );
    }
  }]);

  return DatetimeFieldView;
}(_react2.default.Component);

DatetimeFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
DatetimeFieldView.contextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
DatetimeFieldView.childContextTypes = {
  muiTheme: _react2.default.PropTypes.object,
  views: _react2.default.PropTypes.object,
  settings: _react2.default.PropTypes.object
};
DatetimeFieldView.mixins = [_contextPure2.default];
exports.default = DatetimeFieldView;