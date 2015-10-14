'use strict';

describe('CalculatorStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/CalculatorStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
