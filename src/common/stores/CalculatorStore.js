'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';
import uniqid from 'uniqid';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CalculatorConstants from '../constants/CalculatorConstants';

var CHANGE_EVENT = 'change';

var _signKeyTyped = null;
var _symbolKeyTyped = null;
var _displayScreen = '0';
var _displayFormulae = [];
var _totalNumberOfDigits = 12;
var _numberKeyPressedBuffer = [];
var _backKeyPressedInARowBuffer = 0;
var _numbersFromBuffer = [];
var _lastCalculation = {};
var _lastPressedWasEqual = false;

var CalculatorStore = assign({}, EventEmitter.prototype, {

  getDisplayScreen: function() {
    return _displayScreen;
  },
  getDisplayFormulae: function() {
    var maxNumberOfChar = 32;

    var characterCount = 0;
    _displayFormulae = _displayFormulae.reverse().filter(function(formula) {
      characterCount += formula.literal.length;
      return characterCount < maxNumberOfChar;
    }).reverse();

    return _displayFormulae;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

function processNumberKeyPressed(keyType, keyValue) {
  // avoid multiple '.' character
  if(keyValue === '.') {
    if(~_numberKeyPressedBuffer.indexOf('.')) {
      return;
    } else {
      // if no '.' is found then we push first a '0'
      if(!_numberKeyPressedBuffer.length) {
        _numberKeyPressedBuffer.push('0');
      }
    }
  }
  if(keyValue === '0') {
    // if there no other character, '0's can not accumulate
    if(_numberKeyPressedBuffer.length === 1 && _numberKeyPressedBuffer[0] === '0') {
      return;
    }

  }
  _numberKeyPressedBuffer.push(keyValue);
  _displayScreen = _numberKeyPressedBuffer.join('');
}

function processBackKeyPressed() {
  // if a number is being entered (in the buffer) we reset every character one by one
  if(_numberKeyPressedBuffer.length) {
    _numberKeyPressedBuffer.pop();
    _displayScreen = _numberKeyPressedBuffer.join('');
    // if there is no more number in the buffer, we reset the screen and start counting the number of times back has been pressed
    if(!_numberKeyPressedBuffer.length || _numberKeyPressedBuffer === '0') {
      _numberKeyPressedBuffer = [];
      _numbersFromBuffer = [];
      _displayScreen = '0';
      _backKeyPressedInARowBuffer++;
      _lastCalculation = {};
    }
  } else {
    _numberKeyPressedBuffer = [];
    _numbersFromBuffer = [];
    _displayScreen = '0';
    _backKeyPressedInARowBuffer++;
    _lastCalculation = {};
  }
  // if back has been pressed two times in a row after reset the screen and the buffer then we start deleting previous formula one by one
  if(_backKeyPressedInARowBuffer >= 2) {
    _displayFormulae.pop();
  }
  return;
}

function processKey(keyType, keyValue) {
  if(keyType === 'number') {
    if(keyValue === '+-') {
      if(_numberKeyPressedBuffer[0] === '-') {
        _numberKeyPressedBuffer.shift();
      } else {
        if(!_numberKeyPressedBuffer.length) {
          if(_displayScreen.split('')[0] === '-') {
            _displayScreen = parseFloat(_displayScreen.substring(1)).toString();
          } else {
            _displayScreen = ('-' + _displayScreen).toString();
          }
          if(_numbersFromBuffer.length) {
            _numbersFromBuffer = [parseFloat(_displayScreen)];
          }
          return;
        } else {
          _numberKeyPressedBuffer.unshift('-');
        }
      }
      _displayScreen = _numberKeyPressedBuffer.join('');
      if(!_numberKeyPressedBuffer.length || _numberKeyPressedBuffer === '0') {
        _numberKeyPressedBuffer = [];
        _displayScreen = '0';
      }
      return;
    }
    if(_lastPressedWasEqual) {
      _numbersFromBuffer = [];
    }
    _lastPressedWasEqual = false;
    // process all 11 key types .1234567890
    return processNumberKeyPressed(keyType, keyValue);
  } else {
    if(keyValue === 'back') {
      _lastPressedWasEqual = false;
      return processBackKeyPressed();
    }
    // if we come here, it means the back button has been pressed so we reset its counter
    _backKeyPressedInARowBuffer = 0;

    if(keyType === 'operator') {
      _lastPressedWasEqual = false;
      _signKeyTyped = keyValue;

      if(_numberKeyPressedBuffer.length) {
        _numbersFromBuffer.push(parseFloat(_numberKeyPressedBuffer.join('')));
        _numberKeyPressedBuffer = [];
      } else {
        _lastCalculation = {
          number: parseFloat(_displayScreen),
          sign: _signKeyTyped
        };
      }

      processCalculation();
    }

    if(keyValue === 'equal') {

      if(_numberKeyPressedBuffer.length) {
        _numbersFromBuffer.push(parseFloat(_numberKeyPressedBuffer.join('')));
        _numberKeyPressedBuffer = [];
      } else if (_lastCalculation.number) {
        _numbersFromBuffer.push(_lastCalculation.number);
        _signKeyTyped = _lastCalculation.sign;
      }

      processCalculation();

      _lastPressedWasEqual = true;
    }
  }
}

function processCalculation() {
  if(_numbersFromBuffer.length === 2) {
    var calculation = 0;

    switch(_signKeyTyped) {
      case 'add':
        calculation = _numbersFromBuffer[0] + _numbersFromBuffer[1];
        _symbolKeyTyped = '+';
        break;
      case 'substract':
        calculation = _numbersFromBuffer[0] - _numbersFromBuffer[1];
        _symbolKeyTyped = '-';
        break;
      case 'multiply':
        calculation = _numbersFromBuffer[0] * _numbersFromBuffer[1];
        _symbolKeyTyped = 'x';
        break;
      case 'divide':
        if(_numbersFromBuffer[1] === 0) {
          calculation = 'Error';
        } else {
          calculation = _numbersFromBuffer[0] / _numbersFromBuffer[1];
        }
        _symbolKeyTyped = '÷';
        break;
      default:
    }
    _lastCalculation = {
      number: _numbersFromBuffer[1],
      sign: _signKeyTyped
    };

    var splitDisplay = calculation.toString().split('.');
    // this is a decimal number
    if(splitDisplay.length == 2) {
      calculation = parseFloat(calculation.toFixed(_totalNumberOfDigits - calculation.toString().split('.')[0].length));
    }
    _displayScreen = calculation.toString();

    if(calculation == 'Error') {
      _numbersFromBuffer = [];
    } else {
      _displayFormulae.push({
        id: uniqid(),
        literal: '' + _numbersFromBuffer[0].toString() + ' ' +
          _symbolKeyTyped + ' ' +  _numbersFromBuffer[1].toString(),
        operator: _signKeyTyped
      });
      _numbersFromBuffer = [calculation];
    }
  }
}

CalculatorStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
    case CalculatorConstants.KEY_TYPED:
      var keyType = action.keyType;
      var keyValue = action.keyValue;
      if (keyType !== undefined && keyValue !== undefined ) {
        processKey(keyType, keyValue);
        CalculatorStore.emitChange();
      }
      break;
    default:
      // no op
  }
});

module.exports = CalculatorStore;
