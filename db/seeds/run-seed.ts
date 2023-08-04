const devData = require('../data/development-data/index.ts');
const seed1 = require('./seed.ts');
const db1 = require('../connection.ts');

const runSeed = () => {
  return seed1(devData).then(() => db1.end());
};

runSeed();