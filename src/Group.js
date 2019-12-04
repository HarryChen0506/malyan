export class Group {
  constructor() {
    this.children = []
    this.rotation = 0
    this.translation = {x: 0, y: 0}
    this.scale = 1
    this.matrix = []
  }
  add(object) {
    if (object) {
      this.children.push(object)
    }
  }
}

export default Group