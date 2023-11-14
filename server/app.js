const express = require("express");
const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server stared");
});

app.post("/post", async (req, res) => {
  console.log(req.body);
});
