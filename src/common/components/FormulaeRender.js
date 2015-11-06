'use strict';

import React from 'react';

export default class FormulaeRender extends Component {
  Render () {
    return (
      <div className='formulae'>
        {state.displayFormulae.map(function(formula) {
          return <span key={formula.id} onClick={this.handleClick.bind(this, formula)} className={this.dynamicClass(formula.operator)}>{formula.literal}</span>
        }, this)}
      </div>
    );
  }
}
