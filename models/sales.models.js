var db = require('../db/connection');
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
