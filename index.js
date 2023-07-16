const express = require("express");
const port = 8000;
const app = express();
const expressLayout = require("express-ejs-layouts");
const db = require("./config/mongoose");

const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const flashMiddleWare = require("./config/flashMiddleware");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(expressLayout);

app.use(
  session({
    name: "ERS",
    secret: "Employee Review System",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:
          "mongodb+srv://spsuri777:Spsuresh97@cluster0.k5f74b7.mongodb.net/",
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "connect-mongo setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMiddleWare.setFlash);

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the app.");
    return;
  }
  console.log("Server is up and running at port ", +port);
});
