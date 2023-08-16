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
exports.addLand = (newLand) => {
    if (typeof newLand === "object" &&
        newLand.hasOwnProperty("landname") &&
        newLand.hasOwnProperty("city") &&
        newLand.hasOwnProperty("country") &&
        newLand.hasOwnProperty("description") &&
        newLand.hasOwnProperty("username")) {
        if (newLand.land_img_url) {
            return db.query(`INSERT INTO lands (landname, city, country, description, land_img_url, username) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`, [newLand.landname, newLand.city, newLand.country, newLand.description, newLand.land_img_url, newLand.username])
                .then(({ rows }) => {
                return rows[0];
            });
        }
        else {
            return db.query(`INSERT INTO lands (landname, city, country, description, username) VALUES ($1,$2,$3,$4,$5) RETURNING *;`, [newLand.landname, newLand.city, newLand.country, newLand.description, newLand.username])
                .then(({ rows }) => {
                return rows[0];
            });
        }
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.updateLand = (landId, votesUpdate) => {
    return db.query(`
        SELECT * FROM lands WHERE land_id= $1;
        `, [landId])
        .then(({ rows }) => {
        const land = rows[0];
        const currentVotes = land.vote;
        const updatedVotes = currentVotes + votesUpdate;
        return db.query(`
            UPDATE lands
            SET
            vote= $1
            WHERE land_id = $2
            RETURNING *;
            `, [updatedVotes, landId]).then(({ rows }) => {
            return (rows[0]);
        });
    });
};
//# sourceMappingURL=lands.models.js.map