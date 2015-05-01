'use strict';

describe('ExampleStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/ExampleStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
