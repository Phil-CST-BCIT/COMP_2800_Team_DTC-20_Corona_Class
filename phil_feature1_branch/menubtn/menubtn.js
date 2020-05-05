// in the name of god

var bOpen = true;

$(function () {
  $(".page").prepend(
    '<div class="top"/>' + '<div class="mid"/>' + '<div class="bot"/>'
  );
  $("#btn1,.hamburger").click(function () {
    effect(bOpen, [3000, 3000, 3000]);
    bOpen = !bOpen;
  });

  $("ul>li").on("click", function () {
    $(this).animate({ marginLeft: "77%" });
    $("ul>li")
      .animate({ marginLeft: "0" }, 111)
      .delay(111)
      .animate({ marginLeft: "37px" });
  });
});

function effect(doOpen, barsTiming) {
  $(".hamburger").toggleClass("active");
  // open effect
  if (doOpen) {
    $(".page .content").fadeOut();

    $(".top")
      .fadeIn()
      .animate({ height: "50.5%", top: "-25%" }, barsTiming[0], "easeOutBack");
    $(".mid")
      .fadeIn()
      .animate({ height: "50.5%", top: "25%" }, barsTiming[1], "easeOutBack");
    $(".bot")
      .fadeIn()
      .animate({ height: "50%", top: "75%" }, barsTiming[2], "easeOutBack");

    var t = 0;
    $("ul").removeAttr("style").delay(333).animate({ top: "37%" });
    $("ul>li")
      .removeAttr("style")
      .each(function () {
        $(this)
          .delay(100 + (t += Math.random() * (t / 3 + 111)))
          .fadeIn()
          .animate({ margin: "10%", padding: "5px" });
      });
  } else {
    // close effect
    var t = 0;
    $("ul").animate({ top: "23%" });
    $("ul>li").each(function () {
      $(this)
        .delay((t += Math.random() * 111))
        .fadeOut()
        .animate({ margin: "1%" });
    });
    $(".top,.mid,.bot")
      .delay(555)
      .fadeOut(10)
      .animate({ height: "0", top: "0" });
    // $(".top,.mid,.bot,ul,ul>li").removeAttr('style');
    $(".page .content")
      .delay(777)
      .fadeIn()
      .removeClass("grow")
      .addClass("grow");
  }
}
