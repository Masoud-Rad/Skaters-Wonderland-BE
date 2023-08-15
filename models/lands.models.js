"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectLands = () => {
    return db.query(`SELECT * FROM lands;`)
        .then((response) => {
        return response.rows;
    });
};
exports.selectSingleLand = (landId) => {
    return db.query(`SELECT * FROM lands WHERE land_id=$1;`, [landId])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        return rows[0];
    });
};
//# sourceMappingURL=lands.models.js.map