"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectBusinessesReviews = (businessId) => {
    return db.query(`SELECT * FROM businessesreview WHERE business_id=$1;`, [businessId])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
exports.addBusinessReview = (businessId, newBusinessReview) => {
    if (typeof newBusinessReview === "object" && newBusinessReview.hasOwnProperty("body") && newBusinessReview.hasOwnProperty("username")) {
        const username = newBusinessReview.username;
        const body = newBusinessReview.body;
        return db.query(`INSERT INTO businessesreview (body, business_id, username) VALUES ($1,$2,$3) RETURNING *;`, [body, businessId, username])
            .then(({ rows }) => {
            return rows[0];
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.delBusinessReview = (reviewId) => {
    return db.query(`DELETE FROM businessesreview WHERE review_id=$1 ;`, [reviewId]);
};
//# sourceMappingURL=businessesReviews.models.js.map