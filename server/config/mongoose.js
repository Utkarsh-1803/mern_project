const mongoose = require("mongoose"); //requiring mongoose
mongoose.connect(
  process.env.MONGODB_URL ||
    "mongodb://localhost/dignitech-assignment-own-server"
); //connecting to mongodb
const db = mongoose.connection; //acquiring the connection

db.on("error", console.error.bind(console, "Error in connecting to MongoDB!")); //if error occured
db.once("open", function () {
  //if connected successfully
  console.log("Sucessfully connected to MongoDB!");
});

module.exports = db;
