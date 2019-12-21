import { EVENTS, triggerEvent} from '../index'
import Matrix from '../../Matrix'
// import _ from '../../utils/tool'
import math from '../../utils/math'

export default class MouseDispatchers {
  constructor({ element, root }) {
    this.element = element
    this.root = root
    this.enable()
  }
  mouseClick = (e) => {
    // console.log('MouseDispatchers', this, e)
   
    // ROOT_CLICK
    const mouse = math.pageToCanvas( this.root.ctx.canvas, e.detail.event.clientX,  e.detail.event.clientY)
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
            ...e.detail,
            target: node
          })
        }
      }
    })
    // emit root click event
    triggerEvent(this.element, EVENTS.OBJECT_CLICK, {
      ...e.detail,
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
