const db = require('../db/connection');

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
  interface Result {
    rows: PtSample[];
    [key: string]: unknown;
  }

exports.selectPersonalTrainers = ()=>{
    return db.query(`SELECT * FROM personaltrainers`)
    .then(({rows}: Result)=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found!'})
        } else {
            return rows; 
        }
    })
}

exports.selectSinglePersonalTrainer =  (pt_id: string)=>{
    return db.query(`SELECT * FROM personaltrainers WHERE pt_id=$1`, [pt_id])
    .then(({rows}: Result)=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found!'})
        } else {
            return rows[0]; 
        }
    })
}