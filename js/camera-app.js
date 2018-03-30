$(document).ready(function() {
  $("#take-picture").on("change", function(e) {
    let data = e.originalEvent.target.files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
      if($(".scaled-image").length > 0) {
        $(".scaled-image").attr("src", event.target.result);
      }
      else {
        let image = document.createElement("img");
        image.src = event.target.result;
        $(".image-div").append(image);
        $(".image-div img").addClass("scaled-image");
      }
    };
    reader.readAsDataURL(data);
  });
});
