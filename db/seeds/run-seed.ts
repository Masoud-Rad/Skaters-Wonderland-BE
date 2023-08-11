const devData = require('../data/development-data/index');
const seed = require('./seed');
const db = require('../connection');

const runSeed = () => {
  return seed(devData.landData, devData.commentData, devData.userData).then(() => db.end());
};

runSeed();