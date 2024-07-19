const express = require("express");
const users = require("./routes/users.js");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api", users);

module.exports = app;
