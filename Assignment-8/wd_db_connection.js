// Code Start here:

// 1. Connect
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/WDdatabase", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "ERROR: connection"));
db.once("open", () => {
  console.log("SUCCESS: Connected to MongoDB");
});

module.exports = mongoose;
