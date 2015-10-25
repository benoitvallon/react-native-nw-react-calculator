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

  it('initializes with 0 on screen and no formulae', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
  });

  it('shows numbers on screen as we type (123)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('12');
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('123');
    resetTyping();
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
  });

  it('handles 0 accumalation (0000, 1000, 0.0001)', function() {
    // typing a lot of 0 0 0 0
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '0'));
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

    // typing a lot of 0 after a number key 1 0 0 0
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('100');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1000');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('100');
    resetTyping();

    // typing a lot of 0 after a number dot . 0 0 0
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.00');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.000');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0001');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.000');
    resetTyping();
  });

  it('handles typing . (.000, 1.234, ...12)', function() {
    // typing . first
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.00');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.000');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.00');
    resetTyping();

    // typing . after a number
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.2');
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.23');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.234');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.23');
    callback(actionKeyTyped('number', '5'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.235');
    resetTyping();

    // typing multiples .
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.12');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    resetTyping();
  });

  it('handles typing back as we type', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('234');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('23');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles typing . after back', function() {
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

  it('handles one basic add calculation', function() {
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

  it('handles one basic substract calculation', function() {
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

  it('handles one basic multiply calculation', function() {
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

  it('handles one basic divide calculation', function() {
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

  it('handles one decimal add calculations', function() {
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
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.1 + 0.2', operator: 'add' }]);
    resetTyping();
  });

  it('handles one decimal substract calculations', function() {
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
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.2 - 0.1', operator: 'substract' }]);
    resetTyping();
  });

  it('handles one decimal multiply calculations', function() {
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
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.2 x 0.1', operator: 'multiply' }]);
    resetTyping();
  });

  it('handles one decimal divide calculations', function() {
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
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.2 ÷ 4', operator: 'divide' }]);
    resetTyping();
  });

  it('handles multiple distinct calculations (1+2=3, 4+5=9)', function() {
    // first calculation 1 + 2 = 3
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // second and new calculation 4 + 5 = 9
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('number', '5'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('5');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('9');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'}
    ]);

    // first back to delete previous result
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'}
    ]);

    // second back to delele most recent formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([{
      id: undefined, literal: '1 + 2', operator: 'add'}]);

    // third back to delete oldest formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles multiple complete linked calculations, with equals (1+2=3, +3=6, +4=10, +5=15)', function() {
    // first calculation 1 + 2 = 3
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // second calculation 3 + 3 = 6
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('6');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'}]);

    // third calculation 6 + 4 = 10
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('6');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'}]);

    // fourth calculation 10 + 5 = 15
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10');
    callback(actionKeyTyped('number', '5'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('5');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('15');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'},
      { id: undefined, literal: '10 + 5', operator: 'add'}]);

    // back to delete screen and previous results
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'},
      { id: undefined, literal: '10 + 5', operator: 'add'}]);

    // back to delele most recent formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'}]);
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'}]);
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // last back to delete oldest formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles multiple short linked calculations, without equal but direct operator (1+2+, 3+, 4+, 5=15)', function() {
    // first calculation 1 + 2 = 3
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // second calculation + 3 = 6
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('6');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'}]);

    // third calculation + 4 = 10
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'}]);

    // fourth calculation + 5 = 15
    callback(actionKeyTyped('number', '5'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('5');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('15');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'},
      { id: undefined, literal: '10 + 5', operator: 'add'}]);

    // back to delete screen and previous results
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'},
      { id: undefined, literal: '10 + 5', operator: 'add'}]);

    // back to delele most recent formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'},
      { id: undefined, literal: '6 + 4', operator: 'add'}]);
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 3', operator: 'add'}]);
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // last back to delete oldest formulae
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles repeated calculations (1+2=3, =5, =7)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);

    // repeat last calculation
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('5');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' },
      { id: undefined, literal: '3 + 2', operator: 'add' }]);

    // repeat last calculation again
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('7');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' },
      { id: undefined, literal: '3 + 2', operator: 'add' },
      { id: undefined, literal: '5 + 2', operator: 'add' }]);
    resetTyping();
  });
});
