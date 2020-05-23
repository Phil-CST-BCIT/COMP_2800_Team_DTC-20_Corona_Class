$(document).ready(function () {
  $(".sub-btn").on("click", function (event) {
    event.preventDefault();
    const email = $.trim($("#email").val());
    const password = $.trim($("#password").val());
    // console.log(email);
    // console.log(password);

    if (email.length === 0 || password.length === 0) {
      $("#auth-details > div").text("email and password cannot be empty");
    } else if (!isValidEmail(email)) {
      $("#auth-details > div").text("Invalid email format");
    } else {
      $.ajax({
        method: "POST",
        url: "/user/login",
        dataType: "json",
        data: { userEmail: email, userPassword: password },
      })
        .done(function (data) {
          // console.log(data);
          if (!data.isUser && !data.isPWD) {
            $("#auth-details > div").text("user does not exist");
          } else if (!data.isPWD && data.isUser) {
            $("#auth-details > div").text("incorrect password");
          } else if (data.isUser && data.isPWD) {
            window.location.replace("/home");
          }
        })
        .fail(function (error) {
          console.log(error);
        });
    }
  });
});

function isValidEmail(email) {
  let regexpr = /^([a-zA-Z0-9_])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{1,6})+$/;
  return regexpr.test(email);
}
