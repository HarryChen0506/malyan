import EventTarget from '../events/EventTarget'
import triggerEvent from '../events/triggerEvent'
import { mix } from '../utils/extend'

export class Rect extends mix(EventTarget) {
  constructor(options = {}) {
    super()
    const { name, x, y, width, height } = options
    this.name = name
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
    this.rotation = 0
    this.translation = { x: 0, y: 0 }
    this.scale = 1
    this.matrix = []
    this.color = '#000'
    this.lineWidth = 1
  }
  render(ctx) {
    console.log('rect render')
    ctx.save()
    ctx.strokeRect(this.x, this.y, this.width, this.height)
    ctx.restore()
  }
  on(type, callback) {
    this.addEventListener(type, callback)
  }
  fire(type) {
    triggerEvent(this, type)
  }
}

export default Rect