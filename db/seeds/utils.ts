interface LandTemple {
    land_id: number;
    landname: string;
    city: string;
    country: string;
    description: string;
    created_at: Date;
    vote: number;
    land_img_url: string;
    username: string;
}


interface CommentTemple {
    body: string;
    landname: string;
    username: string;
    created_at: Date;
}

interface CommentResultObj {
    body: string;
    land_id: number;
    username: string;
    created_at: Date;
}



exports.formatComments = (comments : CommentTemple[], landsData: LandTemple[])=>{
   
    if(comments.length===0 || landsData.length===0) return [];

    return comments.map((comment : CommentTemple)=>{ 
        
        let currentLand : LandTemple= landsData.filter((land : LandTemple)=> land.landname === comment.landname)[0];
        
        
        let currentCommentLandId : number = currentLand.land_id;
        

        const resultObj : CommentResultObj={
                                            body: comment.body,
                                            land_id: currentCommentLandId,
                                            username: comment.username,
                                            created_at: comment.created_at
                                            };

        return resultObj;
    
    })

}

