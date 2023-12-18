const db = require('../db/connection');


interface PtsreviewSample{
    review_id: number;
    username: string;
    pt_id: number;
    body: string;rating: string;
    created_at: Date;
  }

  interface Result {
    rows: PtsreviewSample[];
    [key: string]: unknown;
  }

exports.selectPersonalTrainersReviews =  (pt_id: string)=>{
    return db.query(`SELECT * FROM ptsreview WHERE pt_id=$1`, [pt_id])
    .then(({rows}: Result)=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found!'})
        } else {
            return rows; 
        }
    })
}