/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';


import Formulae from './src/specificiOS/components/Formulae';
import Keyboard from './src/common/components/Keyboard';

import Screen from './src/common/components/Screen';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';

class iosApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.screen} >
          <Screen />
        </View>
        <View style={styles.formulae}>
          <Formulae />
        </View>
        <View style={styles.keyboard}>
          <Keyboard />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#68cef2',
    padding: 18
  },
  formulae: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#4c4c4c',
    padding: 20,
  },
  keyboard: {
    height: 420,
  }
});

AppRegistry.registerComponent('iosApp', () => iosApp);
