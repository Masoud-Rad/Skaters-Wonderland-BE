const devData = require('../data/development-data/index');
const seed = require('./seed');
const db = require('../connection');

const runSeed = () => {
  return seed(devData.salesData, devData.ptsreviewData, devData.personaltrainerData, devData.businessesreviewData, devData.businessesData, devData.landData, devData.commentData, devData.userData).then(() => db.end());
};

runSeed();