var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100 ;

window.addEventListener("resize", (e)=>{
   canvas.width = window.innerWidth-100;
   canvas.height = window.innerHeight-100 ;
},false);

var body = document.getElementById("main");
body.style.backgroundColor = "#8098ff";

body.width = window.innerWidth;
body.height = window.innerHeight ;

var theInput = document.getElementById("bgColor");

theInput.addEventListener("input", function(){
  theColor = theInput.value;
  canvas.style.backgroundColor = theColor;
}, false);
 
var context = canvas.getContext('2d');
var touch = {
    x: undefined,
    y: undefined 
}
canvas.addEventListener("pointerdown", start,false);
canvas.addEventListener("pointermove", draw,false);
function start(event) {
    // console.log(event);
    touch.x = event.pageX;
    touch.y = event.pageY;
    // console.log(mouse);
    context.beginPath();
    context.moveTo(touch.x-50,touch.y-50);
}
function draw(event) {
    // console.log(event);
    touch.x = event.pageX;
    touch.y = event.pageY;
    context.beginPath();
    context.lineTo(touch.x-50,touch.y-50);
    context.strokeStyle = color.value;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth= range.value;
    context.stroke();
    /* event.preventDefault(); */
}

window.addEventListener("touchstop", stop,false);

function stop(event) {
    context.stroke();
    context.closePath();
    /* event.preventDefault(); */
}

document.getElementById("reset").addEventListener("click", resetCanvas);

function resetCanvas(event) {
    context.fillStyle="#d5dfffb2";
    context.clearRect(0,0,canvas.width, canvas.height);
    event.preventDefault();
}

document.getElementById("save").addEventListener("click", saveCanvas);

function saveCanvas(event) {
    const link = document.createElement("a"); 
     link.download = "canvas.png"; 
     link.href = canvas.toDataURL(); 
     link.click(); 
}
