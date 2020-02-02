/* eslint-disable */
(function (window) {
  var STYLE = {
    container: {
      overflow: 'auto',
      height: '100%',
    },
    body: {
      padding: '0 0 10px 0'
    },
    item: {
      borderBottom: '1px solid #eee',
      padding: '0 10px 0 10px'
    },
    log: {
      marginRight: '5px',
      color: '#333',
      fontSize: '14px',
      lineHeight: '18px',
      display: 'inline-block'
    },
    error: '#fdf1f1',
    warn: '#fffbe7',
    blue: 'blue'
  }
  var TYPE = {
    LOG: 'log',
    WARN: 'warn',
    ERROR: 'error',
    INFO: 'info',
  }
  function Logger({ id, width, height }) {
    this.id = id || 'logger'
    this.height = height || '100%'
    this.width = width || '100%'
    this.container = document.querySelector('#' + this.id)
    if (!this.container) {
      console.error('page has not element for create a logger!')
      return
    }
    this.init()
  }
  function addStyle(dom, style) {
    style = style || {}
    for (var i in style) {
      dom.style[i] = style[i]
    }
  }
  function createLogText(text) {
    const span = document.createElement('span')
    var style = STYLE.log
    if (typeof text === 'number') {
      style = Object.assign({}, STYLE.log, { color: STYLE.blue })
    } else if (typeof text === 'object') {
      try {
        text = JSON.stringify(text)
      } catch(err) {
        console.log(err)
      }
    }
    addStyle(span, style)
    span.innerText = text
    return span
  }
  Logger.prototype.init = function () {
    STYLE.container.height = this.height
    addStyle(this.container, STYLE.container)
    this.createBody()
  }
  Logger.prototype.createBody = function (value) {
    var body = document.createElement('div')
    this.body = body
    this.body.id = 'logger-body'
    addStyle(body, STYLE.body)
    this.container.appendChild(body)
  }
  Logger.prototype.appendLog = function (list, type) {
    list = list || []
    const item = document.createElement('div')
    var background = ''
    if (type === TYPE.WARN) {
      background = STYLE.warn
    } else if (type === TYPE.ERROR) {
      background = STYLE.error
    }
    var style = Object.assign({}, STYLE.item, { background: background })
    addStyle(item, style)
    for (var i = 0; i < list.length; i++) {
      var span = createLogText(list[i])
      item.appendChild(span)
    }
    this.body.appendChild(item)
    return this
  }
  Logger.prototype.print = function (args, type) {
    var list = []
    for (var i = 0; i < args.length; i++) {
      list.push(args[i])
    }
    this.appendLog(list, type)
    return this
  }

  Logger.prototype.log = function () {
    this.print(arguments, TYPE.LOG)
    this.scrollTop()
  }
  Logger.prototype.warn = function () {
    this.print(arguments, TYPE.WARN)
    this.scrollTop()
  }
  Logger.prototype.info = function () {
    this.print(arguments, TYPE.INFO)
    this.scrollTop()
  }
  Logger.prototype.error = function () {
    this.print(arguments, TYPE.ERROR)
    this.scrollTop()
  }
  Logger.prototype.scrollTop = function () {
    const height = this.body.offsetHeight
    this.container.scrollTop = height
  }
  window.Logger = Logger
})(this)

