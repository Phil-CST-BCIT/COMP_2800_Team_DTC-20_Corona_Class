const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const app = express();
const saltRounds = 8;
const port = process.env.PORT || 8080;
const DEFAULT_TIME = 2000;
const MAX_LOGIN_TIME = 67000;
const MIN_AGE_ALLOW = 7000;
app.use(
  session({
    store: new fileStore({
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    name: "my cookie",
    secret: "class",
    cookie: {
      maxAge: DEFAULT_TIME,
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
  res.redirect("/index");
});

app.get("/index", (req, res) => {
  const qry = `SELECT stats.total_cases, stats.total_active_cases FROM stats ORDER BY id DESC LIMIT 1 `;
  promisePool
    .execute(qry)
    .then(function ([data, metadata]) {
      // console.log(data[0]);
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
  res.render("pages/aboutUs");
});

app.get("/user/login", (req, res) => {
  let notice = "";
  res.render("pages/user/login", { msg: notice });
});

app.get("/user/signup", (req, res) => {
  let notice = "";
  res.render("pages/user/create", { msg: notice });
});

app.get("/home", (req, res) => {
  if (req.session.cookie.maxAge <= MIN_AGE_ALLOW) {
    res.redirect("/user/login");
  } else {
    let someone = req.session.username;
    res.render("pages/home", { namePlaceHolder: someone });
  }
});

app.get("/update", (req, res) => {
  if (req.session.cookie.maxAge <= MIN_AGE_ALLOW) {
    res.redirect("/user/login");
  } else {
    res.render("pages/user");
  }
});

app.get("/user", (req, res) => {
  if (req.session.cookie.maxAge < MIN_AGE_ALLOW) {
    res.redirect("/user/login");
  } else {
    res.render("pages/user");
  }
});

app.get("/quiz", (req, res) => {
  if (req.session.cookie.maxAge <= MIN_AGE_ALLOW) {
    res.redirect("/user/login");
  } else {
    res.render("pages/quiz");
  }
});
app.get("/quizStart", (req, res) => {
  if (req.session.cookie.maxAge <= MIN_AGE_ALLOW) {
    res.redirect("/user/login");
  } else {
    res.render("pages/quizStart");
  }
});

app.get("/slideList", (req, res) => {
  res.render("pages/slideList");
});

app.get("/slides/slide1", (req, res) => {
  let firstSlide = {
    id: 1,
    title: "Wash your Hands Often",
    content:
      "Wash your hands before and after preparing food, tending to someone sick, or treating a wound. Wash before touching your face or eating food, and wash after using the toilet or covering a sneeze, cough, or blowing your nose.",
    page_number: 1,
    img_url: "/css/images/safety_slide/safety1.png",
    is_complete: false,
  };
  res.render("pages/slides/slide1", firstSlide);
});

app.get("/questions", (req, res) => {
  res.render("pages/questions", { questions: "questions" });
});

app.get("/questions/start", (req, res) => {
  const numberOfQuestions = 5;
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
    } while (id.length < numberOfQuestions);
  }

  async function getQ() {
    for (let j = 0; j < numberOfQuestions; j++) {
      let aQuestion = await promisePool.execute(selClause, [id[j]]);
      myQuestions.push(aQuestion);
    }

    if (myQuestions.length === numberOfQuestions) {
      res.send({ question: myQuestions });
      // res.render('pages/quiz', { data: myQuestions });
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

app.get("/logout", (req, res) => {
  req.session.cookie.maxAge = DEFAULT_TIME;
  res.redirect("/index");
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
  // console.log(req.body.userPassword);
  const pwd = req.body.userPassword;
  const email = req.body.userEmail;
  const qry = `SELECT users.email, users.password, users.user_name FROM users WHERE users.email = ? ORDER BY id DESC LIMIT 1;`;
  const qryData = [email];
  promisePool
    .execute(qry, qryData)
    .then(function ([data, metadata]) {
      // console.log(data[0]);
      if (!data[0]) {
        res.send({ isUser: 0 });
      } else {
        bcrypt.compare(pwd, data[0].password, function (err, result) {
          if (email === data[0].email && result) {
            req.session.username = data[0].user_name;
            req.session.cookie.maxAge = MAX_LOGIN_TIME;
            res.send({ isUser: 1, isPWD: 1 });
          } else if (email === data[0].email && !result) {
            res.send({ isUser: 1, isPWD: 0 });
          } else if (!(email === data[0].email)) {
            res.send({ isUser: 0, isPWD: 0 });
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
  //console.log(req.body);
  const email = req.body.email;
  const oldName = req.body.oldName;
  const newName = req.body.newName;
  const qry = `UPDATE users SET users.user_name = ? WHERE users.user_name = ? AND users.email = ?;`;
  const qryData = [newName, oldName, email];
  promisePool
    .execute(qry, qryData)
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
  const qry = `DELETE FROM users WHERE '${email}' = users.email;`;
  const qryData = [email];

  promisePool
    .execute(qry, qryData)
    .then(([data, meta]) => {
      //console.log(data);
      res.render("pages/user/login", { msg: "Your Account has been deleted" });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/graph/stats", function (req, res) {
  // console.log(req.body.stats);
  res.send({ status: "received" });
  const receivedData = req.body.stats.countrydata[0];
  const country = receivedData.info.title;
  const totalCases = receivedData.total_cases;
  const totalActiveCases = receivedData.total_active_cases;
  const totalRecovered = receivedData.total_recovered;
  const totalDeath = receivedData.total_deaths;
  const totalNewCasesToday = receivedData.total_new_cases_today;
  const totalNewDeathsToday = receivedData.total_new_deaths_today;
  const source = receivedData.info.source;
  const isReady = 1;
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
  const qry = `INSERT INTO stats(country,total_cases,total_active_cases,total_recovered,total_death,total_new_cases_today,total_new_deaths_today,source,is_ready) VALUES(?,?,?,?,?,?,?,?,?);`;
  const qryData = [
    country,
    totalCases,
    totalActiveCases,
    totalRecovered,
    totalDeath,
    totalNewCasesToday,
    totalNewDeathsToday,
    source,
    isReady,
  ];
  promisePool
    .execute(qry, qryData)
    .then(() => {
      res.send({ status: "received" });
    })
    .catch((error) => {
      console.log(error);
    });
});

/******************************************
 * *************** START ******************
 ******************************************/
app.listen(port, console.log(`server is listening on port: ${port}`));
