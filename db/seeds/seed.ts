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

interface Business{
    username: string;
    businessname: string;
    city: string;
    country: string;
    postcode: string;
    description: string;
    created_at: Date;
    website: string;
    business_img_url: string;
    contact_number: string;
}

interface Businessesreview{
    username: string;
    business_id: number;
    body : string;
    rating: number;
    created_at: Date;
}

interface Personaltrainer{
    username: string; 
    ptname: string;
    city: string;
    country: string;
    postcode: string;
    description: string;
    created_at: Date;
    website: string;
    email: string;
    instagram: string;
    facebook: string;
    contact_number : string;
    avatar_url: string;
}

interface Ptsreview{
    username: string;
    pt_id: number;
    body: string;rating: string;
    created_at: Date;
}

interface Sale{
    username: string;
    itemname : string;
    description: string;
    price: string;
    city: string;
    country: string;
    created_at: Date;
    email: string;
    facebook: string;
    contact_number: string;
    availability: string;
    gear_avatar_url: string;
}



async function seed(salesData: Sale[], ptsreviewData: Ptsreview[], personaltrainersData: Personaltrainer[], businessesreviewData: Businessesreview[], businessesData: Business[], landData: Land[], commentData: Comment[], userData: User[]) {
    try {
        await db.query(`DROP TABLE IF EXISTS sales;`);
        await db.query(`DROP TABLE IF EXISTS ptsreview;`);
        await db.query(`DROP TABLE IF EXISTS personaltrainers;`);
        await db.query(`DROP TABLE IF EXISTS businessesreview;`);
        await db.query(`DROP TABLE IF EXISTS businesses;`);
        await db.query(`DROP TABLE IF EXISTS comments;`);
        await db.query(`DROP TABLE IF EXISTS lands;`);
        await db.query(`DROP TABLE IF EXISTS users;`);
        await db.query(`CREATE TABLE users (
            username VARCHAR PRIMARY KEY,
            name VARCHAR NOT NULL,
            avatar_url VARCHAR  DEFAULT './images/defaultWL.avif',
            email VARCHAR NOT NULL,
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
            land_img_url VARCHAR DEFAULT './images/defaultWL.avif',
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
        await db.query(`
            CREATE TABLE businesses (
                business_id SERIAL PRIMARY KEY, 
                username VARCHAR REFERENCES users(username) NOT NULL,
                businessname VARCHAR NOT NULL,
                city VARCHAR NOT NULL,
                country VARCHAR NOT NULL,
                postcode  VARCHAR NOT NULL,
                description VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                website VARCHAR,
                business_img_url VARCHAR DEFAULT './images/defaultWL.avif',
                contact_number VARCHAR
            );
        `)
        await db.query (`
            CREATE TABLE businessesreview (
                review_id SERIAL PRIMARY KEY,
                username VARCHAR REFERENCES users(username) NOT NULL,
                business_id INTEGER REFERENCES businesses(business_id) NOT NULL,
                body VARCHAR NOT NULL,
                rating INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `)
        await db.query(`
                CREATE TABLE personaltrainers(
                    pt_id SERIAL PRIMARY KEY,
                    username VARCHAR REFERENCES users(username) NOT NULL,
                    ptname VARCHAR NOT NULL,
                    city VARCHAR NOT NULL,
                    country VARCHAR NOT NULL,
                    postcode VARCHAR NOT NULL,
                    description VARCHAR NOT NULL,
                    created_at TIMESTAMP DEFAULT NOW(),
                    website VARCHAR,
                    email VARCHAR NOT NULL,
                    instagram VARCHAR,
                    facebook VARCHAR,
                    contact_number VARCHAR,
                    avatar_url VARCHAR DEFAULT './images/defaultWL.avif'
                );
        `)
        await db.query (`
            CREATE TABLE ptsreview (
                review_id SERIAL PRIMARY KEY,
                username VARCHAR REFERENCES users(username) NOT NULL,
                pt_id INTEGER REFERENCES personaltrainers(pt_id) NOT NULL,
                body VARCHAR NOT NULL,
                rating INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `)
        await db.query (`
            CREATE TABLE sales (
                item_id SERIAL PRIMARY KEY,
                username VARCHAR REFERENCES users(username) NOT NULL,
                itemname VARCHAR NOT NULL,
                description VARCHAR NOT NULL,
                price VARCHAR NOT NULL,
                city VARCHAR NOT NULL,
                country VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                email VARCHAR NOT NULL,
                facebook VARCHAR,
                contact_number VARCHAR,
                availability VARCHAR NOT NULL,
                gear_avatar_url VARCHAR  DEFAULT './images/defaultWL.avif'
            );
        `)
       
        const insertUsersQueryStr = format(`INSERT INTO users (username, name, avatar_url, email, password, location) VALUES %L;`, userData.map(({ username, name, avatar_url, email, password, location }) => [username, name, avatar_url, email, password, location]));
        await db.query(insertUsersQueryStr);
        const insertLandsQueryStr = format(`INSERT INTO lands (landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username) VALUES %L RETURNING *;`, landData.map(({ landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username }) => [landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username]));
        const result = await db.query(insertLandsQueryStr);
        const formatedCommentsData = formatComments(commentData, result.rows);
        const insertCommentsQueryStr = format(`INSERT INTO comments (body, land_id, username, created_at) VALUES %L;`, formatedCommentsData.map((formatedComment: FormatedComment) => [formatedComment.body, formatedComment.land_id, formatedComment.username, formatedComment.created_at]));
        await db.query(insertCommentsQueryStr);
        const insertBusinessesQueryStr = format (`INSERT INTO businesses (username, businessname, city, country, postcode, description, created_at, website, business_img_url, contact_number) VALUES %L;`, businessesData.map(({username, businessname, city, country, postcode, description, created_at, website, business_img_url, contact_number})=> [username, businessname, city, country, postcode, description, created_at, website, business_img_url, contact_number]));
        await db.query(insertBusinessesQueryStr);
        const insertBusinessesreviewQueryStr = format(`INSERT INTO businessesreview (username, business_id, body, rating, created_at) VALUES %L;`, businessesreviewData.map(({username, business_id, body, rating, created_at})=>[username, business_id, body, rating, created_at]))
        await db.query(insertBusinessesreviewQueryStr);
        const insertPersonaltrainersQueryStr = format (`INSERT INTO personaltrainers (username, ptname, city, country, postcode, description, created_at, website, email, instagram, facebook, contact_number, avatar_url) VALUES %L;`, personaltrainersData.map(({username, ptname, city, country, postcode, description, created_at, website, email, instagram, facebook, contact_number , avatar_url})=>[username, ptname, city, country, postcode, description, created_at, website, email, instagram, facebook, contact_number , avatar_url]) )
        await db.query(insertPersonaltrainersQueryStr);
        const insertPtsreviewQueryStr = format (`INSERT INTO ptsreview (username, pt_id, body, rating, created_at) VALUES %L;`, ptsreviewData.map(({username, pt_id, body, rating, created_at})=>[username, pt_id, body, rating, created_at]))
        await db.query(insertPtsreviewQueryStr);
        const insertSalesQueryStr = format (`INSERT INTO sales (username, itemname, description, price, city, country, created_at, email, facebook, contact_number, availability, gear_avatar_url) VALUES %L;`, salesData.map(({username, itemname, description, price, city, country, created_at, email, facebook, contact_number, availability, gear_avatar_url})=>[username, itemname, description, price, city, country, created_at, email, facebook, contact_number, availability, gear_avatar_url]))
        await db.query(insertSalesQueryStr);     
    }
    catch (error) {
        console.error('Error executing queries:', error);
    }
}

module.exports = seed;


