const db = require('../db/connection');

interface UsersSample {
    username: string;
    name: string;
    email: string;
    password: string;
    avatar_url: string;
    location: string;
  }

interface Result {
    rows: UsersSample[];
    [key: string]: unknown;
  }


exports.selectUsers=(userName: string)=>{
  if(!userName){
                return db.query(`SELECT * FROM users;`)
                .then(({rows}: Result)=>{
                    return rows;
                })
               }else{
                    return db.query(`SELECT * FROM users WHERE username=$1;`,[userName])
                    .then(({rows}: Result)=>{
                                              if(rows.length===0){
                                                return Promise.reject({ status: 404 , msg: 'Not Found!'})
                                              }else{
                                                return rows;
                                              }
                                            })
                    }
}
