"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectPersonalTrainers = () => {
    return db.query(`SELECT * FROM personaltrainers`)
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
exports.selectSinglePersonalTrainer = (pt_id) => {
    return db.query(`SELECT * FROM personaltrainers WHERE pt_id=$1`, [pt_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
};
//# sourceMappingURL=personalTrainers.models.js.map