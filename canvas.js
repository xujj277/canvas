var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var painting = false
var lastPoint = {x: undefined, y: undefined}


function drawCircle (x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, 360)
  context.fill()
}

function drawLine (x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)   // 起点
  context.lineWidth = 5
  context.lineTo(x2, y2)   // 终点
  context.stroke()
  context.closePath()
}

canvas.onmousedown = function (val) {
  painting = true
  var x = val.clientX
  var y = val.clientY
  lastPoint = {x: x, y: y}
  drawCircle(x, y, 1)
}
canvas.onmousemove = function (val) {
  if (painting) {
    var x = val.clientX
    var y = val.clientY
    var newPoint = {x: x, y: y}
    drawCircle(x, y, 1)
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
    lastPoint = newPoint
  }
} 
canvas.onmouseup = function (val) {
  painting = false
}