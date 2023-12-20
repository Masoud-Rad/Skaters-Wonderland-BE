"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectsalesItems = () => {
    return db.query(`SELECT * FROM sales`)
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
exports.selectSingleSalesItem = ((item_id) => {
    return db.query(`SELECT * FROM sales WHERE item_id=$1`, [item_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
});
//# sourceMappingURL=sales.models.js.map