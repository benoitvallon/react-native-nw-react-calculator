'use strict';

import Base from './KeyBase';
import KeyRender from './KeyRender';

export default class Key extends Base {
  render () {
    return <KeyRender />;
  }
}
