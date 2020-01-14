import Shape from '../Shape'

export class Arc extends Shape {
  constructor(options = {}) {
    super(options)
    const { x, y, radius, startAngle, endAngle, anticlockwise} = options
    this.x = x || 0
    this.y = y || 0
    this.radius = radius
    this.anticlockwise = anticlockwise || false
    this.startAngle = startAngle || 0
    this.endAngle = endAngle || Math.PI * 2
  }
  render(ctx) {
    ctx.save()
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    ctx.beginPath()
    this.setCtxProps && this.setCtxProps(ctx)
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
    this.close && ctx.closePath()
    this.fill && ctx.fill()
    this.stroke && ctx.stroke()
    ctx.restore()
  }
}

export default Arc