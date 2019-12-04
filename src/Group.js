export class Group {
  constructor() {
    this.children = []
  }
  add(object) {
    if (object) {
      this.children.push(object)
    }
  }
}

export default Group