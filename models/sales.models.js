var db = require('../db/connection');
exports.selectsalesItems = function () {
    return db.query("SELECT * FROM sales")
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
exports.selectSingleSalesItem = (function (item_id) {
    return db.query("SELECT * FROM sales WHERE item_id=$1", [item_id])
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
});
