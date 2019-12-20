

import { EVENTS } from '../events'
import triggerEvent from '../triggerEvent'

let isClickEvent = true
let preventClickTimeout
const clickDelay = 200

function preventClickHandler() {
  isClickEvent = false
}

function mouseDown(e) {
  const element = this
  preventClickTimeout = setTimeout(preventClickHandler, clickDelay)
  // 当鼠标mousedown阻止默认move事件，待判断后再在document上注册该move事件
  this.removeEventListener('mousemove', mouseMove)

  const onMouseMove = function () {
  }
  const onMouseUp = function () {
    clearTimeout(preventClickTimeout)
    let eventType = EVENTS.MOUSE_UP
    if (isClickEvent) {
      eventType = EVENTS.ROOT_CLICK
    }

    const eventData = {
      event: e,
      element,
      type: eventType,
    }

    triggerEvent(element, eventType, eventData)

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    element.addEventListener('mousemove', mouseMove)
    isClickEvent = true
  }

  // document注册move和up事件
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function mouseMove() {
  // console.log('mouseMove')
}

function mouseDoubleClick() {
  // console.log('mouseDoubleClick')
}

function disable(element) {
  element.removeEventListener('mousedown', mouseDown)
  element.removeEventListener('mousemove', mouseMove)
  element.removeEventListener('dblclick', mouseDoubleClick)
}

function enable(element) {
  // Prevent handlers from being attached multiple times
  disable(element)
  element.addEventListener('mousedown', mouseDown)
  element.addEventListener('mousemove', mouseMove)
  element.addEventListener('dblclick', mouseDoubleClick)
}

export default {
  enable,
  disable,
}