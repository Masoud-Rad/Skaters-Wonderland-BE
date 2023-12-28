import { Request, Response, NextFunction } from 'express';
//I tried to use "import createError from 'http-errors'" but I hade this error: " This module is declared with 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.", so I used the following method to requier createError; 
import * as createError from 'http-errors'; // Import the Error type

const express = require("express");
const app = express();
app.use(express.json());

const {getBusinessesReviews, getEndpoints, getUsers, getLands, getLandById, getComments, getBusinesses, getBusinessById, getPersonaltrainers, getPersonalTrainerById, getPersonalTrainersReviews, getSalesItems, getSalesItemById, postUser, postLand, postComment, postBusiness, postBusinessReview, postPersonalTrainer, postPtReview, postSaleItem, patchUser, patchLand, patchBusiness, patchPersonalTrainer, deleteLand, deleteComment} = require('./contrlollers/api.controllers')

//----------------------------------------------Get-------------------------------------------------
app.get('/api/getEndpoints', getEndpoints)

app.get('/api/users', getUsers);

app.get('/api/lands', getLands);
app.get('/api/lands/:land_id', getLandById);

app.get('/api/lands/:land_id/comments', getComments);

app.get('/api/businesses', getBusinesses)
app.get('/api/businesses/:business_id', getBusinessById)


app.get('/api/businesses/:business_id/businessesreviews', getBusinessesReviews)

app.get('/api/personaltrainers', getPersonaltrainers)
app.get('/api/personaltrainers/:pt_id', getPersonalTrainerById)

app.get('/api/personaltrainers/:pt_id/ptreviews', getPersonalTrainersReviews)

app.get('/api/sales',getSalesItems)
app.get('/api/sales/:item_id',getSalesItemById)
//----------------------------------------------Post-------------------------------------------------

app.post('/api/user', postUser)

app.post('/api/land', postLand)

app.post('/api/lands/:land_id/comments', postComment);

app.post(`/api/business`, postBusiness)

app.post('/api/businesses/:business_id/businessreview', postBusinessReview)

app.post('/api/personaltrainer', postPersonalTrainer)

app.post('/api/personaltrainers/:pt_id/ptreview', postPtReview)

app.post('/api/saleItem', postSaleItem)

//----------------------------------------------Patch-------------------------------------------------

app.patch('/api/users',patchUser)

app.patch('/api/lands/:land_id', patchLand)

app.patch('/api/businesses/:business_id', patchBusiness)

app.patch('/api/personaltrainers/:pt_id', patchPersonalTrainer)

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