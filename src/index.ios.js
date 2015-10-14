/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

// it is important tha the first React variable found is from the react-native package
import React, {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { Component } from 'react';

import Screen from './common/components/Screen';
import Formulae from './common/components/Formulae';
import Keyboard from './common/components/Keyboard';

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
    flex: 1
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
    padding: 20
  },
  keyboard: {
    height: 420
  }
});

AppRegistry.registerComponent('iosApp', () => iosApp);
