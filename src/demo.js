function test(a) {
  return a + 2
}


function add(a) {
  return function (b) {
    return a + b
  }
}


function multi(x) {
  return function (y) {
    return x * y
  }
}

export {
  test,
  add,
  multi
}