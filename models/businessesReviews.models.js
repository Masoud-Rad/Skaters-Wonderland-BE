var db = require('../db/connection');
exports.selectBusinessesReviews = function (businessId) {
    return db.query("SELECT * FROM businessesreview WHERE business_id=$1;", [businessId])
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
exports.addBusinessReview = function (businessId, newBusinessReview) {
    if (typeof newBusinessReview === "object" && newBusinessReview.hasOwnProperty("body") && newBusinessReview.hasOwnProperty("username")) {
        var username = newBusinessReview.username;
        var body = newBusinessReview.body;
        return db.query("INSERT INTO businessesreview (body, business_id, username) VALUES ($1,$2,$3) RETURNING *;", [body, businessId, username])
            .then(function (_a) {
            var rows = _a.rows;
            return rows[0];
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
