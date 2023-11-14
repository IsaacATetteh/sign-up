const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://Isaac:123@cluster0.prn0cfs.mongodb.net/";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.listen(3000, () => {
  console.log("Server stared");
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
