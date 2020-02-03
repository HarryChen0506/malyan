import { assert } from 'chai'
import Malyan from '../src/Malyan.js'

const element = document.createElement('canvas');
const canvas = new Malyan({
  dom: element,
  width: 500,
  height: 500,
})
describe('Malyan Class', function () {
  beforeEach(function () {
  })
  afterEach(function () {
  })
  it('initial properties', function () {
    assert.ok('ctx' in canvas)
    assert.ok('config' in canvas)
    assert.ok('scene' in canvas)
    assert.ok('tree' in canvas)
    assert.ok('autoClear' in canvas)
    assert.ok('eventManager' in canvas)
    assert.equal(canvas.width, 500,  'width should return 500 for `initial properties`')
    assert.equal(canvas.height, 500, 'height should return 500 for `initial properties`')
  })
  it('event', function () {
    assert.ok(typeof canvas.on === 'function')
    assert.ok(typeof canvas.off === 'function')
  })
})