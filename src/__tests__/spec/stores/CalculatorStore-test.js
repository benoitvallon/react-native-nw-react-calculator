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

  var actionFormulaTyped = function(formula) {
    return {
      type: CalculatorConstants.FORMULA_TYPED,
      formula: formula
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

  it('handles 0 accumalation (0000, -0000, 1000, 0.0001)', function() {
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
    resetTyping();

    // typing a lot of 0 0 0 0 after a sign switching
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
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
    resetTyping();
  });

  it('handles typing . (.000, 1.234, -0.123, ...12)', function() {
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

    // typing . after a sign switching
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.12');
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.123');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.12');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.124');
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

  it('handles typing back as we type (1234, -1234)', function() {
    // back after nothing
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');

    // back after some number
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

    // back after some number and sign switching
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-12');
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-123');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1234');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-123');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-12');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles typing . after back (.00, -0.00)', function() {
    // right after a .
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.00');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.0');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();

    // right after a sign switching and .
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.0');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.00');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.0');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles basic add calculations (1+2=3, 1+-2=-1)', function() {
    // positive numbers
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
    resetTyping();

    // negative numbers
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + -2', operator: 'add' }]);
    resetTyping();
  });

  it('handles basic substract calculations (1-2=-1, 1--2=-3)', function() {
    // positive numbers
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'substract'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 - 2', operator: 'substract' }]);
    resetTyping();

    // negative numbers
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'substract'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 - -2', operator: 'substract' }]);
    resetTyping();
  });

  it('handles basic multiply calculations (1x2=2, 1x-2=-2)', function() {
    // positive numbers
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'multiply'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 x 2', operator: 'multiply' }]);
    resetTyping();

    // negative numbers
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'multiply'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-2');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 x -2', operator: 'multiply' }]);
    resetTyping();
  });

  it('handles basic divide calculations (4÷2=2, 4÷-2=-2)', function() {
    // positive numbers
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '4 ÷ 2', operator: 'divide' }]);
    resetTyping();

    // negative numbers
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-2');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '4 ÷ -2', operator: 'divide' }]);
    resetTyping();
  });

  it('handles decimal add calculations (0.1+0.2=0.3, +1=1.3)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.1 + 0.2', operator: 'add' }]);

    // reuse previous rounded calculation
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.3');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.1 + 0.2', operator: 'add' },
      { id: undefined, literal: '0.3 + 1', operator: 'add' }]);
    resetTyping();
  });

  it('handles decimal substract calculations (0.2-0.1=0.1, -1=-0.9)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('operator', 'substract'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.2 - 0.1', operator: 'substract' }]);

    // reuse previous rounded calculation
    callback(actionKeyTyped('operator', 'substract'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0.9');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.2 - 0.1', operator: 'substract' },
      { id: undefined, literal: '0.1 - 1', operator: 'substract' }]);
    resetTyping();
  });

  it('handles decimal multiply calculations (0.1x0.2=0.02, x2=0.04)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('operator', 'multiply'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.1');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.02');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.1 x 0.2', operator: 'multiply' }]);

    // reuse previous rounded calculation
    callback(actionKeyTyped('operator', 'multiply'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.02');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.04');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.1 x 0.2', operator: 'multiply' },
      { id: undefined, literal: '0.02 x 2', operator: 'multiply' }]);
    resetTyping();
  });

  it('handles decimal divide calculations (0.2÷4=0.05, ÷2=0.025)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.2');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.05');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.2 ÷ 4', operator: 'divide' }]);

    // reuse previous rounded calculation
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.05');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0.025');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '0.2 ÷ 4', operator: 'divide' },
      { id: undefined, literal: '0.05 ÷ 2', operator: 'divide' }]);
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
      { id: undefined, literal: '4 + 5', operator: 'add'}]);

    // first back to delete previous result
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'}]);

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

  it('handles typing errors (before, in and after calculation)', function() {
    // multiple operators at the begining
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('operator', 'add'));
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
    resetTyping();

    // multiple operators in calculation
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);
    resetTyping();

    // multiple operators in calculation
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);

    // continue calculation
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('7');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' },
      { id: undefined, literal: '3 + 4', operator: 'add' }]);

    callback(actionKeyTyped('action', 'equal'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('15');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' },
      { id: undefined, literal: '3 + 4', operator: 'add' },
      { id: undefined, literal: '7 + 4', operator: 'add' },
      { id: undefined, literal: '11 + 4', operator: 'add' }]);
    resetTyping();
  });

  it('handles error in distinct calculations (1+2=3, 4÷0=Error, 3+4=7)', function() {
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

    // wrong calculation
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('Error');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);

    // good calculation
    callback(actionKeyTyped('number', '3'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('7');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' },
      { id: undefined, literal: '3 + 4', operator: 'add' }]);
    resetTyping();
  });

  it('handles error in linked calculations (1+2=3, ÷0=Error==++, 4=, +5=9)', function() {
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

    // wrong calculation
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('Error');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('Error');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('Error');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('Error');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);

    // good calculation
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' }]);

    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('number', '5'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('5');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('9');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' },
      { id: undefined, literal: '4 + 5', operator: 'add' }]);
    resetTyping();
  });

  it('handles sign switching with 0 (0, -0, 0, -0, 0)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles sign switching after a number (1, -1, 1, -1, 1)', function() {
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles sign switching after a decimal number (1.2, -1.2, 1.2, -1.2, 1.2)', function() {
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    callback(actionKeyTyped('number', '.'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1.2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1.2');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.2');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles sign switching after calculation (1+2=3, -3+4=7)', function() {
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

    // sign switching
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-3');
    callback(actionKeyTyped('operator', 'add'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-3');
    callback(actionKeyTyped('number', '4'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('4');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add' },
      { id: undefined, literal: '-3 + 4', operator: 'add' }]);
    resetTyping();
  });

  it('handles typing a number after sign switching (0, -0, -1, 1)', function() {
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-0');
    callback(actionKeyTyped('number', '1'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('-1');
    callback(actionKeyTyped('number', '+-'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([]);
    resetTyping();
  });

  it('handles reusing formula more than one time (1+2=3, 4+5=9, "1+2", "1+2")', function() {
    // first calculation 1 + 2 = 3
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // second and new calculation 4 + 5 = 9
    callback(actionKeyTyped('number', '4'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '5'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('9');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'}
    ]);

    // type on the first formula one time
    callback(actionFormulaTyped({ id: undefined, literal: '1 + 2', operator: 'add'}));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'},
      { id: undefined, literal: '1 + 2', operator: 'add'}
    ]);

    // type on the first formula a second time
    callback(actionFormulaTyped({ id: undefined, literal: '1 + 2', operator: 'add'}));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'},
      { id: undefined, literal: '1 + 2', operator: 'add'}
    ]);
    resetTyping();
  });

  it('handles distinct calculation after reusing formula (1+2=3, 4+5=9, "1+2", 6+7=13)', function() {
    // first calculation 1 + 2 = 3
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // second and new calculation 4 + 5 = 9
    callback(actionKeyTyped('number', '4'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '5'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('9');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'}
    ]);

    // type on the first formula one time
    callback(actionFormulaTyped({ id: undefined, literal: '1 + 2', operator: 'add'}));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'},
      { id: undefined, literal: '1 + 2', operator: 'add'}
    ]);

    // third and new calculation 6 + 7 = 13
    callback(actionKeyTyped('number', '6'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('13');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'},
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '6 + 7', operator: 'add'}
    ]);
    resetTyping();
  });

  it('handles linked calculation after reusing formula (1+2=3, 4+5=9, "1+2", +6=9, +-7=2)', function() {
    // first calculation 1 + 2 = 3
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '2'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'}]);

    // second and new calculation 4 + 5 = 9
    callback(actionKeyTyped('number', '4'));
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '5'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('9');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'}
    ]);

    // type on the first formula one time
    callback(actionFormulaTyped({ id: undefined, literal: '1 + 2', operator: 'add'}));
    expect(CalculatorStore.getDisplayScreen()).toEqual('3');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'},
      { id: undefined, literal: '1 + 2', operator: 'add'}
    ]);

    // third calculation + 6 = 9
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '6'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('9');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'},
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 6', operator: 'add'}
    ]);

    // fourth calculation + -7 = 2
    callback(actionKeyTyped('operator', 'add'));
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '+-'));
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '4 + 5', operator: 'add'},
      { id: undefined, literal: '1 + 2', operator: 'add'},
      { id: undefined, literal: '3 + 6', operator: 'add'},
      { id: undefined, literal: '9 + -7', operator: 'add'}
    ]);
    resetTyping();
  });

  it('handles big numbers as we type (1 000 000 000 000)', function() {
    // first calculation 1 000 000 000 000
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10000000000');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+11');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+12');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+11');
    callback(actionKeyTyped('action', 'back'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10000000000');
    resetTyping();
  });

  it('handles big numbers in calculation (1 000 000 000 000*2=2.00000e+12)', function() {
    // first calculation 1 000 000 000 000 * 2 = 2.00000e+12
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10000000000');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+11');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+12');
    callback(actionKeyTyped('operator', 'multiply'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+12');
    callback(actionKeyTyped('number', '2'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('2.00000e+12');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1.00000e+12 x 2', operator: 'multiply'}]);
    resetTyping();
  });

  it('handles big numbers and decimal in calculation (1 000 000 000 000.1+7=1.42857e+11, +7777777=18367.34878)', function() {
    // first calculation 1 000 000 000 000.1 + 7 = 1.42857e+11
    expect(CalculatorStore.getDisplayScreen()).toEqual('0');
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('10000000000');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+11');
    callback(actionKeyTyped('number', '0'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+12');
    callback(actionKeyTyped('number', '.'));
    callback(actionKeyTyped('number', '1'));
    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.00000e+12');
    callback(actionKeyTyped('number', '7'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('7');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.42857e+11');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1.00000e+12 ÷ 7', operator: 'divide'}]);

    callback(actionKeyTyped('operator', 'divide'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('1.42857e+11');
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '7'));
    callback(actionKeyTyped('number', '7'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('7777777');
    callback(actionKeyTyped('action', 'equal'));
    expect(CalculatorStore.getDisplayScreen()).toEqual('18367.34878');
    expect(CalculatorStore.getDisplayFormulae()).toEqual([
      { id: undefined, literal: '1.42857e+11 ÷ 7777777', operator: 'divide'}]);
    resetTyping();
  });
});
