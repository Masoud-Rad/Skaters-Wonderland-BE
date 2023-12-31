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
exports.addComment = (landId, newComment) => {
    if (typeof newComment === "object" && newComment.hasOwnProperty("body") && newComment.hasOwnProperty("username")) {
        const username = newComment.username;
        const body = newComment.body;
        return db.query(`INSERT INTO comments
  (body, land_id, username) VALUES ($1,$2,$3) RETURNING *;`, [body, landId, username]).then(({ rows }) => {
            return rows[0];
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.delComment = (commentId) => {
    return db.query(`DELETE FROM comments WHERE comment_id=$1 ;`, [commentId]);
};
//# sourceMappingURL=comments.models.js.map