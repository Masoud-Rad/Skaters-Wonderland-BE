var devData = require('../data/development-data/index');
var seed = require('./seed');
var db = require('../connection');
var runSeed = function () {
    return seed(devData.salesData, devData.ptsreviewData, devData.personaltrainerData, devData.businessesreviewData, devData.businessesData, devData.landData, devData.commentData, devData.userData).then(function () { return db.end(); });
};
runSeed();
