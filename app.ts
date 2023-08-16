import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors'; // Import the Error type
const express = require("express");
const app = express();
app.use(express.json());

const { getUsers, getLands, getLandById, getComments, postLand, postComment, patchLand, deleteLand, deleteComment} = require('./contrlollers/api.controllers')

//----------------------------------------------Get-------------------------------------------------

app.get('/api/users', getUsers);

app.get('/api/lands', getLands);
app.get('/api/lands/:land_id', getLandById);

app.get('/api/lands/:land_id/comments', getComments);

//----------------------------------------------Post-------------------------------------------------

app.post('/api/land', postLand)

app.post('/api/lands/:land_id/comments', postComment);

//----------------------------------------------Patch-------------------------------------------------

app.patch('/api/lands/:land_id', patchLand)

//----------------------------------------------Delete-------------------------------------------------

app.delete('/api/comments/:comment_id', deleteComment)
app.delete('/api/lands/:land_id', deleteLand)

//-----------------------------------------------ERROR HANDELING--------------------------------------

app.use((error : createError.HttpError, _req : Request , res : Response, next : NextFunction) => {
    if(error.code==="22P02")
    {
        res.status(400).send({ msg: "invalid input syntax or type!" })
    }else{
        next(error)
    }
})

app.use((error : createError.HttpError, _req : Request , res : Response, next : NextFunction) => {
    if(error.code==="23503")
    {
        res.status(203).send({ msg: "Non-Authoritative Information!" })
    }else{
        next(error)
    }
    
})

app.use((error : createError.HttpError, _req : Request , res : Response, _next : NextFunction) => {
    res.status(error.status).send({ msg: error.msg })
})

app.all("*", (_req : Request , res : Response,)=>{
    res.status(404).send({ msg: "Not Found!" })
})

app.use((_error : createError.HttpError, _req : Request , res : Response, _next : NextFunction) => {
    res.status(500).send({ msg: "Server Error!" })
})


//--------------------------------------------------------------------------------------------------

module.exports = app 