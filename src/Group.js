
import Shape from './Shape'
import { mix } from './utils/extend'
export class Group extends mix(Shape) {
  constructor(options = {}) {
    super(options)
    this.children = []
    this.parent = null
    this.name = options.name
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
    const matrix = this.matrix.elements
    ctx.transform(matrix[0], matrix[3], matrix[1], matrix[4], matrix[2], matrix[5])
    for (let i = 0; i < this.children.length; i++) {
      this.children[i] && this.children[i].render(ctx)
    }
    ctx.restore()
  }
}

export default Group