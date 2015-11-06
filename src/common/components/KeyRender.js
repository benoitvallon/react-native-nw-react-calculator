'use strict';

import React, { Component } from 'react';

export default class KeyRender extends Component {
  Render () {
    var classString = 'key key-' + props.keyType;
    if(state.isHighlighted) {
      classString += ' highlight';
    }
    var classOperation = '';
    if(props.keyType === 'operator') {
      classOperation = 'operator ' + props.keyValue;
    }
    if(props.keyType === 'action') {
      classOperation = 'action ' + props.keyValue;
    }
    if(props.keyType === 'number') {
      return (
        <div className={classString}
            onClick={this.handleClick}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}>
          <div className={classOperation}>{props.keySymbol}</div>
        </div>
      );
    } else {
      return (
        <div className={classString}>
          <div className={classOperation}
            onClick={this.handleClick}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}>{props.keySymbol}</div>
        </div>
      );
    }
  }
}
