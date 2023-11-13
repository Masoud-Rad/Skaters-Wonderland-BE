"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devData = require('../data/development-data/index');
const seed = require('./seed');
const db = require('../connection');
const runSeed = () => {
    return seed(devData.businessesreviewData, devData.businessesData, devData.landData, devData.commentData, devData.userData).then(() => db.end());
};
runSeed();
//# sourceMappingURL=run-seed.js.map