
import { mix } from './utils/extend'

class Demo {
  demo() {
    console.log('demo')
  }
}

export class Group extends mix(Demo) {
  constructor() {
    super()
    this.children = []
    this.rotation = 0
    this.translation = { x: 0, y: 0 }
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