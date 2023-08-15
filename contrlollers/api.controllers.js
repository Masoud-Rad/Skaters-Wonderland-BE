"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLands, selectSingleLand } = require('../models/lands.models');
const { selectUsers } = require('../models/users.models');
const { selectComments } = require('../models/comment.models');
exports.getUsers = (req, res, next) => {
    const { username } = req.query;
    selectUsers(username).then((users) => {
        res.status(200).send({ users });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getLands = (req, res, next) => {
    const { city } = req.query;
    selectLands(city)
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
exports.getComments = (req, res, next) => {
    const landId = req.params.land_id;
    selectComments(landId)
        .then((comments) => {
        res.status(200).send({ comments });
    })
        .catch((err) => {
        next(err);
    });
};
//# sourceMappingURL=api.controllers.js.map