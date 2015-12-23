'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default function (props, state) {
  return (
    <View style={styles.formulae}>
      {this.state.displayFormulae.map(function(formula) {
        return <TouchableHighlight key={formula.id}  style={getFormulaStyles(formula.operator)} onPress={this.handleClick.bind(this, formula)} underlayColor='#cdcdcd'>
          <Text style={styles.text}>{formula.literal}</Text>
        </TouchableHighlight>
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
      backgroundColor: '#fb96cf'
    },
    substract: {
      backgroundColor: '#fcb064'
    },
    multiply: {
      backgroundColor: '#68cef1'
    },
    divide: {
      backgroundColor: '#cb7dc9'
    }
  };

  return Object.assign(button.basic, button[operator]);
};

var styles = StyleSheet.create({
  formulae: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18
  }
});
