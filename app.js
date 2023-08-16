"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.use(express.json());
const { getUsers, getLands, getLandById, getComments, postLand, postComment, patchLand } = require('./contrlollers/api.controllers');
app.get('/api/users', getUsers);
app.get('/api/lands', getLands);
app.get('/api/lands/:land_id', getLandById);
app.get('/api/lands/:land_id/comments', getComments);
app.post('/api/land', postLand);
app.post('/api/lands/:land_id/comments', postComment);
app.patch('/api/lands/:land_id', patchLand);
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