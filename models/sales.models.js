var db = require('../db/connection');
//------------------------------------------------------------
exports.selectsalesItems = function () {
    return db.query("SELECT * FROM sales")
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
exports.selectSingleSalesItem = (function (item_id) {
    return db.query("SELECT * FROM sales WHERE item_id=$1", [item_id])
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
});
exports.addSaleItem = function (newSaleItem) {
    var username = newSaleItem.username, itemname = newSaleItem.itemname, description = newSaleItem.description, price = newSaleItem.price, city = newSaleItem.city, country = newSaleItem.country, email = newSaleItem.email, facebook = newSaleItem.facebook, contact_number = newSaleItem.contact_number, availability = newSaleItem.availability, gear_avatar_url = newSaleItem.gear_avatar_url;
    if (typeof newSaleItem === "object" && username && itemname && description && price && city && country && email && availability) {
        var queryValues = [username, itemname, description, price, city, country, email, availability];
        var queryColumns = ['username', 'itemname', 'description', 'price', 'city', 'country', 'email', 'availability'];
        if (facebook) {
            queryValues.push(facebook);
            queryColumns.push('facebook');
        }
        if (contact_number) {
            queryValues.push(contact_number);
            queryColumns.push('contact_number');
        }
        if (gear_avatar_url) {
            queryValues.push(gear_avatar_url);
            queryColumns.push('gear_avatar_url');
        }
        var query = "INSERT INTO sales(".concat(queryColumns.join(', '), ") VALUES (").concat(queryValues.map(function (_, index) { return "$".concat(index + 1); }).join(','), ") RETURNING *;");
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
exports.updateSaleItem = function (itemId, itemUpdate) {
    var itemnameUpdate = itemUpdate.itemnameUpdate, descriptionUpdate = itemUpdate.descriptionUpdate, priceUpdate = itemUpdate.priceUpdate, emailUpdate = itemUpdate.emailUpdate, facebookUpdate = itemUpdate.facebookUpdate, contact_numberUpdate = itemUpdate.contact_numberUpdate, availabilityUpdate = itemUpdate.availabilityUpdate, gear_avatar_urlUpdate = itemUpdate.gear_avatar_urlUpdate;
    return db.query("SELECT * FROM sales WHERE item_id=$1;", [itemId]).then(function (_a) {
        var rows = _a.rows;
        var item = rows[0];
        if (!item) {
            return Promise.reject({ status: 404, msg: 'Item not found!' });
        }
        var updateValues = [];
        var queryParams = [itemId];
        if (itemnameUpdate) {
            updateValues.push("itemname = $".concat(queryParams.length + 1));
            queryParams.push(itemnameUpdate);
        }
        if (descriptionUpdate) {
            updateValues.push("description = $".concat(queryParams.length + 1));
            queryParams.push(descriptionUpdate);
        }
        if (priceUpdate) {
            updateValues.push("price = $".concat(queryParams.length + 1));
            queryParams.push(priceUpdate);
        }
        if (emailUpdate) {
            updateValues.push("email = $".concat(queryParams.length + 1));
            queryParams.push(emailUpdate);
        }
        if (facebookUpdate) {
            updateValues.push("facebook = $".concat(queryParams.length + 1));
            queryParams.push(facebookUpdate);
        }
        if (contact_numberUpdate) {
            updateValues.push("contact_number = $".concat(queryParams.length + 1));
            queryParams.push(contact_numberUpdate);
        }
        if (availabilityUpdate) {
            updateValues.push("availability = $".concat(queryParams.length + 1));
            queryParams.push(availabilityUpdate);
        }
        if (gear_avatar_urlUpdate) {
            updateValues.push("gear_avatar_url = $".concat(queryParams.length + 1));
            queryParams.push(gear_avatar_urlUpdate);
        }
        var updateQuery = "UPDATE sales SET ".concat(updateValues.join(', '), " WHERE item_id = $1 RETURNING *;");
        return db.query(updateQuery, queryParams).then(function (_a) {
            var updatedRows = _a.rows;
            return updatedRows[0];
        });
    });
};
exports.delSaleItem = function (itemId) {
    return db.query("DELETE FROM sales WHERE item_id=$1 ;", [itemId]);
};
