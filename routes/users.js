//requiring mongoose and storing in a variable
const mongoose = require("mongoose")

//connecting the server to the database "muDb"
mongoose.connect("mongodb://127.0.0.1:27017/myDb");

//defining the schema for user
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
})

//exporting the schema
module.exports = mongoose.model("user", userSchema);
