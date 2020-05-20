$(document).ready(function () {
  var counter = 0;
  $(".sub-btn").on("click", function (event) {
    event.preventDefault();
    let email = $("#email").val();
    console.log(email);
  });
});
