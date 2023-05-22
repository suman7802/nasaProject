const {createServer} = require("http");
const {app} = require("./app");
const {loadPlanetsData} = require("./models/planets.model");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;
const server = createServer(app);

// const MONGO_URL = "mongodb://localhost:27017/";
const MONGO_URL =
  "mongodb+srv://mansu7802:rgsvsl@cluster0.fre0zb2.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL)
  .then(console.log(`mongodb is connected`))
  .catch((error) => console.log(error));

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
  });
}
startServer();
