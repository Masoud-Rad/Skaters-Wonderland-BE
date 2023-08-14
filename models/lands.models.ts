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


interface Result {
  rows: LandSample[];
  [key: string]: unknown;
}


exports.selectLands=()=>{
    return db.query(`SELECT * FROM lands;`)
           .then((response : Result)=>{
            return response.rows;
           })
}