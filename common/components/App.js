'use strict';

var React = require('react'),
    Screen = require('./Screen'),
    Formulae = require('./Formulae'),
    Keyboard = require('./Keyboard');

// CSS
// require('normalize.css');
// require('../styles/main.css');

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
