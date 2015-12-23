'use strict';

import Render from './ScreenRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
