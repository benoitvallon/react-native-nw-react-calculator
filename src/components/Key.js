'use strict';

var React = require('react');

var Key = React.createClass({
  handleClick: function(event) {
    console.log('click', this.props.keyValue);
  },

  render: function() {
    var classString = 'key key-' + this.props.keyType;
    var classOperation = '';
    if(this.props.keyType === 'operation') {
      classOperation = 'operator ';
      if(this.props.keyValue === '+') { classOperation += 'add'; }
      if(this.props.keyValue === '-') { classOperation += 'substract'; }
      if(this.props.keyValue === ':') { classOperation += 'divide'; }
      if(this.props.keyValue === 'x') { classOperation += 'multiply'; }
    }
    if(this.props.keyType === 'action') {
      classOperation = 'action ';
      if(this.props.keyValue === '<<') { classOperation += 'back'; }
      if(this.props.keyValue === '=') { classOperation += 'equal'; }
    }
    return (
      <div className={classString}>
        <div className={classOperation}
          onClick={this.handleClick}>{this.props.keyValue}</div>
      </div>
    );
  }
});

module.exports = Key;
