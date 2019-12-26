
class Vector {
  constructor({ x, y, onChange }) {
    this.x = x || 0
    this.y = y || 0
    this.onChange = onChange
  }
  get x() {
    return this._x
  }
  set x(v) {
    this._x = v
    typeof this.onChange === 'function' && this.onChange(this)
  }
  get y() {
    return this._y
  }
  set y(v) {
    this._y = v
    typeof this.onChange === 'function' && this.onChange(this)
  }
  set(x, y) {
    this.x = x
    this.y = y
  }
}

export default Vector