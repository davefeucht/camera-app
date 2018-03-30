$(document).ready(function() {
  $("#take-picture").on("change", function(e) {
    let data = e.originalEvent.target.files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
      if($(".scaled-image").length > 0) {
        image.src = event.target.result;
      }
      else  {
        let image = document.createElement("img");
        $(".image-div").append(image);
        $(".image-div img").addClass("scaled-image");
      }
    };
    reader.readAsDataURL(data);
  });
});
