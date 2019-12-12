/* eslint-disable */
import EventTarget from '../events/EventTarget'
import triggerEvent from '../events/triggerEvent'
import { mix } from '../utils/extend'

export class Line extends mix(EventTarget) {
  constructor(options = {}) {
    super()
    const { name, x1, y1, x2, y2 } = options
    this.name = name
    this.rotation = 0
    this.translation = { x: 0, y: 0 }
    this.scale = 1
    this.matrix = []
    this.color = '#000'
    this.lineWidth = 1
  }
  render(ctx) {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(50, 50)
    ctx.stroke()
  }
  on(type, callback) {
    this.addEventListener(type, callback)
  }
  fire(type) {
    triggerEvent(this, type)
  }
}

export default Line