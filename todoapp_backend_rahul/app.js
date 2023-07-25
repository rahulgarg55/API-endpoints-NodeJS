const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // It allows the server to handle requests from different origins.
//importing todo routes
const todoroutes = require("./todo/todo.route");
const app = express(); //Creates an instance of the Express application.
const host = "localhost";
const port = 8001;
app.use(cors()); // allowing requests from different origins.
app.use(express.json()); //to enable parsing of JSON data
mongoose
  .connect("mongodb://127.0.0.1:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("error connecting==>", error));
app.use("/todos", todoroutes);

app.listen(port, () => {
  console.log(`server is now started on http://${host}:${port}`);
});

//REST stands for Representational State Transfer and API stands for an application programming interface. REST is an architectural style and approach to communications often used in web services development.
