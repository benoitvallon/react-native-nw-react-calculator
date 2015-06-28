'use strict';

var CalculatorActions = require('../actions/CalculatorActions');

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
      classOperation = 'operator ';
      if(this.props.keyValue === '+') { classOperation += 'add'; }
      if(this.props.keyValue === '-') { classOperation += 'substract'; }
      if(this.props.keyValue === '÷') { classOperation += 'divide'; }
      if(this.props.keyValue === 'x') { classOperation += 'multiply'; }
    }
    if(this.props.keyType === 'action') {
      classOperation = 'action ';
      if(this.props.keyValue === '<<') { classOperation += 'back'; }
      if(this.props.keyValue === '=') { classOperation += 'equal'; }
    }
    if(this.props.keyType === 'number') {
      return (
        <View style={styles.key}>
          <TouchableHighlight style={styles.button} onPress={this.handleClick.bind(this)} underlayColor='#cdcdcd'>
            <Text style={styles.textButton}>
              {this.props.keyValue}
            </Text>
          </TouchableHighlight>
        </View>
        // <div className={classString}
        //     onClick={this.handleClick}
        //     onMouseDown={this.onMouseDown}
        //     onMouseUp={this.onMouseUp}>
        //   <div className={classOperation}>{this.props.keyValue}</div>
        // </div>
      );
    } else {
      return (
        <View style={styles.key}>
          <TouchableHighlight style={styles.button} onPress={this.handleClick.bind(this)} underlayColor='#cdcdcd'>
            <Text style={styles.textButton}>
              {this.props.keyValue}
            </Text>
          </TouchableHighlight>
        </View>
        // <div className={classString}>
        //   <div className={classOperation}
        //     onClick={this.handleClick}
        //     onMouseDown={this.onMouseDown}
        //     onMouseUp={this.onMouseUp}>{this.props.keyValue}</div>
        // </div>
      );
    }
  }
});

var styles = StyleSheet.create({
  key: {
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flex: 1,
    // flexDirection: 'row',
    borderColor: '#f8f8f8',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'white',
    flex: 1,
    // padding: 10,
    alignItems: 'center'
  },
  textButton: {
    color: '#919191',
    fontSize: 20,
    fontWeight: "400"
  }
});

module.exports = Key;
