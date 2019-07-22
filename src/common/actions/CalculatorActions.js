'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import CalculatorConstants from '../constants/CalculatorConstants';

const CalculatorActions = {

  typeKey: function(keyType, keyValue) {
    AppDispatcher.dispatch({
      type: CalculatorConstants.KEY_TYPED,
      keyType: keyType,
      keyValue: keyValue
    });
  },

  typeFormula: function(formula) {
    AppDispatcher.dispatch({
      type: CalculatorConstants.FORMULA_TYPED,
      formula: formula
    });
  }

};

export default CalculatorActions;
