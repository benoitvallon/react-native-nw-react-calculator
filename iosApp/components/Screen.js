'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
} = React;

var CalculatorStore = require('../stores/CalculatorStore');

var Screen = React.createClass({

  render: function() {
    return (
      <Text className='screen'>
        Screen
      </Text>
    );
  },

});

module.exports = Screen;
