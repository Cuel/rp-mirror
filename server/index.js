const path = require("path");
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 4000;

app.use(express.static("../build"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const YR_URL =
  "https://www.yr.no/sted/Sverige/Stockholm/Kungsholmen/varsel.xml";
app.get("/api/weather", async (req, res) => {
  const response = await fetch(YR_URL);
  const data = await response.text();
  res.send(data);
  res.end();
});

app.get("*", (req, res) => {
  res.sendfile(path.join(__dirname, "..", "build", "index.html"));
});
