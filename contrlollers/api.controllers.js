"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selectEndpoints = require('../models/api.models').selectEndpoints;
var selectUsers = require('../models/users.models').selectUsers;
var _a = require('../models/lands.models'), selectLands = _a.selectLands, selectSingleLand = _a.selectSingleLand, addLand = _a.addLand, updateLand = _a.updateLand, delLand = _a.delLand;
var _b = require('../models/comments.models'), selectComments = _b.selectComments, addComment = _b.addComment, delComment = _b.delComment;
var selectBusinesses = require('../models/businesses.models').selectBusinesses;
//------------------------------Api-------------------------------
exports.getEndpoints = function (_req, res, next) {
    selectEndpoints().then(function (endpoints) {
        res.status(200).send({ endpoints: endpoints });
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------Users-----------------------------
exports.getUsers = function (req, res, next) {
    var username = req.query.username;
    selectUsers(username).then(function (users) {
        res.status(200).send({ users: users });
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------Lands------------------------------
exports.getLands = function (req, res, next) {
    var _a = req.query, city = _a.city, has_rink = _a.has_rink, cost = _a.cost, sort_by = _a.sort_by, order_by = _a.order_by;
    selectLands(city, has_rink, cost, sort_by, order_by)
        .then(function (lands) {
        res.status(200).send({ "lands": lands });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.getLandById = function (req, res, next) {
    var landId = req.params.land_id;
    selectSingleLand(landId)
        .then(function (land) {
        res.status(200).send({ land: land });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postLand = function (req, res, next) {
    var newLand = req.body;
    addLand(newLand)
        .then(function (addedLand) {
        res.status(201).send({ addedLand: addedLand });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.patchLand = function (req, res, next) {
    var landId = req.params.land_id;
    var _a = req.body, votes_update = _a.votes_update, safety_rating_update = _a.safety_rating_update, suitability_rating_update = _a.suitability_rating_update;
    updateLand(landId, votes_update, safety_rating_update, suitability_rating_update)
        .then(function (updatedLand) {
        res.status(202).send({ updatedLand: updatedLand });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.deleteLand = function (req, res, next) {
    var landId = req.params.land_id;
    delLand(landId).then(function () {
        res.status(204).send();
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------Comments------------------------------
exports.getComments = function (req, res, next) {
    var landId = req.params.land_id;
    selectComments(landId)
        .then(function (comments) {
        res.status(200).send({ comments: comments });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postComment = function (req, res, next) {
    var newComment = req.body;
    var landId = req.params.land_id;
    addComment(landId, newComment)
        .then(function (addedComment) {
        res.status(201).send({ addedComment: addedComment });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.deleteComment = function (req, res, next) {
    var commentId = req.params.comment_id;
    delComment(commentId).then(function () {
        res.status(204).send();
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------Businesses------------------------------
exports.getBusinesses = function (_req, res, next) {
    selectBusinesses().then(function (businesses) {
        res.status(200).send({ businesses: businesses });
    })
        .catch(function (err) {
        next(err);
    });
};
