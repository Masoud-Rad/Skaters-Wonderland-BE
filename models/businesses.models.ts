const db = require('../db/connection');

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
  }

  interface Result {
    rows: BusinessSample[];
    [key: string]: unknown;
  }


  exports.selectBusinesses=()=>{

    return db.query(`SELECT * FROM businesses;`)
                .then(({rows}: Result)=>{
                    if(rows.length===0){
                        return Promise.reject({ status: 404 , msg: 'Not Found!'})
                      }else{
                        return rows;
                      }
                })
  }


  exports.selectSingleBusiness =(businessId : string)=>{

    return db.query(`SELECT * FROM businesses WHERE business_id=$1;`,[businessId])
                .then(({rows}: Result)=>{
                    if(rows.length===0){
                        return Promise.reject({ status: 404 , msg: 'Not Found!'})
                      }else{
                        return rows[0];
                      }
                })
  }