'use strict';

import React from 'react';

export default function (props, state) {
  var classString = 'key key-' + this.props.keyType;
  if(this.state.isHighlighted) {
    classString += ' highlight';
  }
  var classOperation = '';
  if(this.props.keyType === 'operator') {
    classOperation = 'operator ' + this.props.keyValue;
  }
  if(this.props.keyType === 'action') {
    classOperation = 'action ' + this.props.keyValue;
  }
  if(this.props.keyType === 'number') {
    return (
      <div className={classString}
          onClick={this.handleClick}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}>
        <div className={classOperation}>{this.props.keySymbol}</div>
      </div>
    );
  } else {
    return (
      <div className={classString}>
        <div className={classOperation}
          onClick={this.handleClick}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}>{this.props.keySymbol}</div>
      </div>
    );
  }
}
