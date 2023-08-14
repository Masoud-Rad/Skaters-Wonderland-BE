"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format = require('pg-format');
const db = require('../connection');
const { formatComments } = require('./utils');
function seed(landData, commentData, userData) {
    return db.query(`DROP TABLE IF EXISTS comments;`)
        .then(() => { return db.query(`DROP TABLE IF EXISTS lands;`); })
        .then(() => { return db.query(`DROP TABLE IF EXISTS users;`); })
        .then(() => {
        return db.query(`
                CREATE TABLE users (
                username VARCHAR PRIMARY KEY,
                name VARCHAR NOT NULL,
                avatar_url VARCHAR,
                password VARCHAR NOT NULL
                );
            `);
    })
        .then(() => {
        return db.query(`
                CREATE TABLE lands(
                land_id SERIAL PRIMARY KEY,
                landName VARCHAR NOT NULL,
                city VARCHAR NOT NULL,
                country VARCHAR NOT NULL,
                description VARCHAR NOT NULL,
                vote INT DEFAULT 0 NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                land_img_url VARCHAR DEFAULT 'https://tse2.mm.bing.net/th?id=OIP.0G5ekV-kpF__IG0wQRRDGQHaFj&pid=Api&P=0&h=180',
                username VARCHAR REFERENCES users(username) NOT NULL
                );
            `);
    })
        .then(() => {
        return db.query(`
                CREATE TABLE comments (
                comment_id SERIAL PRIMARY KEY,
                body VARCHAR NOT NULL,
                land_id INT REFERENCES lands(land_id) NOT NULL,
                username VARCHAR REFERENCES users(username) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
                );
            `);
    })
        .then(() => {
        const insertUsersQueryStr = format(`INSERT INTO users (username, name, avatar_url, password) VALUES %L;`, userData.map(({ username, name, avatar_url, password }) => [username, name, avatar_url, password]));
        return db.query(insertUsersQueryStr);
    })
        .then(() => {
        const insertLandsQueryStr = format(`INSERT INTO lands (landName, city, country, description, vote, created_at, land_img_url, username) VALUES %L RETURNING *;`, landData.map(({ landName, city, country, description, vote, created_at, land_img_url, username }) => [landName, city, country, description, vote, created_at, land_img_url, username]));
        return db.query(insertLandsQueryStr);
    })
        .then((landsResult) => {
        const formatedCommentsData = formatComments(commentData, landsResult.rows);
        const insertCommentsQueryStr = format(`INSERT INTO comments (body, land_id, username, created_at) VALUES %L;`, formatedCommentsData.map((formatedComment) => [formatedComment.body, formatedComment.land_id, formatedComment.username, formatedComment.created_at]));
        return db.query(insertCommentsQueryStr);
    })
        .catch((err) => console.error("Error in seed: ", err));
}
module.exports = seed;
//# sourceMappingURL=seed.js.map