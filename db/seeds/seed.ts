const format = require('pg-format');
const db = require('../connection');

interface Land {
    landName: string;
    city: string;
    country: string;
    description: string;
    created_at: Date;
    vote: number;
    land_img_url: string;
    username: string;
}

interface User {
    username: string;
    name: string;
    avatar_url: string;
    password: string;
}

console.log("in the seed");
async function seed(landData: Land[], userData: User[]) {
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
            land_id INT REFERENCES lands(land_id) NOT NULL,
            username VARCHAR REFERENCES users(username) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        const insertUsersQueryStr = format(
            `INSERT INTO users (username, name, avatar_url, password) VALUES %L;`,
            userData.map(({ username, name, avatar_url, password }) => [username, name, avatar_url, password])
        );
        await db.query(insertUsersQueryStr);

        const insertLandsQueryStr = format(
            `INSERT INTO lands (landName, city, country, description, vote, created_at, land_img_url, username) VALUES %L;`,
            landData.map(({ landName, city, country, description, vote, created_at, land_img_url, username }) =>
                [landName, city, country, description, vote, created_at, land_img_url, username])
        );
        const res = await db.query(insertLandsQueryStr);
        console.log("Inserted lands:", res.rows);
        

    } catch (error) {
        console.error('Error executing queries:', error);
    }
}

module.exports = seed;
