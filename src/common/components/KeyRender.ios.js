'use strict';

import Render from './KeyRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
