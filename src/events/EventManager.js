
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

export class EventManager {
  constructor({element, root}) {
    this.element = element
    this.root = root
    this.init()
  }
  init = () => {
    this.element.addEventListener('click', (e) => {
      console.log('event', e)
      triggerEvent(this.root, 'click', e)
    }, false)
  }
}

export default EventManager