'use strict';

var React = require('react');
var CalculatorStore = require('../stores/CalculatorStore');

function getCalculatorState() {
  return {
    display: CalculatorStore.getDisplay()
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
        {this.state.display}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getCalculatorState());
  }
});

module.exports = Screen;
