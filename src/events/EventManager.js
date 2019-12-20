

// import { EVENTS } from './events'
// import triggerEvent from './triggerEvent'
import mouseEventListeners from './eventListeners/mouseEventListeners'
import MouseDispatchers from './eventDispatchers/MouseEventDispatchers'

export class EventManager {
  constructor({ element, root }) {
    this.element = element
    this.root = root
    this.init()
  }
  init = () => {
    // 注册鼠标事件
    mouseEventListeners.enable(this.element)
    this.MouseDispatchers = new MouseDispatchers({
      element: this.element,
      root: this.root
    })
  }
  on = (eventType, callback) => {
    this.element.addEventListener(eventType, callback)
  }
  off = (eventType, callback) => {
    this.element.removeEventListener(eventType, callback)
  }
  destroy() {
    mouseEventListeners.disable(this.element)
    this.mouseEventDispatchers.disable()
  }
}

export default EventManager