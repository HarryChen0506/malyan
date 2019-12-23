import Shape from '../Shape'

export class Rect extends Shape {
  constructor(options = {}) {
    super(options)
    const { name, x, y, width, height } = options
    this.name = name
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    // ctx.rect(this.x, this.y, this.width, this.height)
    // this.fill && ctx.fill()
    // this.stroke && ctx.stroke()
    const path = new Path2D()
    path.rect(this.x, this.y, this.width, this.height)
    this.fill && ctx.fill(path)
    this.stroke && ctx.stroke(path)
    ctx.restore()
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    // ctx.save()
    // ctx.beginPath()
    // ctx.rect(this.x, this.y, this.width, this.height)
    // ctx.restore()
    const path = new Path2D()
    path.rect(this.x, this.y, this.width, this.height)
    if (ctx.isPointInPath(path, point.x, point.y)) {
      return true
    }
    return false
  }
 
}

export default Rect