import { Request, Response, NextFunction } from 'express';
const {selectLands, selectSingleLand} = require('../models/lands.models')
const { selectUsers }= require ('../models/users.models')
const {selectComments}= require('../models/comment.models')

//-------------------------------Types----------------------------

//**** usersType
interface UsersSample {
  username: string;
  name: string;
  avatar_url: string;
  password: string;
}

//**** landsType
interface LandSample {
    land_id: number;
    landName: string;
    city: string;
    country: string;
    description: string;
    created_at: Date;
    vote: number;
    land_img_url: string;
    username: string;
}

//**** commentsType
interface CommentSample{
  comment_id: number;
  body: string;
  land_id: number;
  username: string;
  created_at: Date;
}
//------------------------------Users-----------------------------

exports.getUsers = (req : Request , res : Response, next : NextFunction)=>{
  const {username}= req.query;
  selectUsers(username).then((users: UsersSample[])=>{
    res.status(200).send({users})
  })
  .catch((err: any)=>{
    next(err);
  })
}


//------------------------------Lands------------------------------

exports.getLands= (req : Request , res : Response, next : NextFunction)=>{
  const {city} = req.query; 
  selectLands(city)
    .then((lands: LandSample[])=>{
      res.status(200).send({"lands": lands})
    })
    .catch((err: any)=>{
      next(err);
    })
}


exports.getLandById= (req : Request , res : Response, next : NextFunction)=>{

  const landId= req.params.land_id;

  selectSingleLand(landId)
  .then((land: LandSample)=>{
    res.status(200).send({land})
  })
  .catch((err: any)=>{
    next(err);
  })
}

//------------------------------Comments------------------------------

exports.getComments =(req : Request , res : Response, next : NextFunction)=>{

  const landId= req.params.land_id;

  selectComments(landId)
  .then((comments: CommentSample[] )=>{
    res.status(200).send({comments})
  })
  .catch((err: any)=>{
    next(err);
  })
}