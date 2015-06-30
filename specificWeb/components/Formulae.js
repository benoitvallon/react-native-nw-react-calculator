'use strict';

var React = require('react');
var CalculatorStore = require('../../common/stores/CalculatorStore');

function getCalculatorState() {
  return {
    displayFormulae: CalculatorStore.getDisplayFormulae()
  };
}

var Formulae = React.createClass({

  getInitialState: function() {
    return getCalculatorState();
  },

  componentDidMount: function() {
    CalculatorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CalculatorStore.removeChangeListener(this._onChange);
  },

  dynamicClass: function(className) {
    if(className === '+') { className = 'add'; }
    if(className === '-') { className = 'substract'; }
    if(className === '÷') { className = 'divide'; }
    if(className === 'x') { className = 'multiply'; }
    return 'group ' + className;
  },

  render: function() {
    return (
      <div className='formulae'>
          {this.state.displayFormulae.map(function(formula) {
            return <span className={this.dynamicClass(formula.sign)}>{formula.literal}</span>
          }, this)}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getCalculatorState());
  }

});

module.exports = Formulae;
