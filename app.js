"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.json());
var _a = require('./contrlollers/api.controllers'), getBusinessesReviews = _a.getBusinessesReviews, getEndpoints = _a.getEndpoints, getUsers = _a.getUsers, getLands = _a.getLands, getLandById = _a.getLandById, getComments = _a.getComments, getBusinesses = _a.getBusinesses, getBusinessById = _a.getBusinessById, getPersonaltrainers = _a.getPersonaltrainers, getPersonalTrainerById = _a.getPersonalTrainerById, getPersonalTrainersReviews = _a.getPersonalTrainersReviews, getSalesItems = _a.getSalesItems, getSalesItemById = _a.getSalesItemById, postUser = _a.postUser, postLand = _a.postLand, postComment = _a.postComment, postBusiness = _a.postBusiness, postBusinessReview = _a.postBusinessReview, postPersonalTrainer = _a.postPersonalTrainer, postPtReview = _a.postPtReview, patchLand = _a.patchLand, deleteLand = _a.deleteLand, deleteComment = _a.deleteComment;
//----------------------------------------------Get-------------------------------------------------
app.get('/api/getEndpoints', getEndpoints);
app.get('/api/users', getUsers);
app.get('/api/lands', getLands);
app.get('/api/lands/:land_id', getLandById);
app.get('/api/lands/:land_id/comments', getComments);
app.get('/api/businesses', getBusinesses);
app.get('/api/businesses/:business_id', getBusinessById);
app.get('/api/businesses/:business_id/businessesreviews', getBusinessesReviews);
app.get('/api/personaltrainers', getPersonaltrainers);
app.get('/api/personaltrainers/:pt_id', getPersonalTrainerById);
app.get('/api/personaltrainers/:pt_id/ptreviews', getPersonalTrainersReviews);
app.get('/api/sales', getSalesItems);
app.get('/api/sales/:item_id', getSalesItemById);
//----------------------------------------------Post-------------------------------------------------
app.post('/api/user', postUser);
app.post('/api/land', postLand);
app.post('/api/lands/:land_id/comments', postComment);
app.post("/api/business", postBusiness);
app.post('/api/businesses/:business_id/businessreview', postBusinessReview);
app.post('/api/personaltrainer', postPersonalTrainer);
app.post('/api/personaltrainers/:pt_id/ptreview', postPtReview);
//----------------------------------------------Patch-------------------------------------------------
app.patch('/api/lands/:land_id', patchLand);
//----------------------------------------------Delete-------------------------------------------------
app.delete('/api/comments/:comment_id', deleteComment);
app.delete('/api/lands/:land_id', deleteLand);
//-----------------------------------------------ERROR HANDELING--------------------------------------
app.use(function (error, _req, res, next) {
    if (error.code === "22P02") {
        res.status(400).send({ msg: "invalid input syntax or type!" });
    }
    else {
        next(error);
    }
});
app.use(function (error, _req, res, next) {
    if (error.code === "23503") {
        res.status(203).send({ msg: "Non-Authoritative Information!" });
    }
    else {
        next(error);
    }
});
app.use(function (error, _req, res, _next) {
    res.status(error.status).send({ msg: error.msg });
});
app.all("*", function (_req, res) {
    res.status(404).send({ msg: "Not Found!" });
});
app.use(function (_error, _req, res, _next) {
    res.status(500).send({ msg: "Server Error!" });
});
//--------------------------------------------------------------------------------------------------
module.exports = app;
