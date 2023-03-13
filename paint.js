/* function _(selector) {
    return document.querySelector(selector);
}
function setup() {
    let canvas = createCanvas(650, 600);
    canvas.parent("canvas-wrapper");
    background(255);
}
function mouseDragged() {
    let type =_("#pen-pencil").checked?"pencil":"brush";
    let size = parseInt(_("#pen-size").value);
    let color = _("#pen-color").value;
    fill(color);
    stroke(color);
    if (type=="pencil") {
         line(pmousex,pmousey,mousex,mousey);
    }else {
         ellipse(pmousex,pmousey,size,size);
    }
}
 */
 const canvas = document.getElementById("canvas-wrapper");
 canvas.width = window.innerwidth =60;
 canvas.height =400;
 let context=canvas.getContext("2d");
 context.fillStyle = "white";
 context.fillRect(0,0,canvas.width, canvas.height);
 let drawColor="black";
 let drawWidth="2";
 let isDrawing=false;
 
 canvas.addEventListener("touchmove", start,false);
 canvas.addEventListener("touchstart", draw,false);
 canvas.addEventListener("mousedown", start,false);
 canvas.addEventListener("mousemove", draw,false);
 
 canvas.addEventListener("touchend", stop,false);
 canvas.addEventListener("mouseout", stop,false);
 canvas.addEventListener("mouseup", stop,false);
 
 function start(event) {
      isDrawing=true;
      context.beginPath();
      context.moveTo(event.clientX = canvas.offsetLeft,event.clientY = canvas.offsetTop);
      event.preventDefault();
 }
 
 function draw(event) {
      if(isDrawing) {
           context.lineTo(event.clientX = canvas.offsetLeft,event.clientY = canvas.offsetTop);
           context.strokeStyle =drawColor;
           context.lineWidth =drawWidth;
           context.lineCap="round";
           context.lineJoin="round";
           context.stroke();
      }
      event.preventDefault();
 }
 
 function stop(event) {
      if(isDrawing) {
           context.stroke();
           context.closePath();
           isDrawing=false;
      }
      event.preventDefault();
 }
