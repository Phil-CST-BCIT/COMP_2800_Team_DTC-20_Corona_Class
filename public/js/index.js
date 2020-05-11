var isOpen = true;

$(document).ready(function () {
  $(".statbtn>a>button").click(function () {
    $(".statbtn>a>button").css("background-color", "blue");
  });
});

$(function () {
  $(".wrapper").prepend('<div class="botPart"/>');
  $(".wrapper").prepend('<div class="topPart"/>');

  $(".fa-bars").click(function () {
    effect(isOpen, [20, 20, 20]);
    isOpen = !isOpen;
  });

  $("ul>li").on("click", function () {
    $(this).animate({ marginLeft: "27%" });
    $("ul>li").animate({ marginLeft: "0" }, 111).delay(111);
  });
});

function effect(open, barsTiming) {
  $(".fa-bars").toggleClass("active");
  // open effect
  if (open) {
    $(".welcome").fadeOut();

    $(".topPart")
      .fadeIn()
      .animate({ height: "50%", top: "-25%" }, barsTiming[0], "easeOutBounce");
    $(".midPart")
      .fadeIn()
      .animate({ height: "50%", top: "25%" }, barsTiming[1], "easeOutBounce");
    $(".botPart")
      .fadeIn()
      .animate({ height: "50%", top: "75%" }, barsTiming[2], "easeOutBounce");

    var t = 0;
    $("ul").removeAttr("style").delay().animate({ top: "37%" });
    $("ul>li")
      .removeAttr("style")
      .each(function () {
        $(this).fadeIn().animate({ margin: "1%", padding: "5px" });
      });
  } else {
    //close effect
    var t = 0;

    $("ul").animate({ top: "23%" });

    $("ul>li").each(function () {
      $(this)
        .delay((t += Math.random() * 111))
        .fadeOut()
        .animate({ margin: "1%" });
    });

    $(".topPart, .midPart, .botPart")
      .delay(555)
      .fadeOut(10)
      .animate({ height: "0", top: "0" });

    $(".wrapper .welcome")
      .delay(777)
      .fadeIn()
      .removeClass("grow")
      .addClass("grow");
  }
}
