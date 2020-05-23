// Counter
let score = 0;
let id = 0;
// Global variable being used to assign to the setInterval()
let interval;

// Assign the variable inside a function to prevent it's been triggered immediately
let startGame = () => {
  interval = setInterval(setImage, 3000);
};

//Trigger the setInterval() after 10 sec
$(document).ready(function () {
  setTimeout(startGame, 10000);
});

function setImage() {
  let img = $(
    `<img src='/css/images/virus.png' id='${++id}' class='virus' style='left:${randomLeft()}; top:${randomTop()}; position:absolute; width:75px;' />`
  );

  // animation
  img
    .appendTo("body")
    .slideUp(0)
    .fadeIn(1000)

    //Click on the image will remove it
    .on("click", function () {
      score++;
      $(this).remove();

      // Stopping interval and remove all the virus images
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
