"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectEndpoints } = require('../models/api.models');
const { selectUsers } = require('../models/users.models');
const { selectLands, selectSingleLand, addLand, updateLand, delLand } = require('../models/lands.models');
const { selectComments, addComment, delComment } = require('../models/comments.models');
const { selectBusinesses, selectSingleBusiness } = require('../models/businesses.models');
exports.getEndpoints = (_req, res, next) => {
    selectEndpoints().then((endpoints) => {
        res.status(200).send({ endpoints });
    })
        .catch((err) => {
        next(err);
    });
};
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
    const { city, has_rink, cost, sort_by, order_by } = req.query;
    selectLands(city, has_rink, cost, sort_by, order_by)
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
    const { votes_update, safety_rating_update, suitability_rating_update } = req.body;
    updateLand(landId, votes_update, safety_rating_update, suitability_rating_update)
        .then((updatedLand) => {
        res.status(202).send({ updatedLand });
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteLand = (req, res, next) => {
    const landId = req.params.land_id;
    delLand(landId).then(() => {
        res.status(204).send();
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
exports.deleteComment = (req, res, next) => {
    const commentId = req.params.comment_id;
    delComment(commentId).then(() => {
        res.status(204).send();
    })
        .catch((err) => {
        next(err);
    });
};
exports.getBusinesses = (_req, res, next) => {
    selectBusinesses().then((businesses) => {
        res.status(200).send({ businesses });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getBusinessById = (req, res, next) => {
    const businessId = req.params.business_id;
    selectSingleBusiness(businessId)
        .then((business) => {
        res.status(200).send({ business });
    })
        .catch((err) => {
        next(err);
    });
};
//# sourceMappingURL=api.controllers.js.map