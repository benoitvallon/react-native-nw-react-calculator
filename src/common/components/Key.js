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

  render() {
    var classString = 'key key-' + this.props.keyType;
    if(this.state.isHighlighted) {
      classString += ' highlight';
    }
    var classOperation = '';
    if(this.props.keyType === 'operator') {
      classOperation = 'operator ' + this.props.keyValue;
    }
    if(this.props.keyType === 'action') {
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
}

module.exports = Key;
