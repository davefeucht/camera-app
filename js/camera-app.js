//When the DOM is fully loaded...
$(document).ready(function() {
  //Setup an event handler on change of the image input
  $("#take-picture").on("change", function(e) {
    //Get a reference to the file
    let data = e.originalEvent.target.files[0];
    //Set up a FileReader
    let reader = new FileReader();
    //Set up the onload function of the FileReader
    reader.onload = function(event) {
      //Get the canvas element
      let image = document.createElement("img");
      let canvas = document.getElementById("image-canvas");
      let context = canvas.getContext("2d");
      let deviceWidth = window.innerWidth;

      canvas.width = deviceWidth - 40;
      canvas.height = deviceWidth - 40;
      image.src = event.target.result;
      image.onload = function() {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        $("#image-canvas").css("display", "inline");
      }
    };
    reader.readAsDataURL(data);
  });
});
