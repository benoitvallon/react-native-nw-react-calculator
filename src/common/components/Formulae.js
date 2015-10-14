'use strict';

import Base from './FormulaeBase';
import Render from './FormulaeRender';

export default class Formulae extends Base {
  constructor (props) {
    super(props);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}
