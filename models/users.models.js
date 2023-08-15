"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectUsers = () => {
    return db.query(`SELECT * FROM users;`)
        .then(({ rows }) => {
        return rows;
    });
};
//# sourceMappingURL=users.models.js.map