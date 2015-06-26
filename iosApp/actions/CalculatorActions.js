'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CalculatorConstants = require('../constants/CalculatorConstants');

var CalculatorActions = {

  create: function(key) {
    AppDispatcher.dispatch({
      type: CalculatorConstants.KEY_TYPED,
      key: key
    });
  },

};

module.exports = CalculatorActions;
