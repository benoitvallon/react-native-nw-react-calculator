'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
} from 'react-native';

var styles = StyleSheet.create({
  screen: {
    color: '#190d08',
    fontSize: 70,
    fontWeight: '200'
  }
});

export default function (props, state) {
  return (
    <Text style={styles.screen}>
      {state.displayScreen}
    </Text>
  );
}
