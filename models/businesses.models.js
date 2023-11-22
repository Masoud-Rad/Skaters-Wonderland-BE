var db = require('../db/connection');
exports.selectBusinesses = function () {
    return db.query("SELECT * FROM businesses;")
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
