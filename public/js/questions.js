$(document).ready(function (event) {
  $("#start").on("click", function (e) {
    e.preventDefault();

    $.ajax({ method: "GET", url: "/questions/start", dataType: "json" })
      .done((data) => {
        console.log(data);
      })
      .fail((error) => {
        console.log(error);
      });
  });
});
