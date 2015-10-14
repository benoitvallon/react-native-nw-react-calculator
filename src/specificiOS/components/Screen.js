'use strict';

import CalculatorStore from '../../common/stores/CalculatorStore';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';

function getCalculatorState() {
  return {
    displayScreen: CalculatorStore.getDisplayScreen()
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
      <Text style={styles.screen}>
        {this.state.displayScreen}
      </Text>
    );
  },

  _onChange: function() {
    this.setState(getCalculatorState());
  }
});

var styles = StyleSheet.create({
  screen: {
    color: '#190d08',
    fontSize: 70,
    fontWeight: '200'
  }
});

module.exports = Screen;
