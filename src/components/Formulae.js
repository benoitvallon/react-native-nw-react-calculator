'use strict';

var React = require('react');

var Formulae = React.createClass({
  render: function() {
    return (
      <div className='formulae'>
        <span className='group multiply'>12 x 3</span>
        <span className='group substract'>-</span>
        <span className='group multiply'>5 x 2</span>
      </div>
    );
  }
});

module.exports = Formulae;
