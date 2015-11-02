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
var _exponentialNumberOfDigits = 5;
var _numberKeyPressedBuffer = [];
var _backKeyPressedInARowBuffer = 0;
var _numbersFromBuffer = [];
var _lastCalculation = {};
var _lastPressedWasEqual = false;

var CalculatorStore = assign({}, EventEmitter.prototype, {

  getDisplayScreen: function() {
    if(_displayScreen.toString().length >= _totalNumberOfDigits) {
      // console.log('display filter', _displayScreen.toString());
      return parseFloat(_displayScreen).toExponential(_exponentialNumberOfDigits);
    }
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
  // filter the buffer in case it contains only '-0' to remove the '0'
  if(_numberKeyPressedBuffer.length === 2 && _numberKeyPressedBuffer[0] === '-' && _numberKeyPressedBuffer[1] === '0') {
    _numberKeyPressedBuffer.pop();
  }

  // avoid multiple '.' character
  if(keyValue === '.') {
    if(~_numberKeyPressedBuffer.indexOf('.')) {
      return;
    } else {
      // if no '.' is found and the buffer is empty then we push a first '0'
      // we also test if the buffer contains only '-', if so, we push a first '0'
      if(!_numberKeyPressedBuffer.length ||
          (_numberKeyPressedBuffer.length === 1 && _numberKeyPressedBuffer[0] === '-')) {
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
    // pop the last nnumber typed
    _numberKeyPressedBuffer.pop();

    // check if it is a negative number for trailing '0' or negative number, we did the inverse trick after '.', we added '0'
    if((_numberKeyPressedBuffer.length === 1 && _numberKeyPressedBuffer[0] === '0') ||
        (_numberKeyPressedBuffer.length === 2 && _numberKeyPressedBuffer[0] === '-' && _numberKeyPressedBuffer[1] === '0')) {
      _numberKeyPressedBuffer.pop();
    }

    // if there is only the negative sign in the buffer we keep and hack the display to '-0'
    if(_numberKeyPressedBuffer.length === 1 && _numberKeyPressedBuffer[0] === '-') {
      _displayScreen = '-0';
    } else {
      _displayScreen = _numberKeyPressedBuffer.join('');
    }

    // if there is no more number in the buffer, we reset the screen and start counting the number of times back has been pressed
    if(!_numberKeyPressedBuffer.length) {
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

      // a number is being type
      if(_numberKeyPressedBuffer.length) {
        if(_numberKeyPressedBuffer[0] === '-') {
          _numberKeyPressedBuffer.shift();

          if(_numberKeyPressedBuffer.length === 2 && _numberKeyPressedBuffer[0] === '0') {
            _numberKeyPressedBuffer.shift();
          }
        } else {
          _numberKeyPressedBuffer.unshift('-');
        }
        _displayScreen = _numberKeyPressedBuffer.join('');
      } else {
        // the typing buffer is empty and there is no previous numbers in the other buffer
        // it means we are at the beginning of a calculation
        if(!_numbersFromBuffer.length) {
          _numberKeyPressedBuffer.unshift('0');
          _numberKeyPressedBuffer.unshift('-');
          _displayScreen = _numberKeyPressedBuffer.join('');
        } else {
          // there is a previous numbers in the other buffer
          // it means we are in the middle of a calculation
          _numbersFromBuffer[0] = _numbersFromBuffer[0] * -1;
          _displayScreen = _numbersFromBuffer[0].toString();
        }
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

    _numbersFromBuffer[0] = parseFloat(_numbersFromBuffer[0]);
    _numbersFromBuffer[1] = parseFloat(_numbersFromBuffer[1]);
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
      var fixedTo = _totalNumberOfDigits - 2 - calculation.toString().split('.')[0].length;
      if(fixedTo < 0) {
        fixedTo = 0;
      }
      calculation = parseFloat(calculation.toFixed(fixedTo));
    } else if(calculation.toString().length >= _totalNumberOfDigits) {
      calculation = calculation.toExponential(_exponentialNumberOfDigits);
    }
    _displayScreen = calculation.toString();

    if(calculation == 'Error') {
      _numbersFromBuffer = [];
    } else {
      if(_numbersFromBuffer[0].toString().length >= _totalNumberOfDigits) {
        _numbersFromBuffer[0] = _numbersFromBuffer[0].toExponential(_exponentialNumberOfDigits);
      }
      if(_numbersFromBuffer[1].toString().length >= _totalNumberOfDigits) {
        _numbersFromBuffer[1] = _numbersFromBuffer[1].toExponential(_exponentialNumberOfDigits);
      }
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

function processFormula(formula) {
  // if the formula pressed has the same calculation as the last one executed, we do nothing
  if(_displayFormulae[_displayFormulae.length - 1].literal !== formula.literal) {
    var numbers = formula.literal.split(' ');
    _numbersFromBuffer[0] = parseFloat(numbers[0]);
    _numbersFromBuffer[1] = parseFloat(numbers[2]);
    _signKeyTyped = formula.operator;
    processCalculation();
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
    case CalculatorConstants.FORMULA_TYPED:
      var formula = action.formula;
      if (formula !== undefined) {
        processFormula(formula);
        CalculatorStore.emitChange();
      }
      break;
    default:
      // no op
  }
});

module.exports = CalculatorStore;
