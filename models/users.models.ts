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

  interface UserUpdateSample{
    nameUpdate: string;
    emailUpdate: string;
    passwordUpdate: string;
    avatar_urlUpdate: string;
    locationUpdate: string;
  }



  interface PtSample{
    pt_id: number; 
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
  interface PtResult {
    rows: PtSample[];
    [key: string]: unknown;
  }


  interface BusinessSample {
    business_id: number;
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

  interface BusinessResult {
    rows: BusinessSample[];
    [key: string]: unknown;
  }


  interface LandSample {
    land_id: number;
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


interface LandsResult {
  rows: LandSample[];
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


exports.updateUser = (username: string, userUpdate: UserUpdateSample) => {
  const { nameUpdate, emailUpdate, passwordUpdate, avatar_urlUpdate, locationUpdate } = userUpdate;

  return db.query(`SELECT * FROM users WHERE username=$1;`, [username]).then(({ rows }: Result) => {
    const user: UsersSample = rows[0];

    if (!user) {
      return Promise.reject({ status: 404, msg: 'User not found!' });
    }

    const updateValues: string[] = [];
    const queryParams: any[] = [username];

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

    return db.query(updateQuery, queryParams).then(({ rows: updatedRows }: Result) => {
      return updatedRows[0];
    });
  });
};




exports.delUser = (userName: string) => 
db.query('DELETE FROM sales WHERE username = $1 ;', [userName])
 .then(()=> 
    db.query('DELETE FROM ptsreview WHERE username = $1;', [userName]))
    // Before deleting a PT we should delete all of Pt's reviews (All reviews have been posted for that PT)
    .then(()=> 
      //First we should find pt_id
      db.query(`SELECT * FROM personaltrainers WHERE username = $1;`, [userName]))
      .then(({rows}: PtResult)=>{
        if(rows.length!==0){
        const ptID = rows[0].pt_id;
        return db.query('DELETE FROM ptsreview WHERE pt_id = $1;', [ptID])
        }
      })
        .then(()=> db.query('DELETE FROM personaltrainers WHERE username = $1 ;', [userName]))
          .then(()=> db.query('DELETE FROM businessesreview WHERE username = $1;', [userName]))
          // Before deleting a business we should delete all of businesses's reviews 
          .then(()=> 
            //we should find business_id
            db.query(`SELECT * FROM businesses WHERE username = $1;`, [userName]))
            .then(({rows}: BusinessResult)=>{
              if(rows.length!==0){
              const businessId = rows[0].business_id;
              return db.query('DELETE FROM businessesreview WHERE business_id = $1;', [businessId])
              }
            })
              .then(()=> db.query('DELETE FROM businesses WHERE username = $1 ;', [userName]))
                .then(()=> db.query('DELETE FROM comments WHERE username = $1;', [userName]))
                  // Before deleting a land we should delete all of land's reviews 
                  .then(()=> 
                  //we should find land_id
                  db.query(`SELECT * FROM lands WHERE username = $1;`, [userName]))
                  .then(({rows}: LandsResult)=>{
                    if(rows.length!==0){
                    const landId = rows[0].land_id;
                    return db.query('DELETE FROM comments WHERE land_id = $1;', [landId])
                    }
                  })
                    .then(()=> db.query('DELETE FROM lands WHERE username = $1 ;', [userName]))
                      .then(()=> db.query('DELETE FROM users WHERE username = $1 ;', [userName]))


   



