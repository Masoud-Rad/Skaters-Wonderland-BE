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

  interface AddNewCommentSample{
    body: string;
    username: string;
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


exports.addComment=(landId: string, newComment: AddNewCommentSample)=>{
  if (typeof newComment === "object" && newComment.hasOwnProperty("body") && newComment.hasOwnProperty("username")) {
       const username= newComment.username;
       const body= newComment.body;
      
      return db.query(`INSERT INTO comments
  (body, land_id, username) VALUES ($1,$2,$3) RETURNING *;`
          , [body, landId, username]).then(({rows}: CommentResult) => {
            return rows[0]
          })      
  }
  else {
      return Promise.reject({ status: 400, msg: "BAD REQUEST!" })
  }
}

exports.delComment=(commentId : string)=>{
  return db.query(`DELETE FROM comments WHERE comment_id=$1 ;`, [commentId])
}

  


