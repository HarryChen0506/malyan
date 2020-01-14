
import Shape from './Shape'
export class Group extends Shape {
  constructor(options = {}) {
    super(options)
    this.children = []
    this.parent = null
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