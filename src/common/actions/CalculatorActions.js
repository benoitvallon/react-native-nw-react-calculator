'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CalculatorConstants = require('../constants/CalculatorConstants');

var CalculatorActions = {

  create: function(keyType, keyValue) {
    AppDispatcher.dispatch({
      type: CalculatorConstants.KEY_TYPED,
      keyType: keyType,
      keyValue: keyValue
    });
  },

};

module.exports = CalculatorActions;
