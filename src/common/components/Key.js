'use strict';

import Base from './KeyBase';
import Render from './KeyRender';

export default class Key extends Base {
  constructor (props) {
    super(props);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}
