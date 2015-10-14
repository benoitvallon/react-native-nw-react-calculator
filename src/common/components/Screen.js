import Base from './ScreenBase'
import Render from './ScreenRender'

export default class Screen extends Base {
  constructor (props) {
    super(props)
  }

  render () {
    return Render(this.props, this.state)
  }
}
