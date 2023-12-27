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
exports.addPtReview = function (ptId, newPtReview) {
    var body = newPtReview.body, username = newPtReview.username;
    if (typeof newPtReview === "object" && body && username) {
        return db.query("INSERT INTO ptsreview (body, pt_id, username) VALUES ($1,$2,$3) RETURNING *;", [body, ptId, username])
            .then(function (_a) {
            var rows = _a.rows;
            return rows[0];
        })
            .catch(function (err) {
            return err;
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
