
import Vector from './Vector'

class Shape {
  constructor() {
    this.translation = new Vector({
      onChange: this.onChange
    })
  }
  onChange() {
    // console.log('onChange', vector)
  }
  get translation() {
    return this._translation
  }
  set translation(v = {}) {
    if (v instanceof Vector) {
      this._translation = v
    } else {
      this._translation = new Vector({
        ...v,
        onChange: this.onChange
      })
    }
  }
}

export default Shape