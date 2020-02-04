
// import Vector from '../../Vector'
export class BaseCommandPath {
  constructor(options = {}) {
    const { name, id } = options
    this.name = name
    this.id = id
  }
  moveTo(ctx) {
    ctx.moveTo(this.start.x, this.start.y)
  }
  render() {
  }
  clone() {
    const instance = new this.constructor()
    instance.name = this.name
    instance.id = this.id
    return instance
  }
}

export default BaseCommandPath