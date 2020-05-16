const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();
const saltRounds = 8;
const port = process.env.PORT || 8080;

/**Connection pools help reduce the time spent connecting
 * to the MySQL server by reusing a previous connection,
 * leaving them open instead of closing when you are done with them.
 */
const promisePool = mysql
  .createPool({
    host: "sql3.freemysqlhosting.net",
    user: "sql3340033",
    database: "sql3340033",
    password: "FFfkSNyC7E",
  })
  .promise();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/index", (req, res) => {
  res.render("pages/index");
});

app.get("/graph", (req, res) => {
  res.render("pages/graph");
});

app.get("/aboutUs", (req, res) => {
  res.render("pages/aboutUs");
});

app.get("/login", (req, res) => {
  let notice = "";
  res.render("pages/login", { msg: notice });
});

app.post("/usrInfo", (req, res, next) => {
  const count = Object.keys(req.body).length;

  if (count === 3) {
    console.log(count);
    const user = {
      email: req.body.email.trim(),
      username: req.body.username.trim(),
      password: req.body.password.trim(),
    };

    if (
      user.email !== "" &&
      user.username !== "" &&
      user.password !== "" &&
      user.email !== null &&
      user.username !== null &&
      user.password !== null &&
      user.email !== undefined &&
      user.username !== undefined &&
      user.password !== undefined
    ) {
      promisePool
        .execute(`SELECT * FROM users WHERE users.email = '${user.email}'`)
        .then(function ([myData, metadata]) {
          if (myData.length && myData[0].email === user.email) {
            console.log("exist");
            let notice = `${user.email} registerd by someone else`;
            res.render("pages/login", { msg: notice });
          } else {
            next();
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.redirect("/login");
    }
  } else if (count === 2) {
    console.log(count);

    const regUserName = req.body.username;
    const regUserPassword = req.body.password;
    if (
      regUserName !== null &&
      regUserName !== "" &&
      regUserName !== undefined &&
      regUserPassword !== null &&
      regUserPassword !== "" &&
      regUserPassword !== undefined
    ) {
      console.log(regUserName);
      console.log(regUserPassword);

      promisePool
        .execute(
          `SELECT users.user_name, users.password FROM users WHERE '${regUserName}' = users.user_name LIMIT 1;`
        )
        .then(([data, metadata]) => {
          console.log(data);
          bcrypt.compare(regUserPassword, data[0].password, function (
            err,
            result
          ) {
            if (
              // authentication
              regUserName === data[0].user_name &&
              result
            ) {
              res.render("pages/home", { namePlaceHolder: regUserName });
            } else {
              res.render("pages/error", {
                err: "username or password incorrect",
              });
            }
          });
        })
        .catch(() => {
          res.render("pages/error", {
            err: "username or password incorrect",
          });
        });
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

app.post("/usrInfo", (req, res) => {
  console.log("not exist");
  const user = {
    email: req.body.email.trim(),
    username: req.body.username.trim(),
    password: req.body.password.trim(),
  };
  console.log({
    email: user.email,
    username: user.username,
    password: user.password,
  });

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashed = bcrypt.hashSync(user.password, salt);
  console.log(hashed);
  promisePool
    .execute(
      `INSERT INTO users(email, user_name, password )
        VALUES ('${user.email}', '${user.username}', '${hashed}')`
    )
    .then(() => res.redirect("/success"))
    .catch((error) => console.log(error));
});

app.get("/success", (req, res) => {
  res.render("pages/success");
});

app.get("/home", (req, res) => {
  console.log(req.body);
  let someone = "";
  res.render("pages/home", { namePlaceHolder: someone });
});

app.get("/user", (req, res) => {
  res.render("pages/user");
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

app.get("/update", (req, res) => {
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
    .catch(() => {
      res.render("pages/error", { err: "email is incorrect" });
    });
});

app.get("/error", (req, res) => {
  let myError = "";
  res.render("pages/error", { err: myError });
});

app.listen(port, console.log(`server is running at ${port}`));
