const db = require('../db/connection');

interface UsersSample {
    username: string;
    name: string;
    avatar_url: string;
    password: string;
  }

interface Result {
    rows: UsersSample[];
    [key: string]: unknown;
  }


exports.selectUsers=()=>{
    return db.query(`SELECT * FROM users;`)
    .then(({rows}: Result)=>{
        return rows;
    })
}