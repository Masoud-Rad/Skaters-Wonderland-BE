"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json());
const { getBusinessesReviews, getEndpoints, getUsers, getLands, getLandById, getComments, postLand, postComment, patchLand, deleteLand, deleteComment, getBusinesses, getBusinessById } = require('./contrlollers/api.controllers');
app.get('/api/getEndpoints', getEndpoints);
app.get('/api/users', getUsers);
app.get('/api/lands', getLands);
app.get('/api/lands/:land_id', getLandById);
app.get('/api/lands/:land_id/comments', getComments);
app.get('/api/businesses', getBusinesses);
app.get('/api/businesses/:business_id', getBusinessById);
app.get('/api/businesses/:business_id/businessesreviews', getBusinessesReviews);
app.post('/api/land', postLand);
app.post('/api/lands/:land_id/comments', postComment);
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