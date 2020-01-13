import BaseCommandPath from './BaseCommandPath'

export class ArcPath extends BaseCommandPath {
  constructor(options = {}) {
    super(options)
    const { start, x, y, radius, startAngle, endAngle, anticlockwise } = options
    ArcPath.validateParams(options)
    this.x = x || 0
    this.y = y || 0
    this.radius = radius
    this.anticlockwise = anticlockwise || false
    this.startAngle = startAngle || 0
    this.endAngle = endAngle || Math.PI * 2
    if (start) {
      this.start = start
    }
    this.controls = []
  }
  static validateParams(options = {}) {
    const { radius } = options
    if (radius === undefined) {
      console.error('ArcPath `radius` props must not be null')
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
}

export default ArcPath