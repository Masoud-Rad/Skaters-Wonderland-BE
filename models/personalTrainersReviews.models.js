var db = require('../db/connection');
exports.selectPersonalTrainersReviews = function (pt_id) {
    return db.query("SELECT * FROM ptsreview WHERE pt_id=$1", [pt_id])
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
