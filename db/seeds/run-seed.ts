const devData = require('../data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
  console.log("in the run-seed");
  return seed(devData.landData, devData.userData).then(() => db.end());
};

runSeed();