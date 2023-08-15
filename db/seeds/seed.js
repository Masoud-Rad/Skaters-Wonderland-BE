"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format = require('pg-format');
const db = require('../connection');
const { formatComments } = require('./utils');
async function seed(landData, commentData, userData) {
    try {
        await db.query(`DROP TABLE IF EXISTS comments;`);
        await db.query(`DROP TABLE IF EXISTS lands;`);
        await db.query(`DROP TABLE IF EXISTS users;`);
        await db.query(`CREATE TABLE users (
            username VARCHAR PRIMARY KEY,
            name VARCHAR NOT NULL,
            avatar_url VARCHAR,
            password VARCHAR NOT NULL
        );`);
        await db.query(`
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
        await db.query(`
            CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            body VARCHAR NOT NULL,
            land_id INTEGER REFERENCES lands(land_id) NOT NULL,
            username VARCHAR REFERENCES users(username) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
            );
        `);
        const insertUsersQueryStr = format(`INSERT INTO users (username, name, avatar_url, password) VALUES %L;`, userData.map(({ username, name, avatar_url, password }) => [username, name, avatar_url, password]));
        await db.query(insertUsersQueryStr);
        const insertLandsQueryStr = format(`INSERT INTO lands (landName, city, country, description, vote, created_at, land_img_url, username) VALUES %L RETURNING *;`, landData.map(({ landName, city, country, description, vote, created_at, land_img_url, username }) => [landName, city, country, description, vote, created_at, land_img_url, username]));
        const result = await db.query(insertLandsQueryStr);
        const formatedCommentsData = formatComments(commentData, result.rows);
        const insertCommentsQueryStr = format(`INSERT INTO comments (body, land_id, username, created_at) VALUES %L;`, formatedCommentsData.map((formatedComment) => [formatedComment.body, formatedComment.land_id, formatedComment.username, formatedComment.created_at]));
        await db.query(insertCommentsQueryStr);
    }
    catch (error) {
        console.error('Error executing queries:', error);
    }
}
module.exports = seed;
//# sourceMappingURL=seed.js.map