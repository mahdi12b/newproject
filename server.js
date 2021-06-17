console.clear();
//require
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB.js");
// instance app
const app = express();

//connection with the database
connectDB();
// middleware global route
//json type
app.use(express.json());
// router
app.use("/uploads", express.static("uploads"));

app.use("/api/user", require("./routes/student")); /////////////
app.use("/api/user", require("./routes/professor")); //////////
app.use("/api/video", require("./routes/video")); //////////
app.use("/api/subscribe", require("./routes/subscribe")); //////////
app.use("/api/comment", require("./routes/comment"));
//create server

const PORT = process.env.PORT;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running")
);
