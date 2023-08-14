"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('../db/connection');
exports.selectLands = () => {
    return db.query(`SELECT * FROM lands;`)
        .then((response) => {
        return response.rows;
    });
};
//# sourceMappingURL=lands.models.js.map