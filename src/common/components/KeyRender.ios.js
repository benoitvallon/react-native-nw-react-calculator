'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default function (props, state) {
  var classString = 'key key-' + this.props.keyType;
  if(this.state.isHighlighted) {
    classString += ' highlight';
  }
  var classOperation = '';
  if(this.props.keyType === 'operator') {
    classOperation = 'operator ' + this.props.keyValue;
  }
  if(this.props.keyType === 'action') {
    classOperation = 'action ' + this.props.keyValue;
  }
  if(this.props.keyType === 'number') {
    return (
      <View style={styles.keyNumber}>
        <TouchableHighlight style={styles.button} onPress={this.handleClick} underlayColor='#cdcdcd'>
          <Text style={styles.textButton}>
            {this.props.keySymbol}
          </Text>
        </TouchableHighlight>
      </View>
    );
  } else if(this.props.keyType === 'operator') {
    return (
      <View style={styles.keyOperator}>
        <TouchableHighlight style={getOperatorStyles(this.props.keyValue)} onPress={this.handleClick} underlayColor='#cdcdcd'>
          <Text style={styles.textButtonOperator}>
            {this.props.keySymbol}
          </Text>
        </TouchableHighlight>
      </View>
    );
  } else if(this.props.keyType === 'action') {
    return (
      <View style={styles.keyAction}>
        <TouchableHighlight style={getActionStyles(this.props.keyValue)} onPress={this.handleClick} underlayColor='#cdcdcd'>
          <Text style={getActionButtonStyles(this.props.keyValue)}>
            {this.props.keySymbol}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var getOperatorStyles = function(classOperation) {
  var buttonOperator = {
    basic: {
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    add: {
      backgroundColor: '#fb96cf',
      paddingBottom: 3
    },
    substract: {
      backgroundColor: '#fcb064',
      paddingBottom: 3
    },
    multiply: {
      backgroundColor: '#68cef1',
      paddingBottom: 3
    },
    divide: {
      backgroundColor: '#cb7dc9',
      paddingBottom: 3
    },
  };
  return Object.assign(buttonOperator.basic, buttonOperator[classOperation]);
}

var getActionStyles = function(classOperation) {
  var buttonAction = {
    basic: {
      flex: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    back: {
      paddingBottom: 1,
      borderColor: '#d68086',
      borderWidth: 1
    },
    equal: {
      paddingBottom: 1,
      borderColor: '#9ed8a6',
      borderWidth: 1
    }
  };
  return Object.assign(buttonAction.basic, buttonAction[classOperation]);
}

var getActionButtonStyles = function(classOperation) {
  var buttonText = {
    basic: {
      fontSize: 25,
      fontWeight: '200',
    },
    back: {
      paddingBottom: 3,
      color: '#d68086',
    },
    equal: {
      paddingBottom: 3,
      color: '#9ed8a6',
    }
  };
  return Object.assign(buttonText.basic, buttonText[classOperation]);
}

var styles = StyleSheet.create({
  keyNumber: {
    flex: 1,
    borderColor: '#f8f8f8',
    borderWidth: 1,
  },
  keyOperator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  keyAction: {
    flex: 1,
    padding: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    color: '#919191',
    fontSize: 20,
    fontWeight: '400',
  },
  textButtonOperator: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  }
});
