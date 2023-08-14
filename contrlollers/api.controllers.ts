import { Request, Response, NextFunction } from 'express';
const {selectLands} = require('../models/lands.models')


//-------------------------------Types----------------------------

  
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



exports.getLands= (_req : Request , res : Response, next : NextFunction)=>{
  selectLands()
  .then((lands: LandSample[])=>{
    res.status(200).send({"lands": lands})
  })
  .catch((err: any)=>{
    console.log("in the ctrl>getLands, err:", err);
    next(err)
  })

}