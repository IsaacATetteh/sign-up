const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://Isaac:123@cluster0.prn0cfs.mongodb.net/";
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fnofsoifnsof90943903fefewffwfwf";
const ws = require("ws");

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "User does not exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }

  return res.json({ status: "error", error: "Password incorrect" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send({ error: "User already exists" });
    }
    const newUser = await User.create({
      name,
      password: encryptedPassword,
      email,
    });
    const token = jwt.sign({ email: newUser.email }, JWT_SECRET);
    res.send({ status: "ok", token });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.get("/userList", async (req, res) => {
  try {
    const users = await User.find({}, "name"); // Fetch only the name field
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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

const server = app.listen(4040);

const wss = new ws.WebSocketServer({ server });
wss.on("connection", (connection, req) => {
  const cookies = req.headers.cookie;
  console.log(req.headers);
  console.log("Connected to websocket");

  connection.send(JSON.stringify(req.headers));
});
