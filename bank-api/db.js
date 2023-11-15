const mongoose = require("mongoose");

function createDbConn(dbName) {
  return mongoose.connect("mongodb://db:27017/" + dbName);
}

module.exports = { createDbConn };
