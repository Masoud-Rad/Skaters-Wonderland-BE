

const db = require('../db/connection');

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
    land_img_url: string;
    username: string;
}


interface LandsResult {
  rows: LandSample[];
  [key: string]: unknown;
}

interface AddNewLandSample {
  landname: string;
  city: string;
  country: string;
  postcode: string;
  description: string;
  cost: string;
  is_public: boolean;
  has_rink: boolean;
  suitabile_for: string;
  land_img_url: string;
  username: string;
}


exports.selectLands=(city: string, outputLength:string, sort_by:string ="land_id" , order_by:string = "ASC")=>{
 
  let queryStr: string =`SELECT * FROM lands`;
  const quertValues : string[] = [];

  if (city) {
    quertValues.push(city);
    queryStr += ` WHERE city=$${quertValues.length}`;
}


if (outputLength){
  queryStr += ` ORDER BY ${sort_by} ${order_by} LIMIT ${outputLength};`;
}else{
  queryStr += ` ORDER BY ${sort_by} ${order_by};`;
}

//this is an easier method but longer:
  // if(city && has_rink && cost){
  //   queryStr+=` WHERE city=$1 AND has_rink=$2 AND cost=$3 ORDER BY ${sort_by} ${order_by};`;
  //   quertValues.push(city);
  //   quertValues.push(has_rink);
  //   quertValues.push(cost);
  // }else if(city && has_rink){
  //   queryStr+=` WHERE city=$1 AND has_rink=$2 ORDER BY ${sort_by} ${order_by};`;
  //   quertValues.push(city);
  //   quertValues.push(has_rink);
  // }else if(city && cost){
  //   queryStr+=` WHERE city=$1 AND cost=$2 ORDER BY ${sort_by} ${order_by};`;
  //   quertValues.push(city);
  //   quertValues.push(cost);
  // }else if(has_rink && cost){
  //   queryStr+=` WHERE has_rink=$1 AND cost=$2 ORDER BY ${sort_by} ${order_by};`;
  //   quertValues.push(has_rink);
  //   quertValues.push(cost);
  // }else if(city){
  //   queryStr+=` WHERE city=$1 ORDER BY ${sort_by} ${order_by};`;
  //   quertValues.push(city);
  // }else  if(has_rink){
  //   queryStr+=` WHERE has_rink=$1 ORDER BY ${sort_by} ${order_by};`;
  //   quertValues.push(has_rink);
  // }else if(cost){
  //   queryStr+=` WHERE cost=$1 ORDER BY ${sort_by} ${order_by};`;
  //   quertValues.push(cost);
  // }

  
 return db.query(queryStr,quertValues)
           .then((response : LandsResult)=>{
            if(response.rows.length===0){
              return Promise.reject({ status: 404 , msg: 'Not Found!'})
            }else{
              return response.rows;
            }
           })
  }


exports.selectSingleLand=(landId : string)=>{
  return db.query(`SELECT * FROM lands WHERE land_id=$1;`,[landId])
         .then(({rows} : LandsResult)=>{
          if(rows.length===0)
          {
               return Promise.reject({ status: 404 , msg: 'Not Found!'})
          }
          return rows[0]; 
         })        
}

exports.addLand=(newLand: AddNewLandSample)=>{
  const {landname , city, country, postcode, description, land_img_url, username} = newLand;
  if (
    typeof newLand === "object" && 
    newLand.hasOwnProperty("landname") && 
    newLand.hasOwnProperty("city") && 
    newLand.hasOwnProperty("country") && 
    newLand.hasOwnProperty("postcode") &&
    newLand.hasOwnProperty("description") && 
    newLand.hasOwnProperty("username")
    ) 
    {
      if(newLand.land_img_url)
      {
        return db.query(`INSERT INTO lands (landname, city, country, postcode, description, land_img_url, username) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`,
        [landname , city, country, postcode, description, land_img_url, username])
        .then(({rows} : LandsResult)=>{
          return rows[0];
        })

      }else{
              return db.query(`INSERT INTO lands (landname, city, country, postcode, description, username) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
              [landname , city, country, postcode, description, username])
              .then(({rows} : LandsResult)=>{
                return rows[0];
              })
           }
       
    }else {
      return Promise.reject({ status: 400, msg: "BAD REQUEST!" })
          }
}

exports.updateLand=(landId: string, votes_update: number, safety_rating_update: number, suitability_rating_update: number)=>{
  return db.query(`
        SELECT * FROM lands WHERE land_id= $1;
        `,[landId])
    .then(({rows} : LandsResult)=>{
        const land : LandSample =rows[0];

        if(votes_update){

                          const currentVotes= land.vote;
                          const updatedVotes = currentVotes + votes_update;

                          return db.query(`
                              UPDATE lands
                              SET
                              vote= $1
                              WHERE land_id = $2
                              RETURNING *;
                              `,[updatedVotes,landId]).then(({rows} : LandsResult)=>{
                              return (rows[0]);
                          })
                        }
        if(safety_rating_update){
                          const currentSafety_rating_total= land.safety_rating_total;
                          const updatedSafety_rating_total = currentSafety_rating_total + safety_rating_update;

                          return db.query(`
                              UPDATE lands
                              SET
                              safety_rating_total= $1,
                              safety_rating_count=$2
                              WHERE land_id = $3
                              RETURNING *;
                              `,[updatedSafety_rating_total, land.safety_rating_count+1 ,landId]).then(({rows} : LandsResult)=>{
                              return (rows[0]);
                          })
                        }
        if(suitability_rating_update){
                          const currentSuitability_rating_total= land.suitability_rating_total;
                          const updatedSuitability_rating_total = currentSuitability_rating_total + suitability_rating_update;

                          return db.query(`
                              UPDATE lands
                              SET
                              Suitability_rating_total= $1,
                              suitability_rating_count= $2
                              WHERE land_id = $3
                              RETURNING *;
                              `,[updatedSuitability_rating_total, land.suitability_rating_count+1, landId]).then(({rows} : LandsResult)=>{
                              return (rows[0]);
                          })
                        }

    })
}

exports.delLand=(landId : string)=>{
  //First delete related comments
  return db.query(`DELETE FROM comments WHERE land_id=$1 ;`, [landId]).then(()=>{
    // Then delete the land
    return db.query(`DELETE FROM lands WHERE land_id=$1 ;`, [landId])
  })
}

/* if we use async/await method:
exports.delLand = async (landId: string) => {
  try {
    // Delete related comments
    await db.query(`DELETE FROM comments WHERE land_id = $1 RETURNING *;`, [landId]);
    
    // Delete the land
    const result = await db.query(`DELETE FROM lands WHERE land_id = $1 RETURNING *;`, [landId]);
    console.log("Deleted land:", result.rows);
  } catch (error) {
    console.error("Error deleting land:", error);
    throw error;
  }
} */