"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectsalesItems = () => {
    return db.query(`SELECT * FROM sales`)
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
exports.selectSingleSalesItem = ((item_id) => {
    return db.query(`SELECT * FROM sales WHERE item_id=$1`, [item_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
});
exports.addSaleItem = (newSaleItem) => {
    const { username, itemname, description, price, city, country, email, facebook, contact_number, availability, gear_avatar_url } = newSaleItem;
    if (typeof newSaleItem === "object" && username && itemname && description && price && city && country && email && availability) {
        const queryValues = [username, itemname, description, price, city, country, email, availability];
        const queryColumns = ['username', 'itemname', 'description', 'price', 'city', 'country', 'email', 'availability'];
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
        const query = `INSERT INTO sales(${queryColumns.join(', ')}) VALUES (${queryValues.map((_, index) => `$${index + 1}`).join(',')}) RETURNING *;`;
        return db.query(query, queryValues)
            .then(({ rows }) => rows[0]);
    }
    else {
        return Promise.reject({ status: 400, msg: 'BAD REQUEST!' });
    }
};
//# sourceMappingURL=sales.models.js.map