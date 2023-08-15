"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectLands = (city, sort_by = "land_id", order_by = "ASC") => {
    if (!city) {
        return db.query(`SELECT * FROM lands ORDER BY ${sort_by} ${order_by};`)
            .then((response) => {
            return response.rows;
        });
    }
    else {
        return db.query(`SELECT * FROM lands WHERE city=$1 ORDER BY ${sort_by} ${order_by};`, [city])
            .then((response) => {
            if (response.rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found!' });
            }
            else {
                return response.rows;
            }
        });
    }
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