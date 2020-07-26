'use strict';

import React from 'react';
import Screen from './Screen';
import Formulae from './Formulae';
import Keyboard from './Keyboard';
import KeyboardHandler from './KeyboardHandler';

export default function () {
  return (
    <div className='main'>
      <Screen />
      <Formulae />
      <Keyboard />
      <KeyboardHandler />
    </div>
  );
}
