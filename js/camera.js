$("#take-picture").on("change", function(e) {
  let data = e.originalEvent.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    $(".image-div").attr("src", event.target.result);
    reader.readAsDataUrl(data);
  };
});
