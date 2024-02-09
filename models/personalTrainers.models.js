"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectPersonalTrainers = () => {
    return db.query(`SELECT * FROM personaltrainers`)
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows;
        }
    });
};
exports.selectSinglePersonalTrainer = (pt_id) => {
    return db.query(`SELECT * FROM personaltrainers WHERE pt_id=$1`, [pt_id])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return rows[0];
        }
    });
};
exports.addPt = (newPt) => {
    const { username, ptname, city, country, postcode, description, website, email, instagram, facebook, contact_number, avatar_url } = newPt;
    if (typeof newPt === "object" && ptname && city && country && postcode && description && email && username) {
        const queryValues = [username, ptname, city, country, postcode, description, email];
        const queryColumns = ['username', 'ptname', 'city', 'country', 'postcode', 'description', 'email'];
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
        const query = `INSERT INTO personaltrainers(${queryColumns.join(', ')}) VALUES (${queryValues.map((_, index) => `$${index + 1}`).join(',')}) RETURNING *;`;
        return db.query(query, queryValues)
            .then(({ rows }) => rows[0]);
    }
    else {
        return Promise.reject({ status: 400, msg: 'BAD REQUEST!' });
    }
};
exports.updatePt = (ptId, ptUpdate) => {
    const { ptnameUpdate, cityUpdate, countryUpdate, postcodeUpdate, descriptionUpdate, websiteUpdate, emailUpdate, instagramUpdate, facebookUpdate, contact_numberUpdate, avatar_urlUpdate } = ptUpdate;
    return db.query(`SELECT * FROM personaltrainers WHERE pt_id=$1;`, [ptId]).then(({ rows }) => {
        const pt = rows[0];
        if (!pt) {
            return Promise.reject({ status: 404, msg: 'PT not found!' });
        }
        const updateValues = [];
        const queryParams = [ptId];
        if (ptnameUpdate) {
            updateValues.push(`ptname = $${queryParams.length + 1}`);
            queryParams.push(ptnameUpdate);
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
        if (emailUpdate) {
            updateValues.push(`email = $${queryParams.length + 1}`);
            queryParams.push(emailUpdate);
        }
        if (instagramUpdate) {
            updateValues.push(`instagram = $${queryParams.length + 1}`);
            queryParams.push(instagramUpdate);
        }
        if (facebookUpdate) {
            updateValues.push(`facebook = $${queryParams.length + 1}`);
            queryParams.push(facebookUpdate);
        }
        if (contact_numberUpdate) {
            updateValues.push(`contact_number = $${queryParams.length + 1}`);
            queryParams.push(contact_numberUpdate);
        }
        if (avatar_urlUpdate) {
            updateValues.push(`avatar_url = $${queryParams.length + 1}`);
            queryParams.push(avatar_urlUpdate);
        }
        const updateQuery = `UPDATE personaltrainers SET ${updateValues.join(', ')} WHERE pt_id = $1 RETURNING *;`;
        return db.query(updateQuery, queryParams).then(({ rows: updatedRows }) => {
            return updatedRows[0];
        });
    });
};
exports.delPt = (ptId) => db.query(`DELETE FROM ptsreview WHERE pt_id=$1 ;`, [ptId])
    .then(() => db.query(`DELETE FROM personaltrainers WHERE pt_id=$1 ;`, [ptId]));
//# sourceMappingURL=personalTrainers.models.js.map