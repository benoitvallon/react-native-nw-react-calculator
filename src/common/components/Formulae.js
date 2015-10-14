'use strict';

import React, { Component } from 'react';
import CalculatorStore from '../stores/CalculatorStore';

function getCalculatorState() {
  return {
    displayFormulae: CalculatorStore.getDisplayFormulae()
  };
}

class Formulae extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayFormulae: CalculatorStore.getDisplayFormulae()
    };

    // Bind callback methods to make `this` the correct context.
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CalculatorStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CalculatorStore.removeChangeListener(this._onChange);
  }

  dynamicClass(opeartor) {
    return 'group ' + opeartor;
  }

  render() {
    return (
      <div className='formulae'>
        {this.state.displayFormulae.map(function(formula) {
          return <span className={this.dynamicClass(formula.operator)}>{formula.literal}</span>
        }, this)}
      </div>
    );
  }

  _onChange() {
    this.setState(getCalculatorState());
  }
}

module.exports = Formulae;
