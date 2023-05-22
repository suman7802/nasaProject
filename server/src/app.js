const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const {planetsRouter} = require("./routes/planets/planets.router");
const {launchesRouter} = require("./routes/lunches/launches.router");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// app.use(morgan("combined"));
app.use(express.json());
app.use(planetsRouter);
app.use("/launches", launchesRouter);
app.use(express.static(path.join(__dirname, "..", "..", "client", "build")));
app.use("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});
module.exports = {app};
