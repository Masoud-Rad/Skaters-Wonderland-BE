"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectLands, selectSingleLand, addLand, updateLand } = require('../models/lands.models');
const { selectUsers } = require('../models/users.models');
const { selectComments, addComment } = require('../models/comment.models');
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
    const { city, sort_by, order_by } = req.query;
    selectLands(city, sort_by, order_by)
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
exports.postLand = (req, res, next) => {
    const newLand = req.body;
    addLand(newLand)
        .then((addedLand) => {
        res.status(201).send({ addedLand });
    })
        .catch((err) => {
        next(err);
    });
};
exports.patchLand = (req, res, next) => {
    const landId = req.params.land_id;
    const votesUpdate = req.body.inc_votes;
    updateLand(landId, votesUpdate)
        .then((updatedLand) => {
        res.status(202).send({ updatedLand });
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
exports.postComment = (req, res, next) => {
    const newComment = req.body;
    const landId = req.params.land_id;
    addComment(landId, newComment)
        .then((addedComment) => {
        res.status(201).send({ addedComment });
    })
        .catch((err) => {
        next(err);
    });
};
//# sourceMappingURL=api.controllers.js.map