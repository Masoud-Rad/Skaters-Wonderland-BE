import { Request, Response, NextFunction } from 'express';

const {selectEndpoints} = require ('../models/api.models')
const { selectUsers }= require ('../models/users.models')
const {selectLands, selectSingleLand, addLand, updateLand, delLand} = require('../models/lands.models')
const {selectComments, addComment, delComment}= require('../models/comments.models')
const {selectBusinesses, selectSingleBusiness} = require ('../models/businesses.models')
const {selectBusinessesReviews} = require ('../models/businessesReviews.models')
const {selectPersonalTrainers} = require ('../models/personalTrainers.models')



//-------------------------------Types----------------------------


interface EndpointData {
  [key: string]: {
      description: string;
      queries?: string[];
      parametr?: string[];
      exampleResponse: {
          users?: UsersSample[];
          Lands?: LandSample[];
          Land?: LandSample;
          comments?: CommentSample[];
          comment?: CommentSample;
      };
  };
}

//**** usersType
interface UsersSample {
    username: string;
    name: string;
    email: string;
    password: string;
    avatar_url: string;
    location: string;
}

//**** landsType
interface LandSample {
    land_id: number;
    landname: string;
    city: string;
    country: string;
    postcode: string;
    description: string;
    created_at: Date;
    vote: number;
    safety_rating_total: number;
    safety_rating_count: number;
    safety_rating_ave: number;
    suitability_rating_total: number;
    suitability_rating_count: number;
    suitability_rating_ave: number;
    cost: string;
    is_public: boolean;
    has_rink: boolean;
    suitabile_for: string;
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

//****  businessesType
interface BusinessSample {
  business_id: number;
  username: string;
  businessname: string;
  city: string;
  country: string;
  postcode: string;
  description: string;
  created_at: Date;
  website: string;
  business_img_url: string;
}

//**** businessesReviewsType
interface BusinessesReviewsSample{
  review_id: number;
  username: string;
  business_id: number;
  body : string;
  rating: number;
  created_at: Date;
}

//**** personalTrainersType
interface PtSample{
  pt_id: number; 
  username: string; 
  ptname: string;
  city: string;
  country: string;
  postcode: string;
  description: string;
  created_at: Date;
  website: string;
  email: string;
  instagram: string;
  facebook: string;
  contact_number : string;
  avatar_url: string;
}

//------------------------------Api-------------------------------

exports.getEndpoints = (_req : Request , res : Response, next : NextFunction)=>{
  selectEndpoints().then((endpoints: EndpointData)=>{
    res.status(200).send({endpoints})
  })
  .catch((err: Error)=>{
    next(err);
  })
}

//------------------------------Users-----------------------------

exports.getUsers = (req : Request , res : Response, next : NextFunction)=>{
  const {username}= req.query;
  selectUsers(username).then((users: UsersSample[])=>{
    res.status(200).send({users})
  })
  .catch((err: Error)=>{
    next(err);
  })
}


//------------------------------Lands------------------------------


exports.getLands= (req : Request , res : Response, next : NextFunction)=>{
  const {city, has_rink, cost, sort_by, order_by} = req.query; 
  selectLands(city, has_rink, cost, sort_by, order_by)
    .then((lands: LandSample[])=>{
      res.status(200).send({"lands": lands})
    })
    .catch((err: Error)=>{
      next(err);
    })
}


exports.getLandById= (req : Request , res : Response, next : NextFunction)=>{

  const landId= req.params.land_id;

  selectSingleLand(landId)
  .then((land: LandSample)=>{
    res.status(200).send({land})
  })
  .catch((err: Error)=>{
    next(err);
  })
}

exports.postLand =(req : Request , res : Response, next : NextFunction)=>{
  const newLand= req.body;
  
  addLand(newLand)
  .then((addedLand: LandSample)=>{
    res.status(201).send({addedLand})
  })
  .catch((err: Error)=>{
    next(err);
  })
} 

exports.patchLand= (req : Request , res : Response, next : NextFunction)=>{
  const landId = req.params.land_id;
  
  const {votes_update, safety_rating_update, suitability_rating_update } = req.body; 

  updateLand(landId, votes_update, safety_rating_update, suitability_rating_update)
  .then((updatedLand: LandSample)=>{
    res.status(202).send({updatedLand})
  })
  .catch((err: Error)=>{
    next(err);
  })
}

exports.deleteLand= (req : Request , res : Response, next : NextFunction)=>{
  const landId = req.params.land_id

  delLand(landId).then(()=>{
    res.status(204).send();
  })
  .catch((err: Error)=>{
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
  .catch((err: Error)=>{
    next(err);
  })
}

exports.postComment=(req : Request , res : Response, next : NextFunction)=>{
  const newComment= req.body;
  const landId = req.params.land_id;
  
  addComment(landId, newComment)
  .then((addedComment: CommentSample)=>{
    res.status(201).send({addedComment})
  })
  .catch((err: Error)=>{
    next(err);
  })
}

exports.deleteComment= (req : Request , res : Response, next : NextFunction)=>{
  const commentId = req.params.comment_id

  delComment(commentId).then(()=>{
    res.status(204).send();
  })
  .catch((err: Error)=>{
    next(err);
  })
}

//------------------------------Businesses------------------------------

exports.getBusinesses = (_req: Request, res: Response, next: NextFunction)=>{

  selectBusinesses().then((businesses: BusinessSample[])=>{
    res.status(200).send({businesses})
  })
  .catch((err: Error)=>{
    next(err);
  })
}

exports.getBusinessById = (req: Request, res: Response, next: NextFunction)=>{

  const businessId = req.params.business_id;
  
  selectSingleBusiness(businessId)
  .then((business: BusinessSample)=>{
    res.status(200).send({business})
  })
  .catch((err: Error)=>{
    next(err);
  })
}

//------------------------------BusinessesReviews------------------------------

exports.getBusinessesReviews = (req: Request, res: Response, next: NextFunction)=>{

  const businessId = req.params.business_id;

  selectBusinessesReviews(businessId).then((businessesReviews: BusinessesReviewsSample[])=>{
    res.status(200).send({businessesReviews})
  })
  .catch((err: Error)=>{
    next(err);
  })
}

//------------------------------Personaltrainers------------------------------

exports.getPersonaltrainers = (_req: Request, res: Response, next: NextFunction)=>{
  selectPersonalTrainers().then((personalTrainers: PtSample[])=>{
    res.status(200).send({personalTrainers})
  })
  .catch((err:Error)=>{
    next(err);
  })
}