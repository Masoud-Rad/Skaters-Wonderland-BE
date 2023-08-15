import { Request, Response, NextFunction } from 'express';
const {selectLands} = require('../models/lands.models')
const { selectUsers }= require ('../models/users.models')

//-------------------------------Types----------------------------

interface UsersSample {
  username: string;
  name: string;
  avatar_url: string;
  password: string;
}

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
//------------------------------Users-----------------------------

exports.getUsers = (_req : Request , res : Response, next : NextFunction)=>{
  selectUsers().then((users: UsersSample[])=>{
    res.status(200).send({users})
  })
  .catch((err: any)=>{
    console.log("in the ctrl>getusers, err:", err);
    next(err);
  })
}

//------------------------------Land------------------------------

exports.getLands= (_req : Request , res : Response, next : NextFunction)=>{
  selectLands()
  .then((lands: LandSample[])=>{
    res.status(200).send({"lands": lands})
  })
  .catch((err: any)=>{
    console.log("in the ctrl>getLands, err:", err);
    next(err);
  })

}