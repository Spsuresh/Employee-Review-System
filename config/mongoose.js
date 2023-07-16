const mongoose = require("mongoose");
const DB = "mongodb+srv://spsuri777:Spsuresh97@cluster0.k5f74b7.mongodb.net/";

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
