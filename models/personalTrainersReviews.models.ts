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
  interface AddPtReviewSample{
    username: string;
    body: string;rating: string;
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

exports.addPtReview = (ptId: string, newPtReview: AddPtReviewSample)=>{

    const {body, username} = newPtReview;

    if(typeof newPtReview=== "object" && body && username)
    {
        return db.query(`INSERT INTO ptsreview (body, pt_id, username) VALUES ($1,$2,$3) RETURNING *;`, [body, ptId, username])
        .then(({rows}: Result)=>{ 
            return rows[0]
        })
        .catch((err: Error)=>{
            return err;
        })
    }else{
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" })
    }
}


exports.delPtReview=(reviewId : string)=> db.query(`DELETE FROM ptsreview WHERE review_id=$1 ;`, [reviewId])
  