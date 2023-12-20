"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectPersonalTrainersReviews = (pt_id) => {
    return db.query(`SELECT * FROM ptsreview WHERE pt_id=$1`, [pt_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
//# sourceMappingURL=personalTrainersReviews.models.js.map