var db = require('../db/connection');
exports.selectLands = function (city) {
    if (!city) {
        return db.query("SELECT * FROM lands;")
            .then(function (response) {
            return response.rows;
        });
    }
    else {
        return db.query("SELECT * FROM lands WHERE city=$1;", [city])
            .then(function (response) {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found!' });
            }
            else {
                return response.rows;
            }
        });
    }
};
exports.selectSingleLand = function (landId) {
    return db.query("SELECT * FROM lands WHERE land_id=$1;", [landId])
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        return rows[0];
    });
};
