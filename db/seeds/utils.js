"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatComments = (comments, landsData) => {
    if (comments.length === 0 || landsData.length === 0)
        return [];
    return comments.map((comment) => {
        let currentLand = landsData.filter((land) => land.landname === comment.landName)[0];
        let currentCommentLandId = currentLand.land_id;
        const resultObj = {
            body: comment.body,
            land_id: currentCommentLandId,
            username: comment.username,
            created_at: comment.created_at
        };
        return resultObj;
    });
};
//# sourceMappingURL=utils.js.map