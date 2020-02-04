import BaseCommandPath from './BaseCommandPath'
import Vector from '../../Vector'

export class LinePath extends BaseCommandPath{
  constructor(options = {}) {
    super(options)
    LinePath.validateParams(options)
    const { start, end } = options
    if (start) {
      this.start = start
    }
    this.end = end || new Vector({
      x: 0,
      y: 0,
    })
  }
  static validateParams(options = {}) {
    const { end } = options
    if (!end || end.x === undefined || end.y === undefined) {
      console.warn('LinePath `end` props must be not null in Path.createElements function')
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
    ctx.lineTo(this.end.x, this.end.y)
  }
  clone() {
    const instance = super.clone()
    if (this.start) {
      instance.start = this.start.clone()
    }
    instance.end = this.end.clone()
    return instance
  }
}

export default LinePath