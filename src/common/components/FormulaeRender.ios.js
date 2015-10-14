'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function (props, state) {
  return (
    <View style={styles.formulae}>
      {this.state.displayFormulae.map(function(formula) {
        return <View style={getFormulaStyles(formula.operator)}>
          <Text style={styles.text}>{formula.literal}</Text>
        </View>
      }, this)}
    </View>
  );
}

var getFormulaStyles = function(operator) {
  var button = {
    basic: {
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
      marginLeft: 10
    },
    add: {
      backgroundColor: '#fb96cf',
    },
    substract: {
      backgroundColor: '#fcb064',
    },
    multiply: {
      backgroundColor: '#68cef1',
    },
    divide: {
      backgroundColor: '#cb7dc9',
    },
  };

  return Object.assign(button.basic, button[operator]);
}

var styles = StyleSheet.create({
  formulae: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18
  }
});
