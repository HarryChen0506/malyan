import Group from './Group'


export class Scene extends Group{
  constructor(...args) {
    super(...args)
  }
  render(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    super.render(ctx)
  }
}

export default Scene