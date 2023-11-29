const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
  },
  {
    collection: "test",
  }
);
mongoose.model("test", UserDetailsSchema);
