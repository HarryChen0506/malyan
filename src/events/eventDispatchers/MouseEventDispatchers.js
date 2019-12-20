import { EVENTS, triggerEvent} from '../index'
import Matrix from '../../Matrix'
import _ from '../../utils/tool'

export default class MouseDispatchers {
  constructor({ element, root }) {
    this.element = element
    this.root = root
    this.enable()
  }
  mouseClick = (e) => {
    // console.log('MouseDispatchers', this, e)
   
    // ROOT_CLICK
    const mouse = _.getEventPosition(e.detail.event, this.root.ctx.canvas)
    let object = null
    this.root.tree.traverseDF_preOrder((node) => {
      if (node) {
        // console.log('node', node.name, node.calcFinalMatrix())
        const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
        const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
        const isInPath = node.containPoint && node.containPoint(this.root.ctx, relativePos)
        if (isInPath) {
          object = node
          node.fire && node.fire(EVENTS.CLICK, {
            event: e.detail.event,
            target: node
          })
        }
      }
    })
    // emit root click event
    triggerEvent(this.element, EVENTS.OBJECT_CLICK, {
      event: e.detail.event,
      target: object
    })

  }
  enable() {
    this.element.addEventListener(EVENTS.ROOT_CLICK_PRIVATE, this.mouseClick)
  }
  disable() {
    this.element.removeEventListener(EVENTS.ROOT_CLICK_PRIVATE, this.mouseClick)
  }
}
