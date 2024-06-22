const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/data", (req, res) => {
  const data = fs.readFileSync("problems.json");
  const problems = JSON.parse(data);
  res.json(problems);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
