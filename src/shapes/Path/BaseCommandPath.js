
import Vector from '../../Vector'
export class BaseCommandPath {
  constructor(options = {}) {
    const { name, id, start, end } = options
    this.name = name
    this.id = id
    this.start = start || end || new Vector({
      x: 0,
      y: 0,
    })
    this.end = end || new Vector({
      x: 0,
      y: 0,
    })
    this.offsetX = 0
    this.offsetY = 0
  }
  moveTo(ctx) {
    ctx.moveTo(this.start.x + this.offsetX, this.start.y + this.offsetY)
  }
  render() {
    
  }
  setOffset(x, y) {
    if (x !== undefined) {
      this.offsetX = x
    }
    if (y !== undefined) {
      this.offsetY = y
    }
  }
}

export default BaseCommandPath