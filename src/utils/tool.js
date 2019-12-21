export const cloneDeep = obj => {
  // Handle the 3 simple types, and null or undefined
  if (obj === null || typeof obj !== 'object') return obj
  // Handle Date
  if (obj instanceof Date) {
    const copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }
  // Handle Array
  if (obj instanceof Array) {
    const copy = []
    const len = obj.length
    for (let i = 0; i < len; ++i) {
      copy[i] = cloneDeep(obj[i])
    }
    return copy
  }
  // Handle Object
  const copy = {}
  for (let attr in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, attr)) {
      copy[attr] = cloneDeep(obj[attr])
    }
  }
  return copy
}

export default {
  cloneDeep
}
