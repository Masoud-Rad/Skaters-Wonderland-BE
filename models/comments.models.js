var db = require('../db/connection');
exports.selectComments = function (landId) {
    return db.query("SELECT * FROM comments WHERE land_id=$1;", [landId])
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        return rows;
    });
};
exports.addComment = function (landId, newComment) {
    if (typeof newComment === "object" && newComment.hasOwnProperty("body") && newComment.hasOwnProperty("username")) {
        var username = newComment.username;
        var body = newComment.body;
        return db.query("INSERT INTO comments\n  (body, land_id, username) VALUES ($1,$2,$3) RETURNING *;", [body, landId, username]).then(function (_a) {
            var rows = _a.rows;
            return rows[0];
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.delComment = function (commentId) {
    return db.query("DELETE FROM comments WHERE comment_id=$1 ;", [commentId]);
};
