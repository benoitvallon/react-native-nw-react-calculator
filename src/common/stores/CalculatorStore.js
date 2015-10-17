'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';
import uniqid from 'uniqid';
import AppDispatcher from '../dispatcher/AppDispatcher';
import CalculatorConstants from '../constants/CalculatorConstants';

var CHANGE_EVENT = 'change';

var _numericKeyTyped = [];
var _signKeyTyped = null;
var _symbolKeyTyped = null;
var _numberTyped = [];
var _displayScreen = 0;
var _displayFormulae = [];

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

function processKey(keyType, keyValue) {
  if(keyType === 'operator' || keyType === 'action') {

    // if a nuber was being typed we reset it otherwise we reset everything
    if(keyValue === 'back') {
      if(_numericKeyTyped.length) {
        _numericKeyTyped.pop();
        if(!_numericKeyTyped.length) {
          _displayScreen = 0;
        }
      } else {
        _numberTyped = [];
        _displayScreen = 0;
      }
      return;
    }

    if(keyType === 'operator') {
      _signKeyTyped = keyValue;
    }

    // a number was previously typed
    if(_numericKeyTyped.length) {

      var number = parseFloat(_numericKeyTyped.join(''));
      _numberTyped.push(number);

      _numericKeyTyped = [];

      if(_numberTyped.length === 2) {
        var calculation = 0;

        switch(_signKeyTyped) {
          case 'add':
            calculation = _numberTyped[0] + _numberTyped[1];
            _symbolKeyTyped = '+';
            break;
          case 'substract':
            calculation = _numberTyped[0] - _numberTyped[1];
            _symbolKeyTyped = '-';
            break;
          case 'multiply':
            calculation = _numberTyped[0] * _numberTyped[1];
            _symbolKeyTyped = 'x';
            break;
          case 'divide':
            calculation = _numberTyped[0] / _numberTyped[1];
            _symbolKeyTyped = '÷';
            break;
          default:
        }

        _displayFormulae.push({
          id: uniqid(),
          literal: '' + _numberTyped[0].toString() + ' ' +
            _symbolKeyTyped + ' ' +  _numberTyped[1].toString(),
          operator: _signKeyTyped
        });
        _displayScreen = calculation;
        _numberTyped = [calculation];
      }
    }
  } else {
    // avoid multiple '.' character
    if(keyValue === '.') {
      if(~_numericKeyTyped.indexOf('.')) {
        return;
      } else {
        // if no '.' is found then we push first a '0'
        _numericKeyTyped.push('0');
      }
    }
    if(keyValue === '0') {
      // if there no other character, '0's can not accumulate
      if(!_numericKeyTyped.length) {
        return;
      }
    }
    _numericKeyTyped.push(keyValue);
    _displayScreen = _numericKeyTyped;
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
