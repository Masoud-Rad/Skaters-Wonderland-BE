"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectUsers = (userName) => {
    if (!userName) {
        return db.query(`SELECT * FROM users;`)
            .then(({ rows }) => {
            return rows;
        });
    }
    else {
        return db.query(`SELECT * FROM users WHERE username=$1;`, [userName])
            .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found!' });
            }
            else {
                return rows;
            }
        });
    }
};
//# sourceMappingURL=users.models.js.map