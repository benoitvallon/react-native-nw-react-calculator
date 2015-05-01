'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ExampleStore = assign({}, EventEmitter.prototype, {

});

ExampleStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
    default:
  }

});

module.exports = ExampleStore;
