"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selectEndpoints = require('../models/api.models').selectEndpoints;
var _a = require('../models/users.models'), selectUsers = _a.selectUsers, addUser = _a.addUser, updateUser = _a.updateUser;
var _b = require('../models/lands.models'), selectLands = _b.selectLands, selectSingleLand = _b.selectSingleLand, addLand = _b.addLand, updateLand = _b.updateLand, delLand = _b.delLand;
var _c = require('../models/comments.models'), selectComments = _c.selectComments, addComment = _c.addComment, delComment = _c.delComment;
var _d = require('../models/businesses.models'), selectBusinesses = _d.selectBusinesses, selectSingleBusiness = _d.selectSingleBusiness, addBusiness = _d.addBusiness, updateBusiness = _d.updateBusiness;
var _e = require('../models/businessesReviews.models'), selectBusinessesReviews = _e.selectBusinessesReviews, addBusinessReview = _e.addBusinessReview;
var _f = require('../models/personalTrainers.models'), selectPersonalTrainers = _f.selectPersonalTrainers, selectSinglePersonalTrainer = _f.selectSinglePersonalTrainer, addPt = _f.addPt, updatePt = _f.updatePt;
var _g = require("../models/personalTrainersReviews.models"), selectPersonalTrainersReviews = _g.selectPersonalTrainersReviews, addPtReview = _g.addPtReview;
var _h = require('../models/sales.models'), selectsalesItems = _h.selectsalesItems, selectSingleSalesItem = _h.selectSingleSalesItem, addSaleItem = _h.addSaleItem, updateSaleItem = _h.updateSaleItem;
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
exports.postUser = function (req, res, next) {
    var newUser = req.body;
    addUser(newUser)
        .then(function (addedUser) {
        res.status(201).send({ addedUser: addedUser });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.patchUser = function (req, res, next) {
    var username = req.query.username;
    var userUpdate = req.body;
    updateUser(username, userUpdate)
        .then(function (updatedUser) {
        res.status(202).send({ updatedUser: updatedUser });
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
exports.getBusinessById = function (req, res, next) {
    var businessId = req.params.business_id;
    selectSingleBusiness(businessId)
        .then(function (business) {
        res.status(200).send({ business: business });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postBusiness = function (req, res, next) {
    var newBusiness = req.body;
    addBusiness(newBusiness)
        .then(function (addedBusiness) {
        res.status(201).send({ addedBusiness: addedBusiness });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.patchBusiness = function (req, res, next) {
    var businessId = req.params.business_id;
    var businessUpdate = req.body;
    updateBusiness(businessId, businessUpdate)
        .then(function (updatedBusiness) {
        res.status(202).send({ updatedBusiness: updatedBusiness });
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------BusinessesReviews------------------------------
exports.getBusinessesReviews = function (req, res, next) {
    var businessId = req.params.business_id;
    selectBusinessesReviews(businessId).then(function (businessesReviews) {
        res.status(200).send({ businessesReviews: businessesReviews });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postBusinessReview = function (req, res, next) {
    var newBusinessReview = req.body;
    var businessId = req.params.business_id;
    addBusinessReview(businessId, newBusinessReview)
        .then(function (addedBusinessReview) {
        res.status(201).send({ addedBusinessReview: addedBusinessReview });
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------Personaltrainers------------------------------
exports.getPersonaltrainers = function (_req, res, next) {
    selectPersonalTrainers().then(function (personalTrainers) {
        res.status(200).send({ personalTrainers: personalTrainers });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.getPersonalTrainerById = function (req, res, next) {
    var pt_id = req.params.pt_id;
    selectSinglePersonalTrainer(pt_id)
        .then(function (pt) {
        res.status(200).send({ pt: pt });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postPersonalTrainer = function (req, res, next) {
    var newPt = req.body;
    addPt(newPt)
        .then(function (addedPt) {
        res.status(201).send({ addedPt: addedPt });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.patchPersonalTrainer = function (req, res, next) {
    var ptId = req.params.pt_id;
    var ptUpdate = req.body;
    updatePt(ptId, ptUpdate)
        .then(function (updatedPt) {
        res.status(202).send({ updatedPt: updatedPt });
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------PersonaltrainerReviews------------------------------
exports.getPersonalTrainersReviews = function (req, res, next) {
    var pt_id = req.params.pt_id;
    selectPersonalTrainersReviews(pt_id)
        .then(function (ptReviews) {
        res.status(200).send({ ptReviews: ptReviews });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postPtReview = function (req, res, next) {
    var newPtReview = req.body;
    var ptId = req.params.pt_id;
    addPtReview(ptId, newPtReview)
        .then(function (addedPtReview) {
        res.status(201).send({ addedPtReview: addedPtReview });
    })
        .catch(function (err) {
        next(err);
    });
};
//------------------------------sales----------------------------------
exports.getSalesItems = function (_req, res, next) {
    selectsalesItems().then(function (salesItems) {
        res.status(200).send({ salesItems: salesItems });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.getSalesItemById = function (req, res, next) {
    var item_id = req.params.item_id;
    selectSingleSalesItem(item_id)
        .then(function (item) {
        res.status(200).send({ item: item });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.postSaleItem = function (req, res, next) {
    var newSaleItem = req.body;
    addSaleItem(newSaleItem)
        .then(function (addedSaleItem) {
        res.status(201).send({ addedSaleItem: addedSaleItem });
    })
        .catch(function (err) {
        next(err);
    });
};
exports.patchSaleItem = function (req, res, next) {
    var itemId = req.params.item_id;
    var itemUpdate = req.body;
    updateSaleItem(itemId, itemUpdate)
        .then(function (updatedItem) {
        res.status(202).send({ updatedItem: updatedItem });
    })
        .catch(function (err) {
        next(err);
    });
};
