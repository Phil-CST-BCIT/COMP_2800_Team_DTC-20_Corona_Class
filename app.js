const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const app = express();
const saltRounds = 8;
const port = process.env.PORT || 8080;
const MAX_LOGIN_TIME = 5000;

app.use(
  session({
    store: new fileStore({
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    name: "my cookie",
    secret: "class",
    cookie: {
      maxAge: MAX_LOGIN_TIME,
    },
  })
);

/**
 * a middleware to handle a request body from a client.
 * @param express.urlencoded function
 * @param Object sets true allows:
 * 1> nested json objects,
 * 2> not filter out ?.
 */
app.use(express.urlencoded({ extended: true }));

/**
 * uses middleware to res static contents and send them back.
 */
app.use(express.static("public"));

app.set("view engine", "ejs");

/**
 * a promise connection pool
 */
const promisePool = mysql
  .createPool({
    host: "sql3.freemysqlhosting.net",
    user: "sql3342447",
    database: "sql3342447",
    password: "Y2fkhaReIp",
  })
  .promise();

/**********************************************************
 *********************** GET REQUESTS *********************
 **********************************************************/
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/index", (req, res) => {
  const qry = `SELECT stats.total_cases, stats.total_active_cases FROM stats ORDER BY id DESC LIMIT 1 `;
  promisePool
    .execute(qry)
    .then(function ([data, metadata]) {
      console.log(data[0]);
      res.render("pages/index", {
        totalCases: data[0].total_cases,
        activeCases: data[0].total_active_cases,
      });
    })
    .catch(() => {
      res.render("pages/index", { totalCases: 81324, activeCases: 33457 });
    });
});

app.get("/graph", (req, res) => {
  res.render("pages/graph");
});

app.get("/aboutUs", (req, res) => {
  if (getStatus(req.session)) {
    res.render("pages/aboutUs");
  } else {
    res.redirect("/index");
  }
});

app.get("/login", (req, res) => {
  let notice = "";
  res.render("pages/login", { msg: notice });
});

app.get("/user/login", (req, res) => {
  let notice = "";
  res.render("pages/user/login", { msg: notice });
});

app.get("/user/signup", (req, res) => {
  let notice = "";
  res.render("pages/user/create", { msg: notice });
});

app.get("/success", (req, res) => {
  res.render("pages/success");
});

app.get("/home", (req, res) => {
  let someone = req.session.username;
  res.render("pages/home", { namePlaceHolder: someone });
});

app.get("/error", (req, res) => {
  let myError = "";
  res.render("pages/error", { err: myError });
});

app.get("/update", (req, res) => {
  res.render("pages/user");
});

app.get("/user", (req, res) => {
  if (req.session.cookie.maxAge < 7000) {
    res.redirect("/user/login");
  } else {
    res.render("pages/user");
  }
});

app.get("/questions", (req, res) => {
  res.render("pages/questions", { questions: "qeustions" });
});

app.get("/questions/start", (req, res) => {
  const numberOfQuesions = 5;
  const randomFactor = 10;
  let id = [];
  let myQuestions = [];
  let num = Math.floor(Math.random() * randomFactor) + 1;
  let selClause = `SELECT * FROM questions WHERE id = ? LIMIT 1;`;

  if (!id) {
    id.push(num);
  } else {
    do {
      num = Math.floor(Math.random() * randomFactor) + 1;
      if (!id.includes(num)) {
        id.push(num);
      }
    } while (id.length < numberOfQuesions);
  }

  async function getQ() {
    for (let j = 0; j < numberOfQuesions; j++) {
      let aQuestion = await promisePool.execute(selClause, [id[j]]);
      myQuestions.push(aQuestion);
    }

    if (myQuestions.length === numberOfQuesions) {
      res.send({ question: myQuestions });
    }
  }

  getQ();
});

app.get("/ref", (req, res) => {
  res.render("pages/ref");
});

app.get("/graph/stats", function (req, res) {
  const qry = `SELECT * FROM stats ORDER BY id DESC LIMIT 1;`;
  const myDate = new Date();
  const today =
    "" +
    myDate.getFullYear() +
    "-" +
    (myDate.getMonth() + 1) +
    "-" +
    myDate.getDate();
  promisePool
    .execute(qry)
    .then(function ([data, metadata]) {
      if (!data[0]) {
        res.json({ status: 0 });
      } else {
        const createdDate = new Date(data[0].created);
        const aDay =
          "" +
          createdDate.getFullYear() +
          "-" +
          (createdDate.getMonth() + 1) +
          "-" +
          createdDate.getDate(); // the db uses Toronto time
        // console.log(aDay);
        // console.log(today);
        if (aDay === today) {
          res.json({ status: 1, stats: data[0] });
        } else {
          res.json({ status: 0 });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

/**********************************************************
 *********************** POST REQUESTS ********************
 **********************************************************/
/****************************
 * RE-WRITE LOGIN/CREATE USER
 *
 * STRUCTURE-- VIEWS
 *              |_PAGES
 *                  |__USER
 *                        |__LOGIN
 *                        |__CREATE
 *                  |__OTHERS....
 **************************/

app.post("/user/login", function (req, res, next) {
  console.log(req.body.userPassword);
  const pwd = req.body.userPassword;
  const email = req.body.userEmail;
  const qry = `SELECT users.email, users.password, users.user_name FROM users WHERE users.email = ? ORDER BY id DESC LIMIT 1;`;
  const qryData = [email];
  promisePool
    .execute(qry, qryData)
    .then(function ([data, metadata]) {
      console.log(data[0].password);
      if (data.length === 0) {
        res.send({ isUser: 0 });
      } else {
        bcrypt.compare(pwd, data[0].password, function (err, result) {
          if (email === data[0].email && result) {
            req.session.username = data[0].user_name;
            req.session.cookie.maxAge = 25000;
            res.send({ isUser: 1, isPWD: 1 });
          } else {
            res.send({ isPWD: 0 });
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

/*********************************
 ********** SIGN UP **************
 *********************************/

app.post("/user/signup", function (req, res) {
  const email = req.body.userEmail;
  const name = req.body.userName;
  const pwd = req.body.userPassword;
  //sync functions generating salt and hash value.
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashed = bcrypt.hashSync(pwd, salt);

  const selQry = `SELECT users.email FROM users WHERE users.email = ? ORDER BY id DESC LIMIT 1;`;
  const selQryData = [email];
  const insertQry = `INSERT INTO users(email, user_name, password) VALUES (?, ?, ?)`;
  const insertQryData = [email, name, hashed];
  async function checkExistence() {
    const data = await promisePool.execute(selQry, selQryData);
    if (data[0][0] && data[0][0].email === email) {
      res.send({ isExist: 1 });
    } else {
      promisePool
        .execute(insertQry, insertQryData)
        .then(() => {
          res.send({ isExist: 0 });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  checkExistence();
});

app.post("/update", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const oldName = req.body.oldName;
  const newName = req.body.newName;

  promisePool
    .execute(
      `UPDATE users SET users.user_name = '${newName}' WHERE users.user_name = '${oldName}' AND users.email = '${email}'`
    )
    .then(([data, meta]) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  res.render("pages/user");
});

app.post("/delete", (req, res) => {
  const email = req.body.email;

  promisePool
    .execute(`DELETE FROM users WHERE '${email}' = users.email;`)
    .then(([data, meta]) => {
      console.log(data);
      res.render("pages/login", { msg: "Your Account has been deleted" });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/graph/stats", function (req, res) {
  console.log(req.body.stats);
  res.send({ status: "received" });
  // const receivedData = req.body.stats.countrydata[0];
  // const country = receivedData.info.title;
  // const totalCases = receivedData.total_cases;
  // const totalActiveCases = receivedData.total_active_cases;
  // const totalRecovered = receivedData.total_recovered;
  // const totalDeath = receivedData.total_deaths;
  // const totalNewCasesToday = receivedData.total_new_cases_today;
  // const totalNewDeathsToday = receivedData.total_new_deaths_today;
  // const source = receivedData.info.source;
  // const isReady = 1;
  // console.log(
  //   country,
  //   totalCases,
  //   totalActiveCases,
  //   totalRecovered,
  //   totalDeath,
  //   totalNewCasesToday,
  //   totalNewDeathsToday,
  //   source
  // );
  // const qry = `INSERT INTO stats(country,total_cases,total_active_cases,total_recovered,total_death,total_new_cases_today,total_new_deaths_today,source,is_ready) VALUES(?,?,?,?,?,?,?,?,?);`;
  // const qryData = [
  //   country,
  //   totalCases,
  //   totalActiveCases,
  //   totalRecovered,
  //   totalDeath,
  //   totalNewCasesToday,
  //   totalNewDeathsToday,
  //   source,
  //   isReady,
  // ];
  // promisePool
  //   .execute(qry, qryData)
  //   .then(() => {
  //     res.send({ status: "received" });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

/******************************************
 * *************** START ******************
 ******************************************/
app.listen(port, console.log(`server is listening on port: ${port}`));
