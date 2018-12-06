var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var using = false
var lastPoint = {x: undefined, y: undefined}
var eraserEnabled = false

autoResizeCanvas()
listenToUser(canvas)


eraser.onclick = function (val) {
  eraserEnabled = true
  actions.className = 'actions showBrushButton'
}
brush.onclick = function (val) {
  eraserEnabled = false
  actions.className = 'actions'
}
 
function autoResizeCanvas () {
  setCanvasSize()
  window.onresize = function () {
    setCanvasSize()
  }
}

function setCanvasSize () {
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  canvas.width = pageWidth
  canvas.height = pageHeight
}
function listenToUser (canvas) {
  canvas.onmousedown = function (val) {
    using = true
    var x = val.clientX
    var y = val.clientY
    if (eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    } else {
      lastPoint = {x: x, y: y}
    }
  }
  
  canvas.onmousemove = function (val) {
    var x = val.clientX
    var y = val.clientY
    var newPoint = {x: x, y: y}
    if (!using) return
    if (eraserEnabled) {
      context.clearRect(x-5, y-5, 10, 10)
    } else {
      drawLines(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
  
  canvas.onmouseup = function (val) {
    using = false
  }
}

function drawLines (x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = 5;
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
}

