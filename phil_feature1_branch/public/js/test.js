$.ajax({
  type: "Get",
  url: "https://api.thevirustracker.com/free-api?countryTotal=CA",
  dataType: "json",
  success: function (data) {
    console.log(data);
  },
});
