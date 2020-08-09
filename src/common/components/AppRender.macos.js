'use strict';

import Render from './AppRender.native';

export default function () {
  return Render.call(this, this.props, this.state);
}
