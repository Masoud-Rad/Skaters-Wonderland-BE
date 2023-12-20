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

  interface AddNewUserSample {
    username: string;
    name: string;
    email: string;
    password: string;
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


exports.addUser = (newUser: AddNewUserSample)=>{
const {username, name, email, password} = newUser;

if (
  typeof newUser === "object" &&
  newUser.hasOwnProperty("username") &&
  newUser.hasOwnProperty("name") &&
  newUser.hasOwnProperty("email") &&
  newUser.hasOwnProperty("password")
){

  return db.query(`SELECT * FROM users WHERE username=$1;`,[username])
                    .then(({rows}: Result)=>{
                                              if(rows.length!=0){
                                                return Promise.reject({ status: 409 , msg: 'The username is already taken! Choose a different username please.'})
                                              }else{
                                                return db.query(`SELECT * FROM users WHERE email=$1;`,[email])
                                                .then(({rows}: any)=>{ 
                                                  if(rows.length!=0){
                                                    return Promise.reject({ status: 409 , msg: "Email address already in use! Choose a different email or LOG_IN."})
                                                  }else{
                                                    return db.query(`INSERT INTO users(username, name, email, password) VALUES ($1,$2,$3,$4) RETURNING *;`,
                                                    [username, name, email, password])
                                                    .then(({rows}: Result)=>{ 
                                                      return rows[0];
                                                    })
                                                  }
                                                })
                                              }
                                            })

 
}else{
  return Promise.reject({ status: 400, msg: "BAD REQUEST!" })
}

}






