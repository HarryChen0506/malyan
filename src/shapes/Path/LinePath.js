import BaseCommandPath from './BaseCommandPath'

export class LinePath extends BaseCommandPath{
  constructor(options = {}) {
    super(options)
  }
  render(ctx) {
    ctx.lineTo(this.end.x, this.end.y)
  }
}

export default LinePath