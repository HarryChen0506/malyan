
import Matrix from '../Matrix'
import _ from '../utils/tool'
import { EVENTS } from './events'
import mouseEventListeners from './eventListeners/mouseEventListeners'
import triggerEvent from './triggerEvent'

export class EventManager {
  constructor({ element, root }) {
    this.element = element
    this.root = root
    this.init()
  }
  init = () => {
    // 注册鼠标事件
    mouseEventListeners.enable(this.element)
  }
  on = (eventType, callback) => {
    this.element.addEventListener(eventType, callback)
  }
  off = (eventType, callback) => {
    this.element.removeEventListener(eventType, callback)
  }
  bindListeners = () => {
    this.element.addEventListener('click', (e) => {
      console.log('event', e)
      triggerEvent(this.root, EVENTS.ROOT_CLICK, {event: e})
    }, false)
  }
  bindDispatchers = () => {
    this.root.addEventListener(EVENTS.ROOT_CLICK, (e) => {
      console.log('EVENTS.ROOT_CLICK', e)
      const mouse = _.getEventPosition(e, this.root.ctx.canvas)
      this.root.tree.traverseDF_preOrder((node) => {
        if (node) {
          // console.log('node', node.name, node.calcFinalMatrix())
          const inverted_matrix = Matrix.invert(node.calcFinalMatrix())
          const relativePos = Matrix.multiply(inverted_matrix, [mouse.x, mouse.y, 1])
          console.log('relativePos', relativePos)
          const isInPath = node.containPoint && node.containPoint(this.root.ctx, relativePos)
          console.log('isInPath', isInPath)
        }
      })
    })
  }
}

export default EventManager