function draw(context, positions, color, line_size) {
  context.beginPath();
  context.moveTo(positions.prevX, positions.prevY);
  context.lineTo(positions.currX, positions.currY);
  context.strokeStyle = color;
  context.lineWidth = line_size;
  context.stroke();
  context.closePath();
}

function findxy(eventType, positions, canvas, settings, e) {
  e.preventDefault();
  let context = canvas.getContext("2d");
  let draw_flag = settings.clicked;
  let dot_flag = false;

  if (eventType === "touchstart" || eventType === "mousedown") {
  
    dot_flag = true;
    if (dot_flag) {
      if(eventType === "touchstart") {
        let touches = e.changedTouches;
        positions.prevX = touches[0].pageX - canvas.offsetLeft;
        positions.prevY = touches[0].pageY - canvas.offsetTop;
        positions.currX = touches[0].pageX - canvas.offsetLeft;
        positions.currY = touches[0].pageY - canvas.offsetTop; 
        context.beginPath();
        context.fillStyle = settings.color;
        context.fillRect(touches[0].pageX, touches[0].pageY, settings.line_size, settings.line_size); 
        context.closePath();
        dot_flag = false;
      }
      else {
        positions.prevX = positions.currX;
        positions.prevY = positions.currY;
        positions.currX = e.clientX - canvas.offsetLeft;
        positions.currY = e.clientY - canvas.offsetTop;
        context.beginPath();
        context.fillStyle = settings.color;
        context.fillRect(positions.currX, positions.currY, settings.line_size, settings.line_size);
        context.closePath();
        dot_flag = false;
      }
    }
  }
  if (eventType === "touchmove" || eventType === "mousemove") {
    if (draw_flag) {
      if(eventType === "touchmove") {
        let touches = e.changedTouches;
        positions.prevX = positions.currX;
        positions.prevY = positions.currY;
        positions.currX = touches[0].pageX - canvas.offsetLeft;
        positions.currY = touches[0].pageY - canvas.offsetTop; 
        draw(context, positions, settings.color, settings.line_size);
      }
      else {
        positions.prevX = positions.currX;
        positions.prevY = positions.currY;
        positions.currX = e.clientX - canvas.offsetLeft;
        positions.currY = e.clientY - canvas.offsetTop;
        draw(context, positions, settings.color, settings.line_size);
      }
    }
  }
}

function drawRotated(image, degrees) {
    let canvas = document.getElementById("image-canvas");
    let context = canvas.getContext("2d");

    let aspect_ratio = image.width / image.height;

    canvas.width = window.innerWidth - 10;
    canvas.height = canvas.width * aspect_ratio;
    
    context.clearRect(0,0,canvas.width,canvas.height);

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();

    // move the (0,0) point to the center of the canvas
    context.translate(canvas.width/2, canvas.height/2);

    // rotate the canvas the specified number of degrees
    context.rotate(degrees*Math.PI/180);

    /* 
      Draw the image. Since the context is shifted so (0,0) is in the middle, we need to start
      drawing from half the width of the canvas to the left and half the height of the canvas
      up. Since the canvas is rotated, we need draw the image with the x and y sizes swapped. 
      Currently this only handles a 90 degree rotation.
    */
    context.drawImage(image, -canvas.height/2, -canvas.width/2, canvas.height, canvas.width);

    // we’re done with the rotating so restore the unrotated context
    context.restore();
}

//When the DOM is fully loaded...
$(document).ready(function() {

  let image = document.createElement("img");
  let canvas = document.getElementById("image-canvas");
  let positions = {currX: 0, currY: 0, prevX: 0, prevY: 0};
  let settings = {color: "black", line_size: 2, clicked: false};

  $("#color-selection").on("change", function(e) {
    settings.color = e.target.value;
  });

  $("#line-selection").on("change", function(e) {
    settings.line_size = e.target.value;
  });

  $("#image-canvas").on("touchstart", function(e) {
    settings.clicked = true;
    findxy("touchstart", positions, canvas, settings, e);
  });

  $("#image-canvas").on("mousedown", function(e) {
    settings.clicked = true;
    findxy("mousedown", positions, canvas, settings, e);
  });

  $("#image-canvas").on("touchend", function(e) {
    settings.clicked = false;
    findxy("touchend", positions, canvas, settings, e);
  });

  $("#image-canvas").on("mouseup", function(e) {
    settings.clicked = false;
    findxy("mouseup", positions, canvas, settings, e);
  });

  $("#image-canvas").on("touchmove", function(e) {
    findxy("touchmove", positions, canvas, settings, e);
  });

  $("#image-canvas").on("mousemove", function(e) {
    findxy("mousemove", positions, canvas, settings, e);
  });

  //Setup an event handler on change of the image input
  $("#take-picture").on("change", function(e) {
    //Get a reference to the file
    let data = e.originalEvent.target.files[0];

    //Set up a FileReader
    let reader = new FileReader();

    //Set up the onload function of the FileReader
    reader.onload = function(event) {

      //set the image source to the result of the FileReader
      image.src = event.target.result;
      image.onload = function() {
        //context.drawImage(image, 0, 0, canvas.width, canvas.height);
        $("#image-canvas").css("display", "inline");
        drawRotated(image, 90);
      };
    };
    reader.readAsDataURL(data);
  });
});
