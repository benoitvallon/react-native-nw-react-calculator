'use strict';

import React, { Component } from 'react';

export default function (props, state) {
  return (
    <div className='screen'>
      {state.displayScreen}
    </div>
  );
}
