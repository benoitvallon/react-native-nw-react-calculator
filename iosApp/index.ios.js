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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  screen: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#68cef2',
    color: '#190d08',
    fontSize: 50,
    padding: 20,
    textAlign: 'right',
    fontWeight: '100'
  },
  formalue: {
    height: 100,
    backgroundColor: '#4c4c4c',
    padding: 20,
    textAlign: 'right',
    fontWeight: '100',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  keyboard: {
    fontWeight: '100',
    alignSelf: 'stretch',
    flex: 1,
  }
});

AppRegistry.registerComponent('iosApp', () => iosApp);
