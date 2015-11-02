'use strict';

import { Component } from 'react';
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

  handleClick() {
    CalculatorActions.typeKey(this.props.keyType, this.props.keyValue);
  }

  onMouseDown() {
    this.setState({
      isHighlighted: true
    });
  }

  onMouseUp() {
    this.setState({
      isHighlighted: false
    });
  }
}

module.exports = Key;
