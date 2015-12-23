'use strict';

import Render from './KeyboardRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
