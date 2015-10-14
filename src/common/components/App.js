'use strict';

import React, { Component } from 'react';
import Screen from './Screen';
import Formulae from './Formulae';
import Keyboard from './Keyboard';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <Screen />
        <Formulae />
        <Keyboard />
      </div>
    );
  }
}

module.exports = App;
