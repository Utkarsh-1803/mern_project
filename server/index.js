const express = require("express"); //requiring express
const app = express(); //app has the properties of express
const passport = require("passport"); //requiring passport
const jwtPassportStrategy = require("./config/passport_jwt"); //passport jwt config file
const db = require("./config/mongoose"); //mongoose connection
const PORT = process.env.PORT || 8000; //port on which server runs

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded()); //to parse form data
app.use(express.json());
app.use("/", require("./routes/index")); //set up scalable routes folder

//server listens on port
app.listen(PORT, function (err) {
  if (err) {
    console.log("An error occured in running the server!");
  }
  console.log(`Server is up and running on PORT :: ${PORT}`);
});
