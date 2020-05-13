let score = 0;
let id = 0;
let interval;
let startGame = () => {
  interval = setInterval(setImage, 3000);
};
$(document).ready(function () {
  setTimeout(startGame, 10000);
});
function setImage() {
  let img = $(
    `<img src='/css/images/virus.png' id='${++id}' class='virus' style='left:${randomLeft()}; top:${randomTop()}; position:absolute; width:75px;' />`
  );

  img
    .appendTo("body")
    .slideUp(0)
    .fadeIn(1000)
    .on("click", function () {
      score++;
      console.log($(this).attr("id"), score);
      $(this).remove();
      if (score > 4) {
        $(".virus").remove();
        clearInterval(interval);
      }
    });
}

function randomTop() {
  let height = $(window).height();
  let randomHeight = Math.floor(Math.random() * (height - 75)) + "px";
  return randomHeight;
}

function randomLeft() {
  let width = $(window).width();
  let randomLeft = Math.floor(Math.random() * (width - 75)) + "px";
  return randomLeft;
}
