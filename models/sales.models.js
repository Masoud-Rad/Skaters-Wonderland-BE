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
exports.updateSaleItem = (itemId, itemUpdate) => {
    const { itemnameUpdate, descriptionUpdate, priceUpdate, emailUpdate, facebookUpdate, contact_numberUpdate, availabilityUpdate, gear_avatar_urlUpdate } = itemUpdate;
    return db.query(`SELECT * FROM sales WHERE item_id=$1;`, [itemId]).then(({ rows }) => {
        const item = rows[0];
        if (!item) {
            return Promise.reject({ status: 404, msg: 'Item not found!' });
        }
        const updateValues = [];
        const queryParams = [itemId];
        if (itemnameUpdate) {
            updateValues.push(`itemname = $${queryParams.length + 1}`);
            queryParams.push(itemnameUpdate);
        }
        if (descriptionUpdate) {
            updateValues.push(`description = $${queryParams.length + 1}`);
            queryParams.push(descriptionUpdate);
        }
        if (priceUpdate) {
            updateValues.push(`price = $${queryParams.length + 1}`);
            queryParams.push(priceUpdate);
        }
        if (emailUpdate) {
            updateValues.push(`email = $${queryParams.length + 1}`);
            queryParams.push(emailUpdate);
        }
        if (facebookUpdate) {
            updateValues.push(`facebook = $${queryParams.length + 1}`);
            queryParams.push(facebookUpdate);
        }
        if (contact_numberUpdate) {
            updateValues.push(`contact_number = $${queryParams.length + 1}`);
            queryParams.push(contact_numberUpdate);
        }
        if (availabilityUpdate) {
            updateValues.push(`availability = $${queryParams.length + 1}`);
            queryParams.push(availabilityUpdate);
        }
        if (gear_avatar_urlUpdate) {
            updateValues.push(`gear_avatar_url = $${queryParams.length + 1}`);
            queryParams.push(gear_avatar_urlUpdate);
        }
        const updateQuery = `UPDATE sales SET ${updateValues.join(', ')} WHERE item_id = $1 RETURNING *;`;
        return db.query(updateQuery, queryParams).then(({ rows: updatedRows }) => {
            return updatedRows[0];
        });
    });
};
exports.delSaleItem = (itemId) => {
    return db.query(`DELETE FROM sales WHERE item_id=$1 ;`, [itemId]);
};
//# sourceMappingURL=sales.models.js.map