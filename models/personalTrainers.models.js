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
exports.updatePt = function (ptId, ptUpdate) {
    var ptnameUpdate = ptUpdate.ptnameUpdate, cityUpdate = ptUpdate.cityUpdate, countryUpdate = ptUpdate.countryUpdate, postcodeUpdate = ptUpdate.postcodeUpdate, descriptionUpdate = ptUpdate.descriptionUpdate, websiteUpdate = ptUpdate.websiteUpdate, emailUpdate = ptUpdate.emailUpdate, instagramUpdate = ptUpdate.instagramUpdate, facebookUpdate = ptUpdate.facebookUpdate, contact_numberUpdate = ptUpdate.contact_numberUpdate, avatar_urlUpdate = ptUpdate.avatar_urlUpdate;
    return db.query("SELECT * FROM personaltrainers WHERE pt_id=$1;", [ptId]).then(function (_a) {
        var rows = _a.rows;
        var pt = rows[0];
        if (!pt) {
            return Promise.reject({ status: 404, msg: 'PT not found!' });
        }
        var updateValues = [];
        var queryParams = [ptId];
        if (ptnameUpdate) {
            updateValues.push("ptname = $".concat(queryParams.length + 1));
            queryParams.push(ptnameUpdate);
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
        if (emailUpdate) {
            updateValues.push("email = $".concat(queryParams.length + 1));
            queryParams.push(emailUpdate);
        }
        if (instagramUpdate) {
            updateValues.push("instagram = $".concat(queryParams.length + 1));
            queryParams.push(instagramUpdate);
        }
        if (facebookUpdate) {
            updateValues.push("facebook = $".concat(queryParams.length + 1));
            queryParams.push(facebookUpdate);
        }
        if (contact_numberUpdate) {
            updateValues.push("contact_number = $".concat(queryParams.length + 1));
            queryParams.push(contact_numberUpdate);
        }
        if (avatar_urlUpdate) {
            updateValues.push("avatar_url = $".concat(queryParams.length + 1));
            queryParams.push(avatar_urlUpdate);
        }
        var updateQuery = "UPDATE personaltrainers SET ".concat(updateValues.join(', '), " WHERE pt_id = $1 RETURNING *;");
        return db.query(updateQuery, queryParams).then(function (_a) {
            var updatedRows = _a.rows;
            return updatedRows[0];
        });
    });
};
exports.delPt = function (ptId) {
    return db.query("DELETE FROM ptsreview WHERE pt_id=$1 ;", [ptId])
        .then(function () {
        return db.query("DELETE FROM personaltrainers WHERE pt_id=$1 ;", [ptId]);
    });
};
