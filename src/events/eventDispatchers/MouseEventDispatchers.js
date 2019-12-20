import { EVENTS } from '../events'
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
    const mouse = _.getEventPosition(e.detail.event, this.root.ctx.canvas)
    this.root.tree.traverseDF_preOrder((node) => {
      if (node) {
        // console.log('node', node.name, node.calcFinalMatrix())
        const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
        const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
        // console.log('relativePos', relativePos)
        const isInPath = node.containPoint && node.containPoint(this.root.ctx, relativePos)
        console.log('isInPath', isInPath)
      }
    })
  }
  enable() {
    this.element.addEventListener(EVENTS.ROOT_CLICK, this.mouseClick)
  }
  disable() {
    this.element.removeEventListener(EVENTS.ROOT_CLICK, this.mouseClick)
  }
}
