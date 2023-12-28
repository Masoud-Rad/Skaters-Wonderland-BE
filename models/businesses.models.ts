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

  interface BusinessUpdateSample {
    businessnameUpdate: string;
    cityUpdate: string;
    countryUpdate: string;
    postcodeUpdate: string;
    descriptionUpdate: string;
    websiteUpdate: string;
    contact_numberUpdate: string;
    business_img_urlUpdate: string;
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


  exports.updateBusiness =  (businessId: string, businessUpdate: BusinessUpdateSample) => {
    const { businessnameUpdate, cityUpdate, countryUpdate, postcodeUpdate, descriptionUpdate, websiteUpdate, contact_numberUpdate, business_img_urlUpdate } = businessUpdate;
  
    return db.query(`SELECT * FROM businesses WHERE business_id=$1;`, [businessId]).then(({ rows }: Result) => {
      const business: BusinessSample = rows[0];
      if (!business) {
        return Promise.reject({ status: 404, msg: 'Business not found!' });
      }
  
      const updateValues: string[] = [];
      const queryParams: any[] = [businessId];
  
      if (businessnameUpdate) {
        updateValues.push(`businessname = $${queryParams.length + 1}`);
        queryParams.push(businessnameUpdate);
      }
  
      if (cityUpdate) {
        updateValues.push(`city = $${queryParams.length + 1}`);
        queryParams.push(cityUpdate);
      }
  
      if (countryUpdate) {
        updateValues.push(`country = $${queryParams.length + 1}`);
        queryParams.push(countryUpdate);
      }
  
      if (postcodeUpdate) {
        updateValues.push(`postcode = $${queryParams.length + 1}`);
        queryParams.push(postcodeUpdate);
      }
  
      if (descriptionUpdate) {
        updateValues.push(`description = $${queryParams.length + 1}`);
        queryParams.push(descriptionUpdate);
      }

      if (websiteUpdate) {
        updateValues.push(`website = $${queryParams.length + 1}`);
        queryParams.push(websiteUpdate);
      }

      if (contact_numberUpdate) {
        updateValues.push(`contact_number = $${queryParams.length + 1}`);
        queryParams.push(contact_numberUpdate);
      }

      if (business_img_urlUpdate) {
        updateValues.push(`business_img_url = $${queryParams.length + 1}`);
        queryParams.push(business_img_urlUpdate);
      }
  
      const updateQuery = `UPDATE businesses SET ${updateValues.join(', ')} WHERE business_id = $1 RETURNING *;`;
      
      return db.query(updateQuery, queryParams).then(({ rows: updatedRows }: Result) => {
        return updatedRows[0];
      });
    })
    
  };