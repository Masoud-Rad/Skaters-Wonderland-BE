"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json());
const { getBusinessesReviews, getEndpoints, getUsers, getLands, getLandById, getComments, getBusinesses, getBusinessById, getPersonaltrainers, getPersonalTrainerById, getPersonalTrainersReviews, getSalesItems, getSalesItemById, postUser, postLand, postComment, postBusiness, patchLand, deleteLand, deleteComment } = require('./contrlollers/api.controllers');
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
app.post('/api/user', postUser);
app.post('/api/land', postLand);
app.post('/api/lands/:land_id/comments', postComment);
app.post(`/api/business`, postBusiness);
app.patch('/api/lands/:land_id', patchLand);
app.delete('/api/comments/:comment_id', deleteComment);
app.delete('/api/lands/:land_id', deleteLand);
app.use((error, _req, res, next) => {
    if (error.code === "22P02") {
        res.status(400).send({ msg: "invalid input syntax or type!" });
    }
    else {
        next(error);
    }
});
app.use((error, _req, res, next) => {
    if (error.code === "23503") {
        res.status(203).send({ msg: "Non-Authoritative Information!" });
    }
    else {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    res.status(error.status).send({ msg: error.msg });
});
app.all("*", (_req, res) => {
    res.status(404).send({ msg: "Not Found!" });
});
app.use((_error, _req, res, _next) => {
    res.status(500).send({ msg: "Server Error!" });
});
module.exports = app;
//# sourceMappingURL=app.js.map