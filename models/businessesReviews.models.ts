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

