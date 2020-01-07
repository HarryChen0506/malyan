import Vector from '../../Vector'

export class LinePath {
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
  render(ctx) {
    ctx.lineTo(this.end.x + this.offsetX, this.end.y + this.offsetY)
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

export default LinePath