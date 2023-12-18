const db = require('../db/connection');

interface SaleSample{
    item_id: number;
    username: string;
    itemname : string;
    description: string;
    price: string;
    city: string;
    country: string;
    created_at: Date;
    email: string;
    facebook: string;
    contact_number: string;
    availability: string;
    gear_avatar_url: string;
  }

  interface Result {
    rows: SaleSample[];
    [key: string]: unknown;
  }

exports.selectsalesItems = ()=>{
    return db.query(`SELECT * FROM sales`)
    .then(({rows}: Result)=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found!'})
        } else {
            return rows; 
        }  
    })
}

exports.selectSingleSalesItem = ((item_id: string)=>{
    return db.query(`SELECT * FROM sales WHERE item_id=$1`, [item_id])
    .then(({rows}: Result)=>{
        if(rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not Found!'})
        } else {
            return rows[0]; 
        }  
    })
})

