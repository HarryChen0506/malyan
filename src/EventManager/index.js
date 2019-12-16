// event manager
import EventTarget from '../events/EventTarget'
// import triggerEvent from '../events/triggerEvent'

function triggerEvent(el, type, event, detail = null) {
  // 如果有event, 则直接使用现有的event
  if (!event) {
    if (typeof window.CustomEvent === 'function') {
      event = new CustomEvent(type, {
        detail,
        cancelable: true
      })
    } else {
      event = document.createEvent('CustomEvent')
      event.initCustomEvent(type, true, true, detail)
    }
  }
  event.customDetail = detail
  return el.dispatchEvent(event)
}

export class EventManager extends EventTarget {
  constructor(element) {
    super()
    this.element = element
    this.init()
  }
  init = () => {
    this.element.addEventListener('click', (e) => {
      console.log('event', e)
      triggerEvent(this, 'click', e)
    }, false)
  }
}

export default EventManager

