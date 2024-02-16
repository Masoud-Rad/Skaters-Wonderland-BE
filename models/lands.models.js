var db = require('../db/connection');
exports.selectLands = function (city, outputLength, sort_by, order_by) {
    if (sort_by === void 0) { sort_by = "land_id"; }
    if (order_by === void 0) { order_by = "ASC"; }
    var queryStr = "SELECT * FROM lands";
    var quertValues = [];
    if (city) {
        quertValues.push(city);
        queryStr += " WHERE city=$".concat(quertValues.length);
    }
    if (outputLength) {
        queryStr += " ORDER BY ".concat(sort_by, " ").concat(order_by, " LIMIT ").concat(outputLength, ";");
    }
    else {
        queryStr += " ORDER BY ".concat(sort_by, " ").concat(order_by, ";");
    }
    //this is an easier method but longer:
    // if(city && has_rink && cost){
    //   queryStr+=` WHERE city=$1 AND has_rink=$2 AND cost=$3 ORDER BY ${sort_by} ${order_by};`;
    //   quertValues.push(city);
    //   quertValues.push(has_rink);
    //   quertValues.push(cost);
    // }else if(city && has_rink){
    //   queryStr+=` WHERE city=$1 AND has_rink=$2 ORDER BY ${sort_by} ${order_by};`;
    //   quertValues.push(city);
    //   quertValues.push(has_rink);
    // }else if(city && cost){
    //   queryStr+=` WHERE city=$1 AND cost=$2 ORDER BY ${sort_by} ${order_by};`;
    //   quertValues.push(city);
    //   quertValues.push(cost);
    // }else if(has_rink && cost){
    //   queryStr+=` WHERE has_rink=$1 AND cost=$2 ORDER BY ${sort_by} ${order_by};`;
    //   quertValues.push(has_rink);
    //   quertValues.push(cost);
    // }else if(city){
    //   queryStr+=` WHERE city=$1 ORDER BY ${sort_by} ${order_by};`;
    //   quertValues.push(city);
    // }else  if(has_rink){
    //   queryStr+=` WHERE has_rink=$1 ORDER BY ${sort_by} ${order_by};`;
    //   quertValues.push(has_rink);
    // }else if(cost){
    //   queryStr+=` WHERE cost=$1 ORDER BY ${sort_by} ${order_by};`;
    //   quertValues.push(cost);
    // }
    return db.query(queryStr, quertValues)
        .then(function (response) {
        if (response.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        else {
            return response.rows;
        }
    });
};
exports.selectSingleLand = function (landId) {
    return db.query("SELECT * FROM lands WHERE land_id=$1;", [landId])
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found!' });
        }
        return rows[0];
    });
};
exports.addLand = function (newLand) {
    var landname = newLand.landname, city = newLand.city, country = newLand.country, postcode = newLand.postcode, description = newLand.description, land_img_url = newLand.land_img_url, username = newLand.username;
    if (typeof newLand === "object" &&
        newLand.hasOwnProperty("landname") &&
        newLand.hasOwnProperty("city") &&
        newLand.hasOwnProperty("country") &&
        newLand.hasOwnProperty("postcode") &&
        newLand.hasOwnProperty("description") &&
        newLand.hasOwnProperty("username")) {
        if (land_img_url) {
            return db.query("INSERT INTO lands(landname, city, country, postcode, description, land_img_url, username) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;", [landname, city, country, postcode, description, land_img_url, username])
                .then(function (_a) {
                var rows = _a.rows;
                return rows[0];
            });
        }
        else {
            return db.query("INSERT INTO lands (landname, city, country, postcode, description, username) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;", [landname, city, country, postcode, description, username])
                .then(function (_a) {
                var rows = _a.rows;
                return rows[0];
            });
        }
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.updateLand = function (landId, votes_update, safety_rating_update, suitability_rating_update) {
    return db.query("\n        SELECT * FROM lands WHERE land_id= $1;\n        ", [landId])
        .then(function (_a) {
        var rows = _a.rows;
        var land = rows[0];
        if (votes_update) {
            var currentVotes = land.vote;
            var updatedVotes = currentVotes + votes_update;
            return db.query("\n                              UPDATE lands\n                              SET\n                              vote= $1\n                              WHERE land_id = $2\n                              RETURNING *;\n                              ", [updatedVotes, landId]).then(function (_a) {
                var rows = _a.rows;
                return (rows[0]);
            });
        }
        if (safety_rating_update) {
            var currentSafety_rating_total = land.safety_rating_total;
            var updatedSafety_rating_total = currentSafety_rating_total + safety_rating_update;
            return db.query("\n                              UPDATE lands\n                              SET\n                              safety_rating_total= $1,\n                              safety_rating_count=$2\n                              WHERE land_id = $3\n                              RETURNING *;\n                              ", [updatedSafety_rating_total, land.safety_rating_count + 1, landId]).then(function (_a) {
                var rows = _a.rows;
                return (rows[0]);
            });
        }
        if (suitability_rating_update) {
            var currentSuitability_rating_total = land.suitability_rating_total;
            var updatedSuitability_rating_total = currentSuitability_rating_total + suitability_rating_update;
            return db.query("\n                              UPDATE lands\n                              SET\n                              Suitability_rating_total= $1,\n                              suitability_rating_count= $2\n                              WHERE land_id = $3\n                              RETURNING *;\n                              ", [updatedSuitability_rating_total, land.suitability_rating_count + 1, landId]).then(function (_a) {
                var rows = _a.rows;
                return (rows[0]);
            });
        }
    });
};
exports.delLand = function (landId) {
    //First delete related comments
    return db.query("DELETE FROM comments WHERE land_id=$1 ;", [landId]).then(function () {
        // Then delete the land
        return db.query("DELETE FROM lands WHERE land_id=$1 ;", [landId]);
    });
};
/* if we use async/await method:
exports.delLand = async (landId: string) => {
  try {
    // Delete related comments
    await db.query(`DELETE FROM comments WHERE land_id = $1 RETURNING *;`, [landId]);
    
    // Delete the land
    const result = await db.query(`DELETE FROM lands WHERE land_id = $1 RETURNING *;`, [landId]);
    console.log("Deleted land:", result.rows);
  } catch (error) {
    console.error("Error deleting land:", error);
    throw error;
  }
} */ 
