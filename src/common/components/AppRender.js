'use strict';

import React, { Component } from 'react';
import Screen from './Screen';
import Formulae from './Formulae';
import Keyboard from './Keyboard';

export default class AppRender extends Component () {
  Render () {
    return (
      <div className='main'>
        <Screen />
        <Formulae />
        <Keyboard />
      </div>
    );
  }
}
