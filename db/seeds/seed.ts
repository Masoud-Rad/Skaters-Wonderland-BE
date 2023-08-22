const format = require('pg-format');
const db = require('../connection');
const {formatComments} = require('./utils');


interface Land {
    landname: string;
    city: string;
    country: string;
    postcode: string;
    description: string;
    created_at: Date;
    vote: number;
    safety_rating_total: number;
    safety_rating_count: number;
    safety_rating_ave: number;
    suitability_rating_total: number;
    suitability_rating_count: number;
    suitability_rating_ave: number;
    cost: string;
    is_public: boolean;
    has_rink: boolean;
    suitabile_for: string;
    land_img_url: string;
    username: string;
}

interface User {
    username: string;
    name: string;
    email: string;
    password: string;
    avatar_url: string;
    location: string;
}

interface Comment{
    body: string;
    landname: string;
    username: string;
    created_at: Date;
}
interface FormatedComment{
    body: string;
    land_id: number;
    username: string;
    created_at: Date;
}


async function seed(landData: Land[], commentData: Comment[], userData: User[]) {
    try {
        
        await db.query(`DROP TABLE IF EXISTS comments;`);
        await db.query(`DROP TABLE IF EXISTS lands;`);
        await db.query(`DROP TABLE IF EXISTS users;`);
        await db.query(`CREATE TABLE users (
            username VARCHAR PRIMARY KEY,
            name VARCHAR NOT NULL,
            avatar_url VARCHAR,
            email VARCHAR,
            password VARCHAR NOT NULL,
            location VARCHAR
        );`);
        await db.query(`
            CREATE TABLE lands(
            land_id SERIAL PRIMARY KEY,
            landname VARCHAR NOT NULL,
            city VARCHAR NOT NULL,
            country VARCHAR NOT NULL,
            postcode  VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            vote INT DEFAULT 0,
            safety_rating_total INT DEFAULT 0,
            safety_rating_count INT DEFAULT 0,
            safety_rating_ave NUMERIC GENERATED ALWAYS AS (
                CASE
                  WHEN safety_rating_count > 0 THEN (safety_rating_total::NUMERIC / safety_rating_count)::NUMERIC(10, 2)
                  ELSE 0
                END
            ) STORED,
            suitability_rating_total INT DEFAULT 0,
            suitability_rating_count INT DEFAULT 0,
            suitability_rating_ave NUMERIC GENERATED ALWAYS AS (
                CASE
                  WHEN suitability_rating_count > 0 THEN (suitability_rating_total::NUMERIC / suitability_rating_count)::NUMERIC(10, 2)
                  ELSE 0
                END
            ) STORED,
            cost VARCHAR NOT NULL,
            is_public BOOL NOT NULL,
            has_rink BOOL NOT NULL,
            suitabile_for VARCHAR NOT NULL,
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
        const insertUsersQueryStr = format(`INSERT INTO users (username, name, avatar_url, email, password, location) VALUES %L;`, userData.map(({ username, name, avatar_url, email, password, location }) => [username, name, avatar_url, email, password, location]));
        await db.query(insertUsersQueryStr);
        const insertLandsQueryStr = format(`INSERT INTO lands (landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username) VALUES %L RETURNING *;`, landData.map(({ landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username }) => [landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username]));
        const result = await db.query(insertLandsQueryStr);
        const formatedCommentsData = formatComments(commentData, result.rows);
        const insertCommentsQueryStr = format(`INSERT INTO comments (body, land_id, username, created_at) VALUES %L;`, formatedCommentsData.map((formatedComment: FormatedComment) => [formatedComment.body, formatedComment.land_id, formatedComment.username, formatedComment.created_at]));
        await db.query(insertCommentsQueryStr);
    }
    catch (error) {
        console.error('Error executing queries:', error);
    }
}

module.exports = seed;


