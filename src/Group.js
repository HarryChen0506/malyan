
import Shape from './Shape'
import { mix } from './utils/extend'
export class Group extends mix(Shape) {
  constructor({ name }) {
    super()
    this.children = []
    this.parent = null
    this.name = name
    this.scale = { x: 1, y: 1 }
    this.rotation = 0
    this.matrix = []
  }
  add(object) {
    if (object) {
      object.parent = this
      this.children.push(object)
    }
  }
  remove(object) {
    if (object) {
      object.parent = null
      const index = this.children.indexOf(object)
      if (index > -1) {
        this.children.splice(index, 1)
      }
    }
  }
  render(ctx) {
    ctx.save()
    if (this.translation.x !== 0 || this.translation.y !== 0) {
      ctx.translate(this.translation.x, this.translation.y)
    }
    if (this.scale.x !== 1 || this.scale.y !== 1) {
      ctx.scale(this.scale.x, this.scale.y)
    }
    if (this.rotation !== 0) {
      ctx.rotate(this.rotation)
    }
    console.log('group render')
    for (let i = 0; i < this.children.length; i++) {
      this.children[i] && this.children[i].render(ctx)
    }
    ctx.restore()
  }
}

export default Group