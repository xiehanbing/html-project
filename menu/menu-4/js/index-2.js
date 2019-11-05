$(document).ready(function() {
  $(".k_menu-item").hover(
    function() {
      //$(this).addClass('active');
    },
    function() {
      var active = $(this).hasClass("active");
      if (active) {
      } else $(this).removeClass("active");
    }
  );
  $(".k_menu-item").click(function() {
    $(this)
      .removeClass("active")
      .unbind("hover");
    $(this)
      .siblings()
      .removeClass("active");
    $(this).addClass("active");
  });
});
