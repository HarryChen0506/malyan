

export class Group {
  constructor({ name }) {
    this.children = []
    this.parent = null
    this.name = name
    this.rotation = 0
    this.translation = { x: 0, y: 0 }
    this.scale = 1
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
  render() {
    console.log('group render')
  }
}

export default Group