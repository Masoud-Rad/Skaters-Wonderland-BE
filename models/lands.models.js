"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectLands = (city, has_rink, cost, sort_by = "land_id", order_by = "ASC") => {
    let queryStr = `SELECT * FROM lands`;
    const quertValues = [];
    if (city) {
        quertValues.push(city);
        queryStr += ` WHERE city=$${quertValues.length}`;
    }
    if (has_rink) {
        quertValues.push(has_rink);
        queryStr += `${queryStr.includes('WHERE') ? ' AND' : ' WHERE'} has_rink=$${quertValues.length}`;
    }
    if (cost) {
        quertValues.push(cost);
        queryStr += `${queryStr.includes('WHERE') ? ' AND' : ' WHERE'} cost=$${quertValues.length}`;
    }
    queryStr += ` ORDER BY ${sort_by} ${order_by};`;
    return db.query(queryStr, quertValues)
        .then((response) => {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return response.rows;
        }
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
exports.addLand = (newLand) => {
    const { landname, city, country, postcode, description, cost, is_public, has_rink, suitabile_for, land_img_url, username } = newLand;
    if (typeof newLand === "object" &&
        newLand.hasOwnProperty("landname") &&
        newLand.hasOwnProperty("city") &&
        newLand.hasOwnProperty("country") &&
        newLand.hasOwnProperty("postcode") &&
        newLand.hasOwnProperty("description") &&
        newLand.hasOwnProperty("cost") &&
        newLand.hasOwnProperty("is_public") &&
        newLand.hasOwnProperty("has_rink") &&
        newLand.hasOwnProperty("suitabile_for") &&
        newLand.hasOwnProperty("username")) {
        if (newLand.land_img_url) {
            return db.query(`INSERT INTO lands (landname, city, country, postcode, description, cost, is_public, has_rink, suitabile_for, land_img_url, username) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *;`, [landname, city, country, postcode, description, cost, is_public, has_rink, suitabile_for, land_img_url, username])
                .then(({ rows }) => {
                return rows[0];
            });
        }
        else {
            return db.query(`INSERT INTO lands (landname, city, country, postcode, description, safety_rating, suitability_rating, cost, is_public, has_rink, suitabile_for, username) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;`, [landname, city, country, postcode, description, cost, is_public, has_rink, suitabile_for, username])
                .then(({ rows }) => {
                return rows[0];
            });
        }
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.updateLand = (landId, votes_update, safety_rating_update, suitability_rating_update) => {
    return db.query(`
        SELECT * FROM lands WHERE land_id= $1;
        `, [landId])
        .then(({ rows }) => {
        const land = rows[0];
        if (votes_update) {
            const currentVotes = land.vote;
            const updatedVotes = currentVotes + votes_update;
            return db.query(`
                              UPDATE lands
                              SET
                              vote= $1
                              WHERE land_id = $2
                              RETURNING *;
                              `, [updatedVotes, landId]).then(({ rows }) => {
                return (rows[0]);
            });
        }
        if (safety_rating_update) {
            const currentSafety_rating_total = land.safety_rating_total;
            const updatedSafety_rating_total = currentSafety_rating_total + safety_rating_update;
            return db.query(`
                              UPDATE lands
                              SET
                              safety_rating_total= $1,
                              safety_rating_count=$2
                              WHERE land_id = $3
                              RETURNING *;
                              `, [updatedSafety_rating_total, land.safety_rating_count + 1, landId]).then(({ rows }) => {
                return (rows[0]);
            });
        }
        if (suitability_rating_update) {
            const currentSuitability_rating_total = land.suitability_rating_total;
            const updatedSuitability_rating_total = currentSuitability_rating_total + suitability_rating_update;
            return db.query(`
                              UPDATE lands
                              SET
                              Suitability_rating_total= $1,
                              suitability_rating_count= $2
                              WHERE land_id = $3
                              RETURNING *;
                              `, [updatedSuitability_rating_total, land.suitability_rating_count + 1, landId]).then(({ rows }) => {
                return (rows[0]);
            });
        }
    });
};
exports.delLand = (landId) => {
    return db.query(`DELETE FROM comments WHERE land_id=$1 ;`, [landId]).then(() => {
        return db.query(`DELETE FROM lands WHERE land_id=$1 ;`, [landId]);
    });
};
//# sourceMappingURL=lands.models.js.map