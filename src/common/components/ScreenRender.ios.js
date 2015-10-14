'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';

export default function (props, state) {
  return (
    <Text style={styles.screen}>
      {state.displayScreen}
    </Text>
  );
}

var styles = StyleSheet.create({
  screen: {
    color: '#190d08',
    fontSize: 70,
    fontWeight: '200'
  }
});
