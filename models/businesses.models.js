var db = require('../db/connection');
exports.selectBusinesses = function () {
    return db.query("SELECT * FROM businesses;")
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
exports.selectSingleBusiness = function (businessId) {
    return db.query("SELECT * FROM businesses WHERE business_id=$1;", [businessId])
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
};
exports.addBusiness = function (newBusiness) {
    var username = newBusiness.username, businessname = newBusiness.businessname, city = newBusiness.city, country = newBusiness.country, postcode = newBusiness.postcode, description = newBusiness.description, website = newBusiness.website, business_img_url = newBusiness.business_img_url, contact_number = newBusiness.contact_number;
    if (typeof newBusiness === "object" &&
        newBusiness.hasOwnProperty("businessname") &&
        newBusiness.hasOwnProperty("city") &&
        newBusiness.hasOwnProperty("country") &&
        newBusiness.hasOwnProperty("postcode") &&
        newBusiness.hasOwnProperty("description") &&
        newBusiness.hasOwnProperty("username")) {
        var queryValues = [username, businessname, city, country, postcode, description];
        var queryColumns = ['username', 'businessname', 'city', 'country', 'postcode', 'description'];
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
        var query = "INSERT INTO businesses(".concat(queryColumns.join(', '), ") VALUES (").concat(queryValues.map(function (_, index) { return "$".concat(index + 1); }).join(','), ") RETURNING *;");
        return db.query(query, queryValues)
            .then(function (_a) {
            var rows = _a.rows;
            return rows[0];
        });
    }
    else {
        return Promise.reject({ status: 400, msg: 'BAD REQUEST!' });
    }
};
exports.updateBusiness = function (businessId, businessUpdate) {
    var businessnameUpdate = businessUpdate.businessnameUpdate, cityUpdate = businessUpdate.cityUpdate, countryUpdate = businessUpdate.countryUpdate, postcodeUpdate = businessUpdate.postcodeUpdate, descriptionUpdate = businessUpdate.descriptionUpdate, websiteUpdate = businessUpdate.websiteUpdate, contact_numberUpdate = businessUpdate.contact_numberUpdate, business_img_urlUpdate = businessUpdate.business_img_urlUpdate;
    return db.query("SELECT * FROM businesses WHERE business_id=$1;", [businessId]).then(function (_a) {
        var rows = _a.rows;
        var business = rows[0];
        if (!business) {
            return Promise.reject({ status: 404, msg: 'Business not found!' });
        }
        var updateValues = [];
        var queryParams = [businessId];
        if (businessnameUpdate) {
            updateValues.push("businessname = $".concat(queryParams.length + 1));
            queryParams.push(businessnameUpdate);
        }
        if (cityUpdate) {
            updateValues.push("city = $".concat(queryParams.length + 1));
            queryParams.push(cityUpdate);
        }
        if (countryUpdate) {
            updateValues.push("country = $".concat(queryParams.length + 1));
            queryParams.push(countryUpdate);
        }
        if (postcodeUpdate) {
            updateValues.push("postcode = $".concat(queryParams.length + 1));
            queryParams.push(postcodeUpdate);
        }
        if (descriptionUpdate) {
            updateValues.push("description = $".concat(queryParams.length + 1));
            queryParams.push(descriptionUpdate);
        }
        if (websiteUpdate) {
            updateValues.push("website = $".concat(queryParams.length + 1));
            queryParams.push(websiteUpdate);
        }
        if (contact_numberUpdate) {
            updateValues.push("contact_number = $".concat(queryParams.length + 1));
            queryParams.push(contact_numberUpdate);
        }
        if (business_img_urlUpdate) {
            updateValues.push("business_img_url = $".concat(queryParams.length + 1));
            queryParams.push(business_img_urlUpdate);
        }
        var updateQuery = "UPDATE businesses SET ".concat(updateValues.join(', '), " WHERE business_id = $1 RETURNING *;");
        return db.query(updateQuery, queryParams).then(function (_a) {
            var updatedRows = _a.rows;
            return updatedRows[0];
        });
    });
};
