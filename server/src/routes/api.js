const express = require("express");
const {planetsRouter} = require("./planets/planets.router");
const {launchesRouter} = require("./lunches/launches.router");

const api = express.Router();

api.use(planetsRouter);
api.use("/launches", launchesRouter);

module.exports = {
  api,
};
