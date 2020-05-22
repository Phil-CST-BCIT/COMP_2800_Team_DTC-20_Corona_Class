$(document).ready(function (event) {
  $(".sub-btn").on("click", function (e) {
    e.preventDefault();
    const email = $.trim($("#email").val());
    const username = $.trim($("#username").val());
    const password = $.trim($("#password").val());

    // console.log(email);
    // console.log(username);
    // console.log(password);

    if (email.length === 0 || password.length === 0 || username.length === 0) {
      $("#auth-details > div").text("email, user name, or password is empty");
    } else if (!isValidEmail(email)) {
      $("#auth-details > div").text(`invalid email format ${email}`);
    } else if (password.length < 6) {
      $("#auth-details > div").text(`the password is too short`);
    } else {
      $.ajax({
        method: "POST",
        url: "/user/signup",
        dataType: "json",
        data: { userEmail: email, userName: username, userPassword: password },
      })
        .done(function (data) {
          if (data.isExist) {
            $("#auth-details > div").text(`${email} alreay in use`);
          } else {
            window.location.replace("/user/login");
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
