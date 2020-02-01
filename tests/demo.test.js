import { assert } from 'chai'
import {test, add, multi } from '../src/demo.js'

describe('运算功能测试', function () {
  it('运算test', function () {
    assert.equal(test(1), 3)
  })
  it('加法add函数测试', function () {
    var add5 = add(1)
    assert.equal(add5(2), 3)
  })
  it('乘法multi测试', function () {
    var multis = multi(1)
    assert.equal(multis(5), 6)
  })
})