'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var CalculatorConstants = require('../constants/CalculatorConstants');

var CHANGE_EVENT = 'change';

var _numericKeyTyped = [];
var _signKeyTyped = null;
var _numberTyped = [];
var _displayScreen = 0;
var _displayFormulae = [];

var CalculatorStore = assign({}, EventEmitter.prototype, {

  getDisplayScreen: function() {
    return _displayScreen;
  },
  getDisplayFormulae: function() {
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
  },
});

function processKey(key) {

  if(key === '+' || key === '-' || key === 'x' || key === '÷' || key === '=' || key === '<<') {

    // if a nuber was being typed we reset it otherwise we reset everything
    if(key === '<<') {
      if(_numericKeyTyped.length) {
        _numericKeyTyped = [];
      } else {
        _numberTyped = [];
      }
      _displayScreen = 0;
    }

    if(key === '+' || key === '-' || key === 'x' || key === '÷') {
      _signKeyTyped = key;
    }

    // a number was previously typed
    if(_numericKeyTyped.length) {

      var number = parseFloat(_numericKeyTyped.join(''));
      _numberTyped.push(number);

      _numericKeyTyped = [];

      if(_numberTyped.length === 2) {
        var calculation = 0;

        switch(_signKeyTyped) {
          case '+':
            calculation = _numberTyped[0] + _numberTyped[1];
            break;
          case '-':
            calculation = _numberTyped[0] - _numberTyped[1];
            break;
          case 'x':
            calculation = _numberTyped[0] * _numberTyped[1];
            break;
          case '÷':
            calculation = _numberTyped[0] / _numberTyped[1];
            break;
          default:
        }

        _displayFormulae.push({
          literal: '' + _numberTyped[0].toString() + ' ' +
            _signKeyTyped + ' ' +  _numberTyped[1].toString(),
          sign: _signKeyTyped
        });
        _displayScreen = calculation;
        _numberTyped = [calculation];
      }
    }
  } else {
    _numericKeyTyped.push(key);
    _displayScreen = _numericKeyTyped;
  }
}

CalculatorStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
    case CalculatorConstants.KEY_TYPED:
      var key = action.key;
      if (key !== '') {
        processKey(key);
        CalculatorStore.emitChange();
      }
      break;
    default:
      // no op
  }
});

module.exports = CalculatorStore;
