'use strict';

var React = require('react');
var CalculatorStore = require('../stores/CalculatorStore');

function getCalculatorState() {
  return {
    allKeys: CalculatorStore.getKeys()
  };
}

var Screen = React.createClass({

  getInitialState: function() {
    return getCalculatorState();
  },

  componentDidMount: function() {
    CalculatorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CalculatorStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className='screen'>
        26 {this.state.allKeys}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getCalculatorState());
  }
});

module.exports = Screen;
