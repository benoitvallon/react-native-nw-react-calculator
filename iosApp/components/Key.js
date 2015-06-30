'use strict';

var CalculatorActions = require('../common/actions/CalculatorActions');

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var Key = React.createClass({

  getInitialState: function() {
    return {isHighlighted: false};
  },

  handleClick: function(event) {
    CalculatorActions.create(this.props.keyValue);
  },

  onMouseDown: function(event) {
    this.setState({
      isHighlighted: true
    });
  },

  onMouseUp: function(event) {
    this.setState({
      isHighlighted: false
    });
  },

  render: function() {
    var classString = 'key key-' + this.props.keyType;
    if(this.state.isHighlighted) {
      classString += ' highlight';
    }
    var classOperation = '';
    if(this.props.keyType === 'operation') {
      // classOperation = 'operator ';
      if(this.props.keyValue === '+') { classOperation += 'add'; }
      if(this.props.keyValue === '-') { classOperation += 'substract'; }
      if(this.props.keyValue === '÷') { classOperation += 'divide'; }
      if(this.props.keyValue === 'x') { classOperation += 'multiply'; }
    }
    if(this.props.keyType === 'action') {
      // classOperation = 'action ';
      if(this.props.keyValue === '<<') { classOperation += 'back'; }
      if(this.props.keyValue === '=') { classOperation += 'equal'; }
    }
    if(this.props.keyType === 'number') {
      return (
        <View style={styles.keyNumber}>
          <TouchableHighlight style={styles.button} onPress={this.handleClick.bind(this)} underlayColor='#cdcdcd'>
            <Text style={styles.textButton}>
              {this.props.keyValue}
            </Text>
          </TouchableHighlight>
        </View>
      );
    } else if(this.props.keyType === 'operation') {
      return (
        <View style={styles.keyOperator}>
          <TouchableHighlight style={getOperatorStyles(classOperation)} onPress={this.handleClick.bind(this)} underlayColor='#cdcdcd'>
            <Text style={styles.textButtonOperator}>
              {this.props.keyValue}
            </Text>
          </TouchableHighlight>
        </View>
      );
    } else if(this.props.keyType === 'action') {
      return (
        <View style={styles.keyAction}>
          <TouchableHighlight style={getActionStyles(classOperation)} onPress={this.handleClick.bind(this)} underlayColor='#cdcdcd'>
            <Text style={getActionButtonStyles(classOperation)}>
              {this.props.keyValue}
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
});

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
      // backgroundColor: 'white',
      paddingBottom: 1,
      borderColor: '#d68086',
      borderWidth: 1
    },
    equal: {
      // backgroundColor: '#9ed8a6',
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

module.exports = Key;
