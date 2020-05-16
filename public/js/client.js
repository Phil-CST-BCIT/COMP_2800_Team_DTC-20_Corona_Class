$.ajax({
  type: "Get",
  url: "https://api.thevirustracker.com/free-api?countryTotal=CA",
  dataType: "json",
  success: function (data) {
    let countryName = data.countrydata[0].info.title;
    let totalConfirmedCases = data.countrydata[0].total_cases;
    let activeCases = data.countrydata[0].total_active_cases;

    $(".totalCases>h3").append(countryName);
    $(".totalCases>h4").append(totalConfirmedCases);
    $(".activeCases>h4").append(activeCases);
  },
});

$.ajax({
  url: "https://api.thevirustracker.com/free-api?countryTimeline=CA",
  dataType: "json",
  success: function (data) {
    console.log(data.timelineitems[0]);
    let date = new Date();
    let today = date.getDate();
    let month = date.getMonth();
    var dates = [];
    var cases = [];
    for (let i = month; i < month + 1; i++) {
      for (let j = 0; j < 15; j++) {
        if (j === 9) {
          let tempMonth = month + 1;
          let tempDay = j + 1;
          let newCase =
            data.timelineitems[0][`${tempMonth}/${tempDay}/20`][
              "new_daily_cases"
            ];
          dates.push(`${tempMonth}/0${tempDay}/2020`);
          cases.push(newCase);
          console.log(newCase);
        } else if (j < 10) {
          let tempMonth = month + 1;
          let tempDay = j + 1;
          let newCase =
            data.timelineitems[0][`${tempMonth}/0${tempDay}/20`][
              "new_daily_cases"
            ];
          dates.push(`${tempMonth}/0${tempDay}/2020`);
          cases.push(newCase);
          console.log(newCase);
        } else {
          let tempMonth = month + 1;
          let tempDay = j + 1;
          let newCase =
            data.timelineitems[0][`${tempMonth}/${tempDay}/20`][
              "new_daily_cases"
            ];
          dates.push(`${tempMonth}/${tempDay}/2020`);
          cases.push(newCase);
          console.log(newCase);
        }
      }
    }

    drawLineChart(dates, cases);
    drawTable(data);
  },
});

function drawLineChart(dates, cases) {
  var trace1 = {
    x: dates,
    y: cases,
    type: "scatter",
    mode: "lines",
    line: {
      color: "rgb(128, 0, 128)",
      width: 3,
    },
  };

  var layout = {
    width: 350,
    height: 350,
    xaxis: {
      autotick: false,
      showgrid: true,
      ticks: "outside",
      tick0: dates[0],
      ticklen: dates.length,
      tickwidth: 1,
      tickcolor: "#000",
    },
    yaxis: {
      title: "Daily New Cases",
      autotick: false,
      showgrid: true,
      ticks: "outside",
      tick0: cases[0],
      dtick: 408,
      ticklen: cases.length,
      tickwidth: 1,
      tickcolor: "#000",
    },
  };

  var data = [trace1];

  Plotly.newPlot("lineChart", data, layout);
}

function drawTable(myData) {
  let date = new Date();
  let today = date.getDate();
  let month = date.getMonth();
  console.log(
    "table data = ",
    myData.timelineitems[0][`5/01/20`]["new_daily_cases"]
  );

  var tabledata = [
    {
      date: "5/01/20",
      totalCases: myData.timelineitems[0][`5/01/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/01/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/01/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/01/20`]["total_recoveries"],
    },
    {
      date: "5/02/20",
      totalCases: myData.timelineitems[0][`5/02/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/02/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/02/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/02/20`]["total_recoveries"],
    },
    {
      date: "5/03/20",
      totalCases: myData.timelineitems[0][`5/03/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/03/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/03/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/03/20`]["total_recoveries"],
    },
    {
      date: "5/04/20",
      totalCases: myData.timelineitems[0][`5/04/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/04/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/04/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/04/20`]["total_recoveries"],
    },
    {
      date: "5/05/20",
      totalCases: myData.timelineitems[0][`5/05/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/05/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/05/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/05/20`]["total_recoveries"],
    },
    {
      date: "5/06/20",
      totalCases: myData.timelineitems[0][`5/06/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/06/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/06/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/06/20`]["total_recoveries"],
    },
    {
      date: "5/07/20",
      totalCases: myData.timelineitems[0][`5/07/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/07/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/07/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/07/20`]["total_recoveries"],
    },
    {
      date: "5/08/20",
      totalCases: myData.timelineitems[0][`5/08/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/08/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/08/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/08/20`]["total_recoveries"],
    },
    {
      date: "5/09/20",
      totalCases: myData.timelineitems[0][`5/09/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/09/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/09/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/09/20`]["total_recoveries"],
    },
    {
      date: "5/10/20",
      totalCases: myData.timelineitems[0][`5/10/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/10/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/10/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/10/20`]["total_recoveries"],
    },
    {
      date: "5/11/20",
      totalCases: myData.timelineitems[0][`5/11/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/11/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/11/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/11/20`]["total_recoveries"],
    },
    {
      date: "5/12/20",
      totalCases: myData.timelineitems[0][`5/12/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/12/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/12/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/12/20`]["total_recoveries"],
    },
    {
      date: "5/13/20",
      totalCases: myData.timelineitems[0][`5/13/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/13/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/13/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/13/20`]["total_recoveries"],
    },
    {
      date: "5/14/20",
      totalCases: myData.timelineitems[0][`5/14/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/14/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/14/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/14/20`]["total_recoveries"],
    },
    {
      date: "5/15/20",
      totalCases: myData.timelineitems[0][`5/15/20`]["total_cases"],
      activeCases: myData.timelineitems[0][`5/15/20`]["new_daily_cases"],
      totalDeath: myData.timelineitems[0][`5/15/20`]["total_deaths"],
      totalRecoveries: myData.timelineitems[0][`5/15/20`]["total_recoveries"],
    },
  ];

  // for (let i = month; i < month + 1; i++) {
  //   for (let j = 0; j < today; j++) {
  //     if (j < 10) {
  //       let tempMonth = month + 1;
  //       let tempDay = j + 1;
  //       let newCase =
  //         data.timelineitems[0][`${tempMonth}/0${tempDay}/20`][
  //           "new_daily_cases"
  //         ];
  //       dates.push(`${tempMonth}/0${tempDay}/2020`);
  //       cases.push(newCase);
  //       console.log(newCase);
  //     } else {
  //       let tempMonth = month + 1;
  //       let tempDay = j + 1;
  //       let newCase =
  //         data.timelineitems[0][`${tempMonth}/0${tempDay}/20`][
  //           "new_daily_cases"
  //         ];
  //       dates.push(`${tempMonth}/${tempDay}/2020`);
  //       cases.push(newCase);
  //       console.log(newCase);
  //     }

  var table = new Tabulator("#table", {
    height: 205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: tabledata, //assign data to table
    layout: "fitData", //fit columns to width of table (optional)
    columns: [
      //Define Table Columns
      { title: "Date", field: "date" },
      {
        title: "Total Cases",
        field: "totalCases",
        hozAlign: "left",
      },
      { title: "Active Cases", field: "activeCases" },
      {
        title: "Death",
        field: "totalDeath",
        hozAlign: "left",
      },
      {
        title: "Recoveries",
        field: "totalRecoveries",
        hozAlign: "left",
      },
    ],
  });
}

$();
