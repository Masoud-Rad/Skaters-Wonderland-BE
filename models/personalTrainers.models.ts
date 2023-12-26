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

  interface ADDNewPtSample {
    username: string; 
    ptname: string;
    city: string;
    country: string;
    postcode: string;
    description: string;
    website: string;
    email: string;
    instagram: string;
    facebook: string;
    contact_number : string;
    avatar_url: string;
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


exports.addPt = (newPt: ADDNewPtSample) => {
    const {username, ptname, city, country, postcode, description, website, email, instagram, facebook, contact_number , avatar_url} = newPt;
    
    if ( typeof newPt === "object" && ptname && city && country && postcode && description && email && username )
       {
      
        const queryValues = [username, ptname, city, country, postcode, description, email];
        const queryColumns = ['username', 'ptname', 'city', 'country', 'postcode', 'description', 'email'];
    
        if (website) {
          queryValues.push(website);
          queryColumns.push('website');
        }
    
        if (instagram) {
          queryValues.push(instagram);
          queryColumns.push('instagram');
        }
    
        if (facebook) {
          queryValues.push(facebook);
          queryColumns.push('facebook');
        }

        if (contact_number) {
            queryValues.push(contact_number);
            queryColumns.push('contact_number');
        }

        if (avatar_url) {
            queryValues.push(avatar_url);
            queryColumns.push('avatar_url');
        }
  
      const query = `INSERT INTO personaltrainers(${queryColumns.join(', ')}) VALUES (${queryValues.map((_, index) => `$${index + 1}`).join(',')}) RETURNING *;`;
  
      return db.query(query, queryValues)
      .then(({ rows }: Result) => rows[0]);
    } else {
      return Promise.reject({ status: 400, msg: 'BAD REQUEST!' });
    }
  };