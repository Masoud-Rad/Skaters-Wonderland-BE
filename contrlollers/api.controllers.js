"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLands, selectSingleLand } = require('../models/lands.models');
const { selectUsers } = require('../models/users.models');
exports.getUsers = (req, res, next) => {
    const { username } = req.query;
    selectUsers(username).then((users) => {
        res.status(200).send({ users });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getLands = (_req, res, next) => {
    selectLands()
        .then((lands) => {
        res.status(200).send({ "lands": lands });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getLandById = (req, res, next) => {
    const landId = req.params.land_id;
    selectSingleLand(landId)
        .then((land) => {
        res.status(200).send({ land });
    })
        .catch((err) => {
        next(err);
    });
};
//# sourceMappingURL=api.controllers.js.map