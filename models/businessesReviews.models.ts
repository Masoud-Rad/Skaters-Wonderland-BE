const db = require('../db/connection');

interface BusinessesReviewsSample{
    review_id: number;
    username: string;
    business_id: number;
    body : string;
    rating: number;
    created_at: Date;
  }

  interface Result {
    rows: BusinessesReviewsSample[];
    [key: string]: unknown;
  }

  interface AddNewBusinessReviewSample{
    body: string;
    username: string;
  }

  exports.selectBusinessesReviews=(businessId : string)=>{

    return db.query(`SELECT * FROM businessesreview WHERE business_id=$1;`,[businessId])
                .then(({rows}: Result)=>{
                    if(rows.length===0){
                        return Promise.reject({ status: 404 , msg: 'Not Found!'})
                      }else{
                        return rows;
                      }
                })
  }

  exports.addBusinessReview=(businessId: string, newBusinessReview: AddNewBusinessReviewSample)=>{
    if (typeof newBusinessReview === "object" && newBusinessReview.hasOwnProperty("body") && newBusinessReview.hasOwnProperty("username")) {
         const username= newBusinessReview.username;
         const body= newBusinessReview.body;
        
        return db.query(`INSERT INTO businessesreview (body, business_id, username) VALUES ($1,$2,$3) RETURNING *;`
            , [body, businessId, username])
            .then(({rows}: Result) => { 
              return rows[0]
            })      
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" })
    }
  }

  exports.delBusinessReview=(reviewId : string)=>{
    return db.query(`DELETE FROM businessesreview WHERE review_id=$1 ;`, [reviewId])
  }