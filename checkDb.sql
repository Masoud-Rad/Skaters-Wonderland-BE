
DROP DATABASE IF EXISTS skaters_wonderland;
CREATE DATABASE skaters_wonderland;

\c skaters_wonderland

CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        avatar_url VARCHAR,
        password VARCHAR NOT NULL
      );
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

CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        body VARCHAR NOT NULL,
        land_id INT REFERENCES lands(land_id) NOT NULL,
        username VARCHAR REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );



\dt