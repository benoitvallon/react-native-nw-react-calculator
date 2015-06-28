/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Screen = require('./components/Screen');
var Formulae = require('./components/Formulae');
var Keyboard = require('./components/Keyboard');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
} = React;

var iosApp = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.screen} >
          <Screen />
        </View>
        <View style={styles.formalue}>
          <Formulae />
        </View>
        <View style={styles.keyboard}>
          <Keyboard />
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  screen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#68cef2',
    padding: 20
  },
  formalue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4c4c4c',
    padding: 20,
  },
  keyboard: {
    flex: 4,
    flexDirection: 'row',
  }
});

AppRegistry.registerComponent('iosApp', () => iosApp);
