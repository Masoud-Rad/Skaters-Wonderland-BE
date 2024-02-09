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
exports.addPtReview = (ptId, newPtReview) => {
    const { body, username } = newPtReview;
    if (typeof newPtReview === "object" && body && username) {
        return db.query(`INSERT INTO ptsreview (body, pt_id, username) VALUES ($1,$2,$3) RETURNING *;`, [body, ptId, username])
            .then(({ rows }) => {
            return rows[0];
        })
            .catch((err) => {
            return err;
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.delPtReview = (reviewId) => db.query(`DELETE FROM ptsreview WHERE review_id=$1 ;`, [reviewId]);
//# sourceMappingURL=personalTrainersReviews.models.js.map