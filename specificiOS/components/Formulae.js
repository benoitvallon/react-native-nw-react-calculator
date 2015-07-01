'use strict';

var CalculatorStore = require('../../common/stores/CalculatorStore');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

function getCalculatorState() {
  return {
    displayFormulae: CalculatorStore.getDisplayFormulae()
  };
}

var Formulae = React.createClass({

  getInitialState: function() {
    return getCalculatorState();
  },

  componentDidMount: function() {
    CalculatorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CalculatorStore.removeChangeListener(this._onChange);
  },

  dynamicClass: function(operator) {
    return 'group ' + operator;
  },

  render: function() {
    return (
      <View style={styles.formulae}>
        {this.state.displayFormulae.map(function(formula) {
          return <View style={getFormulaStyles(formula.operator)}>
            <Text style={styles.text}>{formula.literal}</Text>
          </View>
        }, this)}
      </View>
    );
  },

  _onChange: function() {
    this.setState(getCalculatorState());
  }

});

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

module.exports = Formulae;
