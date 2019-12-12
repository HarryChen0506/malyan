
export class Matrix {

  constructor() {
    this.elements = []
  }
  static Identity = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]
  /**
   * Multiply two matrix 3x3 arrays or 3x1 arrays
   */
  static multiply = function (A, B) {
    if (B.length <= 3) { // Multiply Vector
      var a = B[0] || 0, b = B[1] || 0, c = B[2] || 0
      var x = A[0] * a + A[1] * b + A[2] * c
      var y = A[3] * a + A[4] * b + A[5] * c
      var z = A[6] * a + A[7] * b + A[8] * c
      return { x: x, y: y, z: z }
    }

    var A0 = A[0], A1 = A[1], A2 = A[2]
    var A3 = A[3], A4 = A[4], A5 = A[5]
    var A6 = A[6], A7 = A[7], A8 = A[8]

    var B0 = B[0], B1 = B[1], B2 = B[2]
    var B3 = B[3], B4 = B[4], B5 = B[5]
    var B6 = B[6], B7 = B[7], B8 = B[8]

    return [
      A0 * B0 + A1 * B3 + A2 * B6,
      A0 * B1 + A1 * B4 + A2 * B7,
      A0 * B2 + A1 * B5 + A2 * B8,
      A3 * B0 + A4 * B3 + A5 * B6,
      A3 * B1 + A4 * B4 + A5 * B7,
      A3 * B2 + A4 * B5 + A5 * B8,
      A6 * B0 + A7 * B3 + A8 * B6,
      A6 * B1 + A7 * B4 + A8 * B7,
      A6 * B2 + A7 * B5 + A8 * B8
    ]
  }
  static formatParams = function (...args) {
    if (Array.isArray(args[0])) {
      return args[0]
    }
    let res = []
    args.forEach((v, index) => {
      if (isNaN(v)) {
        console.error('Matrix set params is not a number')
      }
      res[index] = v
    })
    return res
  }
  set(...args) {
    this.elements = Matrix.formatParams(...args)
    return this
  }
  identity() {
    this.set(Matrix.Identity)
    return this
  }
  multiply(...args) {
    const B = Matrix.formatParams(...args)
    this.elements = Matrix.multiply(this.elements, B)
    return this
  }
}

export default Matrix