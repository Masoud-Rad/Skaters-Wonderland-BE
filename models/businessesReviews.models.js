"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectBusinessesReviews = (businessId) => {
    return db.query(`SELECT * FROM businessesreview WHERE business_id=$1;`, [businessId])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
//# sourceMappingURL=businessesReviews.models.js.map