'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alaskaAdminView = require('alaska-admin-view');

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

require('react-datetime/css/react-datetime.css');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/zh-cn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2016-03-17
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DatetimeFieldView = function (_React$Component) {
  _inherits(DatetimeFieldView, _React$Component);

  function DatetimeFieldView(props) {
    _classCallCheck(this, DatetimeFieldView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatetimeFieldView).call(this, props));

    _this.state = {
      value: props.value ? new Date(props.value) : new Date()
    };
    return _this;
  }

  _createClass(DatetimeFieldView, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return !(0, _alaskaAdminView.shallowEqual)(props, this.props, 'data', 'onChange', 'model') || !(0, _alaskaAdminView.shallowEqual)(state, this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var value = props.value;
      var field = props.field;
      if (field.format && value) {
        value = (0, _moment2.default)(value).format(field.format);
      }
      var errorText = props.errorText;
      var help = field.help;
      var className = 'form-group';
      if (errorText) {
        className += ' has-error';
        help = errorText;
      }
      var helpElement = help ? _react2.default.createElement(
        'p',
        { className: 'help-block' },
        help
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'label',
          { className: 'col-sm-2 control-label' },
          field.label
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-sm-10' },
          _react2.default.createElement(_reactDatetime2.default, {
            value: value,
            dateFormat: field.dateFormat,
            timeFormat: field.timeFormat,
            onChange: props.onChange
          }),
          helpElement
        )
      );
    }
  }]);

  return DatetimeFieldView;
}(_react2.default.Component);

DatetimeFieldView.propTypes = {
  children: _react2.default.PropTypes.node
};
exports.default = DatetimeFieldView;