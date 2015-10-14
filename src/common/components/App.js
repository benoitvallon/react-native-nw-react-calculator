'use strict';

import React from 'react';
import Screen from './Screen';
import Formulae from './Formulae';
import Keyboard from './Keyboard';

var App = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <Screen />
        <Formulae />
        <Keyboard />
      </div>
    );
  }
});

module.exports = App;
