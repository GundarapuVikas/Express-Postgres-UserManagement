"use strict";

var express = require("express");
var authenticate = require('./data-access/authenticate');
var sequelize = require('./data-access/database');
var userRoutes = require("./routes/routes");
require('./models/user.model');
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.json());
app.use('/', userRoutes);
app.use(express.urlencoded({
  extended: true
}));
sequelize.sync({
  force: true
}).then(function () {
  console.log("Drop and re Synced db.");
})["catch"](function (err) {
  console.log("Failed to sync db: " + err.message);
});
app.listen(PORT, function () {
  authenticate().then(function () {
    return console.log("Server is running on port ".concat(PORT, "."));
  })["catch"](function (err) {
    return console.log(err.message);
  });
});