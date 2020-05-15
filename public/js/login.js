$(document).ready(function () {
  $("#logIn").click(function (event) {
    event.preventDefault();

    $("#logIn").on("click", function () {
      $("#auth-details").text("Log In Your Account");
      $(".sub-btn").text("Log In");
      $("#email").remove();
      $("#signUp").css("background-color", "#393A3C");
      $("#logIn").css("background-color", "#4285f4");
    });
  });

  $("#signUp").click(function (event) {
    event.preventDefault();

    $("#signUp").on("click", function () {
      $("#auth-details").text("Sign Up For Free");
      $(".sub-btn").text("Sign Up");
      if (!$("#email").length) {
        $("#inputDiv > form").prepend(
          `<input type="text" id="email" name="email" placeholder="Email" />`
        );
      }
      $("#logIn").css("background-color", "#393A3C");
      $("#signUp").css("background-color", "#4285f4");
    });
  });
});
