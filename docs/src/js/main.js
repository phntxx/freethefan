var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d")

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(Math.floor(e.pageX / 20), Math.floor(e.pageY / 20), false)
    })

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
          Draw(Math.floor(e.pageX / 20), Math.round(e.pageY / 20), true)
        }
    })

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    })
	    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    })
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "2";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
      ctx.fillRect(x, y, 1, 1)
    }
    lastX = x; lastY = y;
}

function clearArea() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function convertToDAT () {
  var gridArray = []
  for (var i = 0; i < 160; i++) {
    var columnarray = []
    for (var j = 0; j < 11; j++) {
      var pixel = ctx.getImageData(i, j, 1, 1).data[3]

      if (pixel !== 0) {
        columnarray.push(1)
      } else {
        columnarray.push(0)
      }

    }
    gridArray.push(convertToHex(columnarray))
  }

  var outputstring = ""
  var reverse = gridArray.reverse()
  outputstring = reverse.join(" ")
  document.getElementById("output").innerHTML = outputstring

}

function convertToHex (columnarray) {
  var arrayData = 0

  for (var i = 0; i < columnarray.length; i++) {
    if (columnarray[i] === 1) {
      arrayData += (Math.pow(2,(5+i)))
    }
  }
  return (arrayData+0x10000).toString(16).substr(-4).toUpperCase();

}
