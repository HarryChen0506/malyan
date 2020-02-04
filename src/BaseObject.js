

import _ from './utils/tool'

export class BaseObject {
  constructor(){
    this.uuid = _.uuid()
    this.children = []
    this.parent = null
  }
  add(...args) {
    let objects = []
    if (Array.isArray(args[0])) {
      objects = args[0]
    } else {
      objects = args
    }
    objects.forEach(object => {
      if (object && this.children) {
        object.parent = this
        this.children.push(object)
      }
    })
  }
  remove(...args) {
    let objects = []
    if (Array.isArray(args[0])) {
      objects = args[0]
    } else {
      objects = args
    }
    objects.forEach(object => {
      if (object && this.children) {
        object.parent = null
        const index = this.children.indexOf(object)
        if (index > -1) {
          this.children.splice(index, 1)
        }
      }
    })
  }
  destroy() {
    if (!this.parent) {
      return
    }
    const index = this.parent.children.indexOf(this)
    if (index > -1) {
      this.parent.children.splice(index, 1)
    }
    this.parent = null
  }
  clone() {
    const instance = new this.constructor()
    instance.parent = this.parent
    return instance
  }
}

export default BaseObject