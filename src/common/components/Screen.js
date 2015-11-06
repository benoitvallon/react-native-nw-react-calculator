'use strict';

import Base from './ScreenBase';
import ScreenRender from './ScreenRender';

export default class Screen extends Base {
  render () {
    return <ScreenRender />;
  }
}
