const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: { type: String, unique: true },
  },
  {
    collection: "test",
  }
);
mongoose.model("test", UserDetailsSchema);
