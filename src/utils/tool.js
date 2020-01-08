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
export const uuid = function () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return uuid
}
export const isNumber = function (value) {
  return Object.prototype.toString.call(value) === '[object Number]'
}

export default {
  cloneDeep,
  uuid,
  isNumber
}
