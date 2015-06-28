'use strict';

var Key = require('./Key');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Keyboard = React.createClass({
  render: function() {
    return (
      <View style={styles.keyboard}>

        <View style={styles.row}>
          <Key keyType='number' keyValue='1' />
          <Key keyType='number' keyValue='2' />
          <Key keyType='number' keyValue='3' />
        </View>
        <View style={styles.row}>
          <Key keyType='number' keyValue='4' />
          <Key keyType='number' keyValue='5' />
          <Key keyType='number' keyValue='6' />
        </View>
        <View style={styles.row}>
          <Key keyType='number' keyValue='7' />
          <Key keyType='number' keyValue='8' />
          <Key keyType='number' keyValue='9' />
        </View>
        <View style={styles.row}>
          <Key keyType='number' keyValue='%' />
          <Key keyType='number' keyValue='0' />
          <Key keyType='number' keyValue='.' />
        </View>

        <View style={styles.row}>
          <Key keyType='operation' keyValue='÷' />
          <Key keyType='operation' keyValue='-' />
          <Key keyType='operation' keyValue='+' />
          <Key keyType='operation' keyValue='x' />
        </View>

        <View style={styles.row}>
          <Key keyType='action' keyValue='<<' />
          <Key keyType='action' keyValue='=' />
        </View>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    // flexDirection: 'column',
    // backgroundColor: 'red'
  },
  // separator: {
  //   flex: 1,
  //   height: 1,
  //   backgroundColor: 'blue'
  // },
  row: {
    // alignSelf: 'stretch',
    // alignItems: 'stretch',
    flex: 1,
    flexDirection: 'row',
    // borderBottomWidth: 1
    // backgroundColor: 'green'
  }
});

module.exports = Keyboard;
