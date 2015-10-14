'use strict';

import React, { Component } from 'react';
import CalculatorActions from '../actions/CalculatorActions';

class Key extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHighlighted: false
    };

    // Bind callback methods to make `this` the correct context.
    this.handleClick = this.handleClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  handleClick(event) {
    CalculatorActions.create(this.props.keyType, this.props.keyValue);
  }

  onMouseDown(event) {
    this.setState({
      isHighlighted: true
    });
  }

  onMouseUp(event) {
    this.setState({
      isHighlighted: false
    });
  }
}

module.exports = Key;
