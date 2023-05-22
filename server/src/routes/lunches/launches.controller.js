const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model.js");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "invalid input",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "invalid date",
    });
  }
  addNewLaunch(launch);
  res.status(200).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  if (!(await existsLaunchWithId(launchId))) {
    res.status(404).json({
      error: "launch not found",
    });
  } else {
    const aborted = await abortLaunchById(launchId);
    return res.status(200).json(aborted);
  }
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
