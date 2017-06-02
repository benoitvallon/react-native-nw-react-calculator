'use strict';

import { Component } from 'react';

import CalculatorActions from '../actions/CalculatorActions';

import keyCodes from '../constants/keyCodes.json';

export default class KeyboardHandler extends Component {

  constructor(props) {
    super(props);

    // Bind callback methods to make `this` the correct context.
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    //iterate keyCodes array searching according keyCode value
    keyCodes.forEach( function(element) {

      // return if no matches
      if (event.keyCode !== element.keyCode) return;

      CalculatorActions.typeKey(element.keyType, element.keyValue);
    });
  }

  componentDidMount() {
    // focus at document.body to be able use keyboard
    document.body.tabIndex = '1';
    document.body.focus();

    document.body.addEventListener('keyup', this.handleKeyUp);
  }

  render () {
    return null;
  }
}
