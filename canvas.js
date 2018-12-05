var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var painting = false

function drawCircle (x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, 360)
  context.stroke()
}

canvas.onmousedown = function (val) {
  painting = true
  var x = val.clientX
  var y = val.clientY
  drawCircle(x, y, 1)
}
canvas.onmousemove = function (val) {
  if (painting) {
    var x = val.clientX
    var y = val.clientY
    drawCircle(x, y, 1)
  }
} 
canvas.onmouseup = function (val) {
  painting = false
}