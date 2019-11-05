$(document).ready(function() {
  createScreenImg($(".example1"));
});
function createScreenImg($element) {
  $element.on("click", function(event) {
    event.preventDefault();
    $(".screen-content").createScreen(function(dataUrl) {
      // var newImg = document.createElement("img");
      // newImg.src = dataUrl;
      $.downloadLocalBlobImage(new Date().valueOf(), dataUrl);
      // document.body.appendChild(newImg);
      // $(".screen-content").append(newImg);
    });
  });
}
