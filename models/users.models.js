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
                return rows[0];
            }
        });
    }
};
exports.addUser = (newUser) => {
    const { username, name, email, password } = newUser;
    if (typeof newUser === "object" &&
        newUser.hasOwnProperty("username") &&
        newUser.hasOwnProperty("name") &&
        newUser.hasOwnProperty("email") &&
        newUser.hasOwnProperty("password")) {
        return db.query(`SELECT * FROM users WHERE username=$1;`, [username])
            .then(({ rows }) => {
            if (rows.length != 0) {
                return Promise.reject({ status: 409, msg: 'The username is already taken! Choose a different username please.' });
            }
            else {
                return db.query(`SELECT * FROM users WHERE email=$1;`, [email])
                    .then(({ rows }) => {
                    if (rows.length != 0) {
                        return Promise.reject({ status: 409, msg: "Email address already in use! Choose a different email or LOG_IN." });
                    }
                    else {
                        return db.query(`INSERT INTO users(username, name, email, password) VALUES ($1,$2,$3,$4) RETURNING *;`, [username, name, email, password])
                            .then(({ rows }) => {
                            return rows[0];
                        });
                    }
                });
            }
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.updateUser = (username, userUpdate) => {
    const { nameUpdate, emailUpdate, passwordUpdate, avatar_urlUpdate, locationUpdate } = userUpdate;
    return db.query(`SELECT * FROM users WHERE username=$1;`, [username]).then(({ rows }) => {
        const user = rows[0];
        if (!user) {
            return Promise.reject({ status: 404, msg: 'User not found!' });
        }
        const updateValues = [];
        const queryParams = [username];
        if (nameUpdate) {
            updateValues.push(`name = $${queryParams.length + 1}`);
            queryParams.push(nameUpdate);
        }
        if (emailUpdate) {
            updateValues.push(`email = $${queryParams.length + 1}`);
            queryParams.push(emailUpdate);
        }
        if (passwordUpdate) {
            updateValues.push(`password = $${queryParams.length + 1}`);
            queryParams.push(passwordUpdate);
        }
        if (avatar_urlUpdate) {
            updateValues.push(`avatar_url = $${queryParams.length + 1}`);
            queryParams.push(avatar_urlUpdate);
        }
        if (locationUpdate) {
            updateValues.push(`location = $${queryParams.length + 1}`);
            queryParams.push(locationUpdate);
        }
        const updateQuery = `UPDATE users SET ${updateValues.join(', ')} WHERE username = $1 RETURNING *;`;
        return db.query(updateQuery, queryParams).then(({ rows: updatedRows }) => {
            return updatedRows[0];
        });
    });
};
exports.delUser = (userName) => db.query('DELETE FROM sales WHERE username = $1 ;', [userName])
    .then(() => db.query('DELETE FROM ptsreview WHERE username = $1;', [userName]))
    .then(() => db.query(`SELECT * FROM personaltrainers WHERE username = $1;`, [userName]))
    .then(({ rows }) => {
    if (rows.length !== 0) {
        const ptID = rows[0].pt_id;
        return db.query('DELETE FROM ptsreview WHERE pt_id = $1;', [ptID]);
    }
})
    .then(() => db.query('DELETE FROM personaltrainers WHERE username = $1 ;', [userName]))
    .then(() => db.query('DELETE FROM businessesreview WHERE username = $1;', [userName]))
    .then(() => db.query(`SELECT * FROM businesses WHERE username = $1;`, [userName]))
    .then(({ rows }) => {
    if (rows.length !== 0) {
        const businessId = rows[0].business_id;
        return db.query('DELETE FROM businessesreview WHERE business_id = $1;', [businessId]);
    }
})
    .then(() => db.query('DELETE FROM businesses WHERE username = $1 ;', [userName]))
    .then(() => db.query('DELETE FROM comments WHERE username = $1;', [userName]))
    .then(() => db.query(`SELECT * FROM lands WHERE username = $1;`, [userName]))
    .then(({ rows }) => {
    if (rows.length !== 0) {
        const landId = rows[0].land_id;
        return db.query('DELETE FROM comments WHERE land_id = $1;', [landId]);
    }
})
    .then(() => db.query('DELETE FROM lands WHERE username = $1 ;', [userName]))
    .then(() => db.query('DELETE FROM users WHERE username = $1 ;', [userName]));
//# sourceMappingURL=users.models.js.map