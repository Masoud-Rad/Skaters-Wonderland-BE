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
    contact_number: string;
  }

  interface Result {
    rows: BusinessSample[];
    [key: string]: unknown;
  }

  interface AddNewBusiness{
    username: string;
    businessname: string;
    city: string;
    country: string;
    postcode: string;
    description: string;
    created_at: Date;
    website: string;
    business_img_url: string;
    contact_number: string;
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


  exports.addBusiness = (newBusiness: AddNewBusiness) => {
    const { username, businessname, city, country, postcode, description, website, business_img_url, contact_number} = newBusiness;
    
    if (
      typeof newBusiness === "object" && 
      newBusiness.hasOwnProperty("businessname") && 
      newBusiness.hasOwnProperty("city") && 
      newBusiness.hasOwnProperty("country") && 
      newBusiness.hasOwnProperty("postcode") &&
      newBusiness.hasOwnProperty("description") && 
      newBusiness.hasOwnProperty("username")
    ) {
      const queryValues = [username, businessname, city, country, postcode, description];
      const queryColumns = ['username', 'businessname', 'city', 'country', 'postcode', 'description'];
  
      if (website) {
        queryValues.push(website);
        queryColumns.push('website');
      }
  
      if (business_img_url) {
        queryValues.push(business_img_url);
        queryColumns.push('business_img_url');
      }
  
      if (contact_number) {
        queryValues.push(contact_number);
        queryColumns.push('contact_number');
      }
  
      const query = `INSERT INTO businesses(${queryColumns.join(', ')}) VALUES (${queryValues.map((_, index) => `$${index + 1}`).join(',')}) RETURNING *;`;
  
      return db.query(query, queryValues)
      .then(({ rows }: Result) => rows[0]);
    } else {
      return Promise.reject({ status: 400, msg: 'BAD REQUEST!' });
    }
  };