/* eslint-disable */
import EventTarget from '../events/EventTarget'
import triggerEvent from '../events/triggerEvent'
import { mix } from '../utils/extend'

export class Line extends mix(EventTarget) {
  constructor(options = {}) {
    super()
    const { x1, y1, x2, y2 } = options
    this.rotation = 0
    this.translation = { x: 0, y: 0 }
    this.scale = 1
    this.matrix = []
    this.color = '#000'
    this.lineWidth = 1;
  }
  draw() {
    console.log('line')
  }
  on(type, callback) {
    this.addEventListener(type, callback)
  }
  fire(type) {
    triggerEvent(this, type)
  }
}

export default Line