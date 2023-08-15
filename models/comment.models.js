"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectComments = (landId) => {
    return db.query(`SELECT * FROM comments WHERE land_id=$1;`, [landId])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        return rows;
    });
};
//# sourceMappingURL=comment.models.js.map