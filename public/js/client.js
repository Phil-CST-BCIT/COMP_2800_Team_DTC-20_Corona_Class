$(document).ready(function (event) {
  const cache = [];
  var isBack = false;

  $.ajax({
    method: "GET",
    url: "/graph/stats",
    dataType: "json",
  })
    .done(function (data) {
      if (data.status === 1) {
        let countryName = data.stats.country;
        let totalConfirmedCases = data.stats.total_cases;
        let activeCases = data.stats.total_active_cases;

        $(".totalCases>h3").append(countryName);
        $(".totalCases>h4").append(totalConfirmedCases);
        $(".activeCases>h4").append(activeCases);
      } else {
        console.log(data.status);
        pullData();
      }
    })
    .fail((error) => {
      console.log(error);
    });

  /**
   * store the data from api to db.
   * @param {*} data
   */
  function storeData(data) {
    cache.push(data);
    isBack = true;
    console.log(cache[0]);

    if (isBack) {
      $.ajax({
        method: "POST",
        url: "/graph/stats",
        dataType: "json",
        data: { stats: cache[0] },
      })
        .done(function (data) {
          console.log(data);
        })
        .fail((error) => {
          console.log(error);
        });
    }
  }

  /**
   * pull data from API.
   */
  function pullData() {
    // console.log("pull data");
    $.ajax({
      type: "Get",
      url: "https://api.thevirustracker.com/free-api?countryTotal=CA",
      dataType: "json",
    })
      .done(function (data) {
        let temp = { countrydata: data.countrydata };
        storeData(temp);
        let countryName = data.countrydata[0].info.title;
        let totalConfirmedCases = data.countrydata[0].total_cases;
        let activeCases = data.countrydata[0].total_active_cases;
        $(".totalCases>h3").append(countryName);
        $(".totalCases>h4").append(totalConfirmedCases);
        $(".activeCases>h4").append(activeCases);
      })
      .fail((error) => {
        console.log(error);
      });
  }

  $.ajax({
    url: "https://api.thevirustracker.com/free-api?countryTimeline=CA",
    dataType: "json",
    cache: true,
    success: function (data) {
      cache.push(data);
      // console.log(data.timelineitems[0]);
      let date = new Date();
      let today = date.getDate();
      let month = date.getMonth();
      var dates = [];
      var cases = [];
      for (let i = month; i < month + 1; i++) {
        for (let j = 0; j < 21; j++) {
          if (j === 9) {
            let tempMonth = month + 1;
            let tempDay = j + 1;
            let newCase =
              data.timelineitems[0][`${tempMonth}/${tempDay}/20`][
                "new_daily_cases"
              ];
            dates.push(`${tempMonth}/0${tempDay}/2020`);
            cases.push(newCase);
            // console.log(newCase);
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

  function generateTableData(myData) {
    const date = new Date();
    const year = 20;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    var tableData = [];
    for (let i = 1; i < day; i++) {
      if (i < 10) {
        let tableObj = {
          date: `${month}/0${i}/${year}`,
          totalCases:
            myData.timelineitems[0][`${month}/0${i}/${year}`]["total_cases"],
          activeCases:
            myData.timelineitems[0][`${month}/0${i}/${year}`][
              "new_daily_cases"
            ],
          totalDeath:
            myData.timelineitems[0][`${month}/0${i}/${year}`]["total_deaths"],
          totalRecoveries:
            myData.timelineitems[0][`${month}/0${i}/${year}`][
              "total_recoveries"
            ],
        };
        tableData.push(tableObj);
      } else {
        let tableObj = {
          date: `${month}/${i + 1}/${year}`,
          totalCases:
            myData.timelineitems[0][`${month}/${i}/${year}`]["total_cases"],
          activeCases:
            myData.timelineitems[0][`${month}/${i}/${year}`]["new_daily_cases"],
          totalDeath:
            myData.timelineitems[0][`${month}/${i}/${year}`]["total_deaths"],
          totalRecoveries:
            myData.timelineitems[0][`${month}/${i}/${year}`][
              "total_recoveries"
            ],
        };
        tableData.push(tableObj);
      }
    }

    return tableData;
  }

  function drawTable(myData) {
    let date = new Date();
    let today = date.getDate();
    let month = date.getMonth();
    // console.log(
    //   "table data = ",
    //   myData.timelineitems[0][`5/01/20`]["new_daily_cases"]
    // );

    var tabledata = generateTableData(myData);

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
});
