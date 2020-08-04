const http = require("http");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(cors());

function readJsonFile() {
  const filename = path.join(__dirname, "samples.json");
  const data = fs.readFileSync(filename);
  return JSON.parse(data.toString());
}

app.get("/data", (req, res) => {
  const data = readJsonFile();
  res.status(200).json({
    status: "success",
    data,
  });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("server started...");
});
