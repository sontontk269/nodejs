const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//init db
require("./dbs/init.mongodb");
const { checkOverload } = require('./helpers/check.connect')
// checkOverload()

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome!!",
  });
});
module.exports = app;
