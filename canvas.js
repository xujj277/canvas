var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var using = false
var lastPoint = {x: undefined, y: undefined}

var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  actions.className = 'actions showBrushButton'
}
brush.onclick = function () {
  eraserEnabled = false
  actions.className = 'actions'
}

autoSetCanvasSize(canvas)
listenToMouse(canvas)

function drawLine (x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)   // 起点
  context.lineWidth = 5
  context.lineTo(x2, y2)   // 终点
  context.stroke()
  context.closePath()
}

function autoSetCanvasSize (canvas) {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }
  function setCanvasSize () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function listenToMouse (canvas) {
  canvas.onmousedown = function (val) { 
    var x = val.clientX
    var y = val.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    } else {
      lastPoint = {x: x, y: y}
    }
  }
  canvas.onmousemove = function (val) {
    var x = val.clientX
    var y = val.clientY
    if (!using) return
    if (eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    } else {
      var newPoint = {x: x, y: y}
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  } 
  canvas.onmouseup = function (val) {
    using = false
  }
}