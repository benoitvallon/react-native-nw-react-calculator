'use strict';

var React = require('react'),
    Key = require('./Key');

var Keyboard = React.createClass({
  render: function() {
    return (
      <div className='keyboard'>
        <div className='keyboard-row'>
          <Key keyType='number' keyValue='1' />
          <Key keyType='number' keyValue='2' />
          <Key keyType='number' keyValue='3' />
        </div>
        <div className='keyboard-row'>
          <Key keyType='number' keyValue='4' />
          <Key keyType='number' keyValue='5' />
          <Key keyType='number' keyValue='6' />
        </div>
        <div className='keyboard-row'>
          <Key keyType='number' keyValue='7' />
          <Key keyType='number' keyValue='8' />
          <Key keyType='number' keyValue='9' />
        </div>
        <div className='keyboard-row'>
          <Key keyType='number' keyValue='%' />
          <Key keyType='number' keyValue='0' />
          <Key keyType='number' keyValue='.' />
        </div>

        <div className='keyboard-row'>
          <Key keyType='operation' keyValue=':' />
          <Key keyType='operation' keyValue='-' />
          <Key keyType='operation' keyValue='+' />
          <Key keyType='operation' keyValue='x' />
        </div>

        <div className='keyboard-row'>
          <Key keyType='action' keyValue='<<' />
          <Key keyType='action' keyValue='=' />
        </div>

      </div>
    );
  }
});

module.exports = Keyboard;
