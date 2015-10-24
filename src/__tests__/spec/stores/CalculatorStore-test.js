'use strict';

jest.dontMock('../../../common/stores/CalculatorStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');

describe('CalculatorStore', function() {

  var CalculatorConstants = require('../../../common/constants/CalculatorConstants');
  var AppDispatcher = require('../../../common/dispatcher/AppDispatcher');
  var CalculatorStore = require('../../../common/stores/CalculatorStore');
  var callback = AppDispatcher.register.mock.calls[0][0];

  // mock actions
  var actionKeyTyped = function(keyType, keyValue) {
    return {
      type: CalculatorConstants.KEY_TYPED,
      keyType: keyType,
      keyValue: keyValue
    };
  };

  var resetTyping = function() {
    for(var i = 0; i < 20; i++) {
      callback(actionKeyTyped('action', 'back'));
    }
  };

  beforeEach(function() {
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('initializes with zero on screen and no formulae', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
  });

  it('shows numbers on screen as we type', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('24');
    callback(actionKeyTyped('number', '6'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('246');
    resetTyping();
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
  });

  it('resets what we type', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '6'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('6');
    callback(actionKeyTyped('number', '8'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('68');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('681');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('68');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('6');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles new calculations and resets what we type and previous formulae', function() {
    /// first calculation 268 + 135 = 403
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('number', '6'));
    callback(actionKeyTyped('number', '8'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('268');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('268');
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('number', '3'));
    callback(actionKeyTyped('number', '5'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('403');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '268 + 135', operator: 'add'}]);

    // totally new calculation 742 + 341 = 1083
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '4'));
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('742');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('742');
    callback(actionKeyTyped('number', '3'));
    callback(actionKeyTyped('number', '4'));
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1083');

    // first back to delete previous result
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '268 + 135', operator: 'add'},
      { id: undefined, literal: '742 + 341', operator: 'add'}
    ]);

    // second back to delele most recent formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([{
      id: undefined, literal: '268 + 135', operator: 'add'}]);

    // third back to delete oldest formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles typing zero properly', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    resetTyping();
  });

  it('handles typing dot first properly', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.00');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0');
    resetTyping();
  });

  it('handles typing dot after number properly', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23.');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23.2');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23.24');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23.242');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23.24');
    callback(actionKeyTyped('number', '7'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23.247');
    resetTyping();
  });

  it('handles typing dot after back properly', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('action', 'back'));
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.00');
    resetTyping();
  });

  it('handles basic add calculation', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('24');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '12 + 12', operator: 'add' }]);
    resetTyping();
  });

  it('handles basic substract calculation', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('operator', 'substract'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('11');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '12 - 11', operator: 'substract' }]);
    resetTyping();
  });

  it('handles basic multiply calculation', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('operator', 'multiply'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('144');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '12 x 12', operator: 'multiply' }]);
    resetTyping();
  });

  it('handles basic divide calculation', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('number', '6'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('6');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '12 ÷ 6', operator: 'divide' }]);
    resetTyping();
  });

  it('handles decimal add calculations', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    callback(actionKeyTyped('action', 'equal'));
    // should be refactor to display '0.3' instead
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.30000000000');
    resetTyping();
  });

  it('handles decimal substract calculations', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('operator', 'substract'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('action', 'equal'));
    // should be refactor to display '0.1' instead
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.10000000000');
    resetTyping();
  });

  it('handles decimal multiply calculations', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('operator', 'multiply'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('action', 'equal'));
    // should be refactor to display '0.02' instead
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.02000000000');
    resetTyping();
  });

  it('handles decimal divide calculations', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    // callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('action', 'equal'));
    // should be refactor to display '0.05' instead
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.05000000000');
    resetTyping();
  });
});
