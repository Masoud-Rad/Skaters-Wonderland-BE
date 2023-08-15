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



exports.selectLands=(city: string)=>{
  if(!city){
    return db.query(`SELECT * FROM lands;`)
           .then((response : LandsResult)=>{
            return response.rows;
           })
  }else{
    return db.query(`SELECT * FROM lands WHERE city=$1;`,[city])
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