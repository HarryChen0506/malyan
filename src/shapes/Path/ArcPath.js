import BaseCommandPath from './BaseCommandPath'

export class ArcPath extends BaseCommandPath {
  constructor(options = {}) {
    super(options)
    ArcPath.validateParams(options)
    const { start, x, y, radius, startAngle, endAngle, anticlockwise } = options
    this.x = x || 0
    this.y = y || 0
    this.radius = radius
    this.anticlockwise = anticlockwise || false
    this.startAngle = startAngle || 0
    this.endAngle = endAngle || Math.PI * 2
    this.controls = []
    if (start) {
      this.start = start
    }
  }
  static validateParams(options = {}) {
    const { radius } = options
    if (radius === undefined) {
      console.warn('ArcPath `radius` props must not be null')
      return false
    }
    return true
  }
  moveTo(ctx) {
    ctx.moveTo(this.start.x, this.start.y)
  }
  render(ctx) {
    if (this.start) {
      this.moveTo(ctx)
    }
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise)
  }
  clone() {
    const instance = super.clone()
    if (this.start) {
      instance.start = this.start.clone()
    }
    instance.x = this.x
    instance.y = this.y
    instance.radius = this.radius
    instance.anticlockwise = this.anticlockwise
    instance.startAngle = this.startAngle
    instance.endAngle = this.endAngle
    instance.controls = []
    return instance
  }
}

export default ArcPath