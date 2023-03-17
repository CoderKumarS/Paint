var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-145 ;

var dis = canvas.getBoundingClientRect();

window.addEventListener("resize", (e)=>{
   canvas.width = window.innerWidth-100;
   canvas.height = window.innerHeight-145 ;
   var dis = canvas.getBoundingClientRect();
},false);

var body = document.getElementById("main");
body.style.backgroundColor = "#A7C6D9";

body.width = window.innerWidth;
body.height = window.innerHeight ;

var theInput = document.getElementById("bgColor");

theInput.addEventListener("input", function(){
  theColor = theInput.value;
  canvas.style.backgroundColor = theColor;
}, false);
 
var c = canvas.getContext('2d');
var touch = {
    x: undefined,
    y: undefined 
}

var undoArray = [];
var index = -1;

canvas.addEventListener("pointerdown", start,false);
canvas.addEventListener("pointermove", draw,false);
canvas.addEventListener("pointerout", stop,false);

function start(e) {
    touch.x = e.pageX;
    touch.y = e.pageY;
    c.beginPath();
    c.moveTo(touch.x-dis.x,touch.y-dis.y);
}

function draw(e) {
    touch.x = e.pageX;
    touch.y = e.pageY;
    c.beginPath();        
    c.lineTo(touch.x-dis.x,touch.y-dis.y);
    c.strokeStyle = color.value;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.lineWidth= range.value;
    c.stroke();
}

function stop(e) {
    c.stroke();
    c.closePath();
    /* 
    if(e.type != "pointerout") {
       undoArray.push(c.getImageData(0,0,
                   canvas.width, canvas.height));
       index+=1;
       console.log(undoArray);
    } */
    undoArray.push(c.getImageData(0,0,canvas.width, canvas.height));
    index+=1;
}

document.getElementById("reset").addEventListener("click", resetCanvas);

function resetCanvas(e) {
    c.fillStyle="#d5dfffb2";
    c.clearRect(0,0,canvas.width, canvas.height);
    
    undoArray = [];
    index = -1;
}

document.getElementById("undo").addEventListener("click", undoCanvas);

function undoCanvas(e) {
    if(index <= 0) {
       resetCanvas();
    }else {
       index-=1;
       undoArray.pop();
       c.putImageData(undoArray[index], 0, 0);
    }
}

document.getElementById("save").addEventListener("click", saveCanvas);

function saveCanvas(e) {
    const link = document.createElement("a"); 
     link.download = "paint.jpg"; 
     link.href = canvas.toDataURL(); 
     link.click(); 
}

window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};
