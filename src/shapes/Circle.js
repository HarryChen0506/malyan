import Arc from './Arc'

const defaultConfig = {
  anticlockwise: true,
  startAngle: 0,
  endAngle: Math.PI * 2
}
export class Circle extends Arc {
  constructor(options = {}) {
    super(options)
    const config = { ...defaultConfig, ...options }
    Object.keys(defaultConfig).forEach(key => {
      this[key] = config[key]
    })
  }
  containPoint(ctx, point = { x: 0, y: 0 }) {
    const path = new Path2D()
    path.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
    if (ctx.isPointInPath(path, point.x, point.y)) {
      return true
    }
    return false
  }
  getBoundingClientRect() {
    const res = {
      left: this.x - this.radius,
      right: this.x + this.radius,
      top: this.y - this.radius,
      bottom: this.y + this.radius,
      width: 2 * this.radius,
      height:2 * this.radius
    }
    return res
  }
  copy() {
    const instance = super.copy()
    Object.keys(defaultConfig).forEach(key => {
      instance[key] = this[key]
    })
    return instance
  }
}

export default Circle