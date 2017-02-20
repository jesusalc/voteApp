(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-dom', 'classnames', '../utils/PropTypes/requiredForA11yIfNot', '../utils/PropTypes/invalidIf', './contextTypes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-dom'), require('classnames'), require('../utils/PropTypes/requiredForA11yIfNot'), require('../utils/PropTypes/invalidIf'), require('./contextTypes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom, global.classnames, global.requiredForA11yIfNot, global.invalidIf, global.contextTypes);
    global.DataTable = mod.exports;
  }
})(this, function (exports, _react, _reactDom, _classnames, _requiredForA11yIfNot, _invalidIf, _contextTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _requiredForA11yIfNot2 = _interopRequireDefault(_requiredForA11yIfNot);

  var _invalidIf2 = _interopRequireDefault(_invalidIf);

  var _contextTypes2 = _interopRequireDefault(_contextTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DataTable = function (_PureComponent) {
    _inherits(DataTable, _PureComponent);

    function DataTable(props) {
      _classCallCheck(this, DataTable);

      var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

      _this.state = {
        allSelected: props.defaultSelectedRows.filter(function (b) {
          return b;
        }).length === 0,
        selectedRows: props.defaultSelectedRows
      };

      _this._initializeRows = _this._initializeRows.bind(_this);
      _this._toggleAllRows = _this._toggleAllRows.bind(_this);
      _this._toggleSelectedRow = _this._toggleSelectedRow.bind(_this);
      return _this;
    }

    _createClass(DataTable, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _props = this.props,
            uncheckedIconChildren = _props.uncheckedIconChildren,
            uncheckedIconClassName = _props.uncheckedIconClassName,
            checkedIconChildren = _props.checkedIconChildren,
            checkedIconClassName = _props.checkedIconClassName,
            plain = _props.plain,
            baseId = _props.baseId;


        return {
          uncheckedIconChildren: uncheckedIconChildren,
          uncheckedIconClassName: uncheckedIconClassName,
          checkedIconChildren: checkedIconChildren,
          checkedIconClassName: checkedIconClassName,
          plain: plain,
          allSelected: this.state.allSelected,
          selectedRows: this.state.selectedRows,
          toggleAllRows: this._toggleAllRows,
          toggleSelectedRow: this._toggleSelectedRow,
          baseId: baseId,
          baseName: baseId + '-control'
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._initializeRows();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.children !== prevProps.children) {
          this._initializeRows();
        }
      }
    }, {
      key: '_toggleAllRows',
      value: function _toggleAllRows() {
        var allSelected = !this.state.allSelected;
        if (this.props.onRowToggle) {
          this.props.onRowToggle(-1, allSelected, allSelected ? this.state.selectedRows.length : 0);
        }

        this.setState({
          allSelected: allSelected,
          selectedRows: this.state.selectedRows.map(function () {
            return allSelected;
          })
        });
      }
    }, {
      key: '_toggleSelectedRow',
      value: function _toggleSelectedRow(row) {
        var selectedRows = this.state.selectedRows.slice();
        selectedRows[row] = !selectedRows[row];
        var selectedCount = selectedRows.filter(function (selected) {
          return selected;
        }).length;

        if (this.props.onRowToggle) {
          this.props.onRowToggle(row, selectedRows[row], selectedCount);
        }

        this.setState({ selectedRows: selectedRows, allSelected: selectedCount === selectedRows.length });
      }
    }, {
      key: '_initializeRows',
      value: function _initializeRows() {
        var rows = (0, _reactDom.findDOMNode)(this).querySelectorAll('.md-data-table tbody tr').length;
        if (rows === this.state.selectedRows.length) {
          return;
        }

        var selectedRows = [];
        for (var i = 0; i < rows; i++) {
          selectedRows[i] = this.state.selectedRows[i] || false;
        }

        this.setState({
          selectedRows: selectedRows,
          allSelected: selectedRows.map(function (b) {
            return b;
          }).length === 0
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            className = _props2.className,
            children = _props2.children,
            plain = _props2.plain,
            responsive = _props2.responsive,
            props = _objectWithoutProperties(_props2, ['className', 'children', 'plain', 'responsive']);

        delete props.checkedIconChildren;
        delete props.checkedIconClassName;
        delete props.uncheckedIconChildren;
        delete props.uncheckedIconClassName;
        delete props.defaultSelectedRows;
        delete props.baseId;
        delete props.onRowToggle;

        var table = _react2.default.createElement(
          'table',
          _extends({}, props, {
            className: (0, _classnames2.default)('md-data-table', {
              'md-data-table--plain': plain
            }, className)
          }),
          children
        );

        return responsive ? _react2.default.createElement(
          'div',
          { className: 'md-data-table--responsive' },
          table
        ) : table;
      }
    }]);

    return DataTable;
  }(_react.PureComponent);

  DataTable.propTypes = {
    /**
     * A base id to use for every checkbox or `EditDialogColumn` in the data table. This is
     * required for a11y if the data table is not plain.
     */
    baseId: (0, _requiredForA11yIfNot2.default)(_react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]), 'plain'),

    /**
     * Optional style to apply to the table.
     */
    style: _react.PropTypes.object,

    /**
     * An optional className to apply to the table.
     */
    className: _react.PropTypes.string,

    /**
     * The table contents to display. This *should* be a list of `TableHeader` and `TableBody`
     * components.
     */
    children: _react.PropTypes.node.isRequired,

    /**
     * An optional array of booleans denoting if a row is selected.
     * This is an associative array so the index must match the row
     * number in the `TableBody` component.
     */
    defaultSelectedRows: _react.PropTypes.arrayOf(_react.PropTypes.bool).isRequired,

    /**
     * Boolean if the table is responsive. This will wrap the table in a container
     * that allows scrolling to the right if overflow exists.
     */
    responsive: _react.PropTypes.bool.isRequired,

    /**
     * Boolean if this table should not include the checkboxes on each row.
     * This really means that the entire table is unselectable and you wish
     * to display as a normal table.
     */
    plain: _react.PropTypes.bool,

    /**
     * The icon className to use for the unchecked row icon. This value
     * will be passed down as `context`.
     */
    uncheckedIconClassName: _react.PropTypes.string.isRequired,

    /**
     * The icon children to use for the unchecked row icon. This value
     * will be passed down as `context`.
     */
    uncheckedIconChildren: _react.PropTypes.node,

    /**
     * The icon className to use for the checked row icon. This value
     * will be passed down as `context`.
     */
    checkedIconClassName: _react.PropTypes.string.isRequired,

    /**
     * The icon children to use for the checked row icon. This value
     * will be passed down as `context`.
     */
    checkedIconChildren: _react.PropTypes.node,

    /**
     * An optional function to call when a non-plain data table has a row toggled.
     * The callback will include the selected row id, the boolean if it is now selected,
     * and the count of rows that are selected. If the checkbox in the `TableHeader` was
     * clicked, the selected row id will be `-1`.
     *
     * ```js
     * onRowToggle(3, true, 8); // 4th row was toggled
     * onRowToggle(-1, true, 15); // select all checkbox was toggled on.
     * ```
     */
    onRowToggle: (0, _invalidIf2.default)(_react.PropTypes.func, 'plain')
  };
  DataTable.defaultProps = {
    uncheckedIconChildren: 'check_box_outline_blank',
    uncheckedIconClassName: 'material-icons',
    checkedIconChildren: 'check_box',
    checkedIconClassName: 'material-icons',
    defaultSelectedRows: [],
    responsive: true
  };
  DataTable.childContextTypes = _contextTypes2.default;
  exports.default = DataTable;
});