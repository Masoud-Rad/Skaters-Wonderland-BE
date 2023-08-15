const db = require('../db/connection');

interface CommentSample{
    comment_id: number;
    body: string;
    land_id: number;
    username: string;
    created_at: Date;
  }

  interface CommentResult {
    rows: CommentSample[];
    [key: string]: unknown;
  }


exports.selectComments=(landId : string)=>{
    return db.query(`SELECT * FROM comments WHERE land_id=$1;`,[landId])
           .then(({rows} : CommentResult)=>{
            if(rows.length===0)
            {
                 return Promise.reject({ status: 404 , msg: 'Not Found!'})
            }
            return rows; 
           })        
  }