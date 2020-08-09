'use strict';

import Render from './FormulaeRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
