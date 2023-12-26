var db = require('../db/connection');
exports.selectPersonalTrainers = function () {
    return db.query("SELECT * FROM personaltrainers")
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
exports.selectSinglePersonalTrainer = function (pt_id) {
    return db.query("SELECT * FROM personaltrainers WHERE pt_id=$1", [pt_id])
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
exports.addPt = function (newPt) {
    var username = newPt.username, ptname = newPt.ptname, city = newPt.city, country = newPt.country, postcode = newPt.postcode, description = newPt.description, website = newPt.website, email = newPt.email, instagram = newPt.instagram, facebook = newPt.facebook, contact_number = newPt.contact_number, avatar_url = newPt.avatar_url;
    if (typeof newPt === "object" && ptname && city && country && postcode && description && email && username) {
        var queryValues = [username, ptname, city, country, postcode, description, email];
        var queryColumns = ['username', 'ptname', 'city', 'country', 'postcode', 'description', 'email'];
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
        var query = "INSERT INTO personaltrainers(".concat(queryColumns.join(', '), ") VALUES (").concat(queryValues.map(function (_, index) { return "$".concat(index + 1); }).join(','), ") RETURNING *;");
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
