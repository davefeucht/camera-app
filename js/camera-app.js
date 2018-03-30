$(document).ready(function() {
  $("#take-picture").on("change", function(e) {
    let data = e.originalEvent.target.files[0];
    let reader = new FileReader();
    reader.onload = function(event) {
      let image = document.createElement("img");
      image.src = event.target.result;
      $(".image-div").append(image);
    };
    reader.readAsDataURL(data);
  });
});
