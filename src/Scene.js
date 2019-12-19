import Group from './Group'


export class Scene extends Group{
  constructor(...args) {
    super(...args)
    const options = args[0] || {}
    this.root = options.root
  }
  render(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    super.render(ctx)
  }
}

export default Scene