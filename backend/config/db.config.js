const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://" + process.env.URL_MONGO_DB + "/allo-crypto");
} catch (err) {
  console.log(err);
}
