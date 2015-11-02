'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import CalculatorConstants from '../constants/CalculatorConstants';

var CalculatorActions = {

  typeKey: function(keyType, keyValue) {
    AppDispatcher.dispatch({
      type: CalculatorConstants.KEY_TYPED,
      keyType: keyType,
      keyValue: keyValue
    });
  }

};

module.exports = CalculatorActions;
