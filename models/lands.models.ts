const db = require('../db/connection');

interface LandSample {
  land_id: number;
  landname: string;
  city: string;
  country: string;
  description: string;
  vote: number;
  created_at: Date;
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
  description: string;
  land_img_url: string;
  username: string;
}



exports.selectLands=(city: string, sort_by:string ="land_id" , order_by:string = "ASC")=>{
 
  if(!city){
    return db.query(`SELECT * FROM lands ORDER BY ${sort_by} ${order_by};`)
           .then((response : LandsResult)=>{
            return response.rows;
           })
  }else{
    return db.query(`SELECT * FROM lands WHERE city=$1 ORDER BY ${sort_by} ${order_by};`,[city])
           .then((response : LandsResult)=>{
            if(response.rows.length===0){
              return Promise.reject({ status: 404 , msg: 'Not Found!'})
            }else{
              return response.rows;
            }
           })
  }
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
  if (
    typeof newLand === "object" && 
    newLand.hasOwnProperty("landname") && 
    newLand.hasOwnProperty("city") && 
    newLand.hasOwnProperty("country") && 
    newLand.hasOwnProperty("description") && 
    newLand.hasOwnProperty("username")) 
    {
      if(newLand.land_img_url)
      {
        return db.query(`INSERT INTO lands (landname, city, country, description, land_img_url, username) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
        [newLand.landname, newLand.city, newLand.country, newLand.description, newLand.land_img_url, newLand.username])
        .then(({rows} : LandsResult)=>{
          return rows[0];
        })

      }else{
              return db.query(`INSERT INTO lands (landname, city, country, description, username) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
              [newLand.landname, newLand.city, newLand.country, newLand.description, newLand.username])
              .then(({rows} : LandsResult)=>{
                return rows[0];
              })
           }
       
    }else {
      return Promise.reject({ status: 400, msg: "BAD REQUEST!" })
          }
}

exports.updateLand=(landId: string, votesUpdate: number)=>{
  return db.query(`
        SELECT * FROM lands WHERE land_id= $1;
        `,[landId])
    .then(({rows} : LandsResult)=>{
        const land : LandSample =rows[0];
        const currentVotes= land.vote;

        const updatedVotes = currentVotes + votesUpdate;

        return db.query(`
            UPDATE lands
            SET
            vote= $1
            WHERE land_id = $2
            RETURNING *;
            `,[updatedVotes,landId]).then(({rows} : LandsResult)=>{
            return (rows[0]);
        })
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