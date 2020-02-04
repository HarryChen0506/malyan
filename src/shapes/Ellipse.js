import Shape from '../Shape'

const defaultConfig = {
  x: 0,
  y: 0,
  radiusX: 0,
  radiusY: 0,
  anticlockwise: false,
  startAngle: 0,
  endAngle: Math.PI * 2,
  rotation: 0
}
export class Ellipse extends Shape {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    Object.keys(defaultConfig).forEach(key => {
      this[key] = config[key]
    })
  }
  render(ctx) {
    this.onBeforeRender && this.onBeforeRender(ctx)
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
    this.onAfterRender && this.onAfterRender(ctx)
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    const path = new Path2D()
    path.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, this.startAngle, this.endAngle, this.anticlockwise)
    if (ctx.isPointInPath(path, point.x, point.y)) {
      return true
    }
    return false
  }
  clone({ deep = true } = {}) {
    const instance = super.clone({ deep })
    Object.keys(defaultConfig).forEach(key => {
      instance[key] = this[key]
    })
    return instance
  }
}

export default Ellipse