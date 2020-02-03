import Shape from '../Shape'

const defaultConfig = {
  x: 0,
  y: 0,
  radius: 0,
  anticlockwise: false,
  startAngle: 0,
  endAngle: Math.PI * 2
}
export class Arc extends Shape {
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
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
    this.closed && ctx.closePath()
    this.fill && ctx.fill()
    this.stroke && ctx.stroke()
    ctx.restore()
    this.onAfterRender && this.onAfterRender(ctx)
  }
  copy() {
    const instance = super.copy()
    Object.keys(defaultConfig).forEach(key => {
      instance[key] = this[key]
    })
    return instance
  }
}

export default Arc