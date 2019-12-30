import Vector from '../../Vector'

export class LinePath {
  constructor(options = {}) {
    const { name, start, end } = options
    this.name = name
    this.start = start || end || new Vector({
      x: 0,
      y: 0,
    })
    this.end = end || new Vector({
      x: 0,
      y: 0,
    })
  }
  render(ctx) {
    ctx.lineTo(this.end.x, this.end.y)
  }
}

export default LinePath