"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLands } = require('../models/lands.models');
exports.getLands = (_req, res, next) => {
    console.log("in the api ctrl");
    selectLands()
        .then((lands) => {
        res.status(200).send({ "lands": lands });
    })
        .catch((err) => {
        console.log("in the ctrl>getLands, err:", err);
        next(err);
    });
};
//# sourceMappingURL=api.controllers.js.map