const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://Isaac:123@cluster0.prn0cfs.mongodb.net/";
const cors = require("cors");
const bcrypt = require("bcryptjs");
app.use(cors());
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.listen(5000, () => {
  console.log("Server stared");
});

require("./userDetails");
const User = mongoose.model("test");

app.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User already exists" });
    }
    await User.create({
      name,
      password: encryptedPassword,
      email,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/post", async (req, res) => {
  console.log(req.body);
  const { data } = req.body;
  try {
    if (data === "bob") {
      res.send({ status: "bob" });
    } else {
      res.send({ status: "user not found" });
    }
  } catch (error) {
    res.send({ status: "error" });
  }
});
