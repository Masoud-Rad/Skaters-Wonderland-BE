"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs').promises;
exports.selectEndpoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8')
        .then((data) => JSON.parse(data))
        .catch((error) => {
        return error;
    });
};
//# sourceMappingURL=api.models.js.map