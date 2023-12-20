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
