const parse = require("csv-parse");
const path = require("path");
const fs = require("fs");
// const habitablePlanet = [];
const planets = require("./planets.mongo");

const filter = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse.parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (filter(data)) {
          // habitablePlanet.push(data);
          savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", async () => {
        const planets = (await getAllPlanets()).length;
        console.log(`${planets} planets found`);
        resolve();
      });
  });
}

async function savePlanet(planet) {
  // await planets.deleteMany();
  try {
    await planets.updateOne(
      {
        kepler_name: planet.kepler_name,
      },
      {
        kepler_name: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`could not save planet ${error}`);
  }
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
