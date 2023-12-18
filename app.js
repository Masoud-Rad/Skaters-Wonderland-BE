"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.json());
var _a = require('./contrlollers/api.controllers'), getBusinessesReviews = _a.getBusinessesReviews, getEndpoints = _a.getEndpoints, getUsers = _a.getUsers, getLands = _a.getLands, getLandById = _a.getLandById, getComments = _a.getComments, postLand = _a.postLand, postComment = _a.postComment, patchLand = _a.patchLand, deleteLand = _a.deleteLand, deleteComment = _a.deleteComment, getBusinesses = _a.getBusinesses, getBusinessById = _a.getBusinessById, getPersonaltrainers = _a.getPersonaltrainers, getPersonalTrainerById = _a.getPersonalTrainerById, getPersonalTrainersReviews = _a.getPersonalTrainersReviews;
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
//----------------------------------------------Post-------------------------------------------------
app.post('/api/land', postLand);
app.post('/api/lands/:land_id/comments', postComment);
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
