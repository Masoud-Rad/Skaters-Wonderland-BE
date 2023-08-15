"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLands } = require('../models/lands.models');
const { selectUsers } = require('../models/users.models');
exports.getUsers = (_req, res, next) => {
    selectUsers().then((users) => {
        res.status(200).send({ users });
    })
        .catch((err) => {
        console.log("in the ctrl>getusers, err:", err);
        next(err);
    });
};
exports.getLands = (_req, res, next) => {
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