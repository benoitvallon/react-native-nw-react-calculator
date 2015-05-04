'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var CalculatorConstants = require('../constants/CalculatorConstants');

var CHANGE_EVENT = 'change';

var _keyTyped = []; // collection of key typed

var CalculatorStore = assign({}, EventEmitter.prototype, {

  getKeys: function() {
    return _keyTyped;
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

CalculatorStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
    case CalculatorConstants.KEY_TYPED:
      var key = action.key;
      if (key !== '') {
        _keyTyped.push(key);
        CalculatorStore.emitChange();
      }
      break;
    default:
  }

  return true; // No errors. Needed by promise in Dispatcher.
});

module.exports = CalculatorStore;
