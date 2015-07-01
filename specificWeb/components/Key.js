'use strict';

var React = require('react');
var CalculatorActions = require('../../common/actions/CalculatorActions');

var Key = React.createClass({

  getInitialState: function() {
    return {isHighlighted: false};
  },

  handleClick: function(event) {
    CalculatorActions.create(this.props.keyType, this.props.keyValue);
  },

  onMouseDown: function(event) {
    this.setState({
      isHighlighted: true
    });
  },

  onMouseUp: function(event) {
    this.setState({
      isHighlighted: false
    });
  },

  render: function() {
    var classString = 'key key-' + this.props.keyType;
    if(this.state.isHighlighted) {
      classString += ' highlight';
    }
    var classOperation = '';
    if(this.props.keyType === 'operator') {
      classOperation = 'operator ' + this.props.keyValue;
    }
    if(this.props.keyType === 'action') {
      classOperation = 'action ' + this.props.keyValue;
    }
    if(this.props.keyType === 'number') {
      return (
        <div className={classString}
            onClick={this.handleClick}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}>
          <div className={classOperation}>{this.props.keySymbol}</div>
        </div>
      );
    } else {
      return (
        <div className={classString}>
          <div className={classOperation}
            onClick={this.handleClick}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}>{this.props.keySymbol}</div>
        </div>
      );
    }
  }
});

module.exports = Key;
