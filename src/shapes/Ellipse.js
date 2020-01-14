import Shape from '../Shape'

export class Ellipse extends Shape {
  constructor(options = {}) {
    super(options)
    const { x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, rotation} = options
    this.x = x || 0
    this.y = y || 0
    this.radiusX = radiusX || 0
    this.radiusY = radiusY || 0
    this.anticlockwise = anticlockwise || false
    this.startAngle = startAngle || 0
    this.endAngle = endAngle || Math.PI * 2
    this.rotation = rotation || 0
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, this.startAngle, this.endAngle, this.anticlockwise)
    this.close && ctx.closePath()
    this.fill && ctx.fill()
    this.stroke && ctx.stroke()
    ctx.restore()
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    const path = new Path2D()
    path.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, this.startAngle, this.endAngle, this.anticlockwise)
    if (ctx.isPointInPath(path, point.x, point.y)) {
      return true
    }
    return false
  }
}

export default Ellipse