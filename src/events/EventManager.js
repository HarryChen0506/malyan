
import Matrix from '../Matrix'
import _ from '../utils/tool'
import { EVENTS } from './events'

function triggerEvent(el, type, detail = null, originEvent = null) {
  let event
  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(type, {
      detail,
      cancelable: true
    })
  } else {
    event = document.createEvent('CustomEvent')
    event.initCustomEvent(type, true, true, detail)
  }
  if (originEvent) {
    event.originEvent = originEvent
  }
  return el.dispatchEvent(event)
}

export class EventManager {
  constructor({ element, root }) {
    this.element = element
    this.root = root
    this.init()
  }
  init = () => {
    this.bindListeners()
    this.bindDispathers()
  }
  bindListeners = () => {
    this.element.addEventListener('click', (e) => {
      console.log('event', e)
      triggerEvent(this.root, EVENTS.ROOT_CLICK, null, e)
    }, false)
  }
  bindDispathers = () => {
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