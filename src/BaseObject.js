

import _ from './utils/tool'

export class BaseObject {
  constructor(){
    this.uuid = _.uuid()
  }
  add(...args) {
    args.forEach(object => {
      if (object && this.children) {
        object.parent = this
        this.children.push(object)
      }
    })
  }
  remove(...args) {
    args.forEach(object => {
      if (object && this.children) {
        object.parent = null
        const index = this.children.indexOf(object)
        if (index > -1) {
          this.children.splice(index, 1)
        }
      }
    })
  }
}

export default BaseObject