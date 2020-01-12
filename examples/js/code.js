/* eslint-disable */
(function (window) {
  function CodeEditor(id) {
    this.id = id || 'code'
  }
  CodeEditor.prototype.setCode = function(value) {
    var codeDom = document.getElementById(this.id)
    codeDom.value = value
    return this
  }
  CodeEditor.prototype.showCode = function() {
    var codeDom = document.getElementById(this.id)
    if (!codeDom) {
      return
    }
    window.editor = CodeMirror.fromTextArea(codeDom, {
      mode: 'javascript',
      lineNumbers: true,	//显示行号
      // theme: '3024-night',	//设置主题
      theme: 'eclipse',	//设置主题
      lineWrapping: true,	//代码折叠
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      matchBrackets: true,	//括号匹配
      // maxHighlightLength: 100
      // readOnly: true,  
    })
  }
  window.CodeEditor = CodeEditor
})(this)

