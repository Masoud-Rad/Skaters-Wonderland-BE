"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectBusinesses = () => {
    return db.query(`SELECT * FROM businesses;`)
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
exports.selectSingleBusiness = (businessId) => {
    return db.query(`SELECT * FROM businesses WHERE business_id=$1;`, [businessId])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
};
//# sourceMappingURL=businesses.models.js.map