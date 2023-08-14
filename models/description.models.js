"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs/promises');
console.log("in the mr description.model");
exports.readEndPoints = () => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf8').then((data) => {
        const endPoints = JSON.parse(data);
        console.log("in the des model", endPoints);
        return endPoints;
    });
};
//# sourceMappingURL=description.models.js.map