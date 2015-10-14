'use strict';

import React, { Component } from 'react';
import CalculatorStore from '../../common/stores/CalculatorStore';

import {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';

function getCalculatorState() {
  return {
    displayScreen: CalculatorStore.getDisplayScreen()
  };
}

class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayScreen: CalculatorStore.getDisplayScreen()
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

  render() {
    return (
      <Text style={styles.screen}>
        {this.state.displayScreen}
      </Text>
    );
  }

  _onChange() {
    this.setState(getCalculatorState());
  }
}

var styles = StyleSheet.create({
  screen: {
    color: '#190d08',
    fontSize: 70,
    fontWeight: '200'
  }
});

module.exports = Screen;
