import Arc from './Arc'

export class Circle extends Arc {
  constructor(options = {}) {
    super(options)
    this.anticlockwise = true
    this.startAngle = 0
    this.endAngle =  Math.PI * 2
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    const path = new Path2D()
    path.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
    if (ctx.isPointInPath(path, point.x, point.y)) {
      return true
    }
    return false
  }
}

export default Circle