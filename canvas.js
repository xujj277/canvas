var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var using = false
var lastPoint = {x: undefined, y: undefined}
var eraserEnabled = false

autoResizeCanvas()
listenToUser(canvas)


eraser.onclick = function (val) {
  eraserEnabled = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function (val) {
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}
red.onclick = function () {
  context.strokeStyle = 'red'
}
yellow.onclick = function () {
  context.strokeStyle = 'yellow'
}
blue.onclick = function () {
  context.strokeStyle = 'blue'
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
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function (val) {
      using = true
      var x = val.touches[0].clientX
      var y = val.touches[0].clientY
      if (eraserEnabled) {
        context.clearRect(x-5, y-5, 10, 10)
      } else {
        lastPoint = {x: x, y: y}
      }
    }
    canvas.ontouchmove = function (val) {
      var x = val.touches[0].clientX
      var y = val.touches[0].clientY
      var newPoint = {x: x, y: y}
      if (!using) return
      if (eraserEnabled) {
        context.clearRect(x-5, y-5, 10, 10)
      } else {
        drawLines(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function (val) {
      using = false
    }
  } else {
    // 非触屏设备
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
}

function drawLines (x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineWidth = 5;
  context.lineTo(x2, y2);
  context.closePath();
  context.stroke();
}

