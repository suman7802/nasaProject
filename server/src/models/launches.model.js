const launchesDataBase = require("./launches.mongo");
const planets = require("./planets.mongo");

async function getFlightNumber() {
  const latestLaunch = await launchesDataBase.findOne().sort("-flightNumber");
  if (latestLaunch) {
    return latestLaunch.flightNumber;
  } else {
    return Number(100);
  }
}

async function saveLaunch(launch) {
  // await launchesDataBase.deleteMany();
  const planet = await planets.findOne({
    kepler_name: launch.target,
  });
  if (planet) {
    await launchesDataBase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } else {
    throw Error("No matching planet found");
  }
}

const launch = {
  launchDate: new Date("December 27, 2023"),
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  target: "Kepler-442 b",
  flightNumber: 100,
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
saveLaunch(launch);

async function addNewLaunch(launch) {
  let flightNumber = await getFlightNumber();
  const newFlight = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ["suman", "backEnd"],
    flightNumber: ++flightNumber,
  });
  saveLaunch(newFlight);
}

async function getAllLaunches(req, res) {
  return await launchesDataBase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function existsLaunchWithId(launchId) {
  const status = await launchesDataBase.findOne({
    flightNumber: launchId,
  });
  if (status) return true;
  else {
    return false;
  }
}

async function abortLaunchById(launchId) {
  const aborted = await launchesDataBase.findOne({
    flightNumber: launchId,
  });
  if (!aborted) {
    throw Error("No matching launch found");
  } else {
    aborted.upcoming = false;
    aborted.success = false;
    await saveLaunch(aborted);
    return aborted;
  }
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
