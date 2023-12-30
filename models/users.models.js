var db = require('../db/connection');
exports.selectUsers = function (userName) {
    if (!userName) {
        return db.query("SELECT * FROM users;")
            .then(function (_a) {
            var rows = _a.rows;
            return rows;
        });
    }
    else {
        return db.query("SELECT * FROM users WHERE username=$1;", [userName])
            .then(function (_a) {
            var rows = _a.rows;
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found!' });
            }
            else {
                return rows;
            }
        });
    }
};
exports.addUser = function (newUser) {
    var username = newUser.username, name = newUser.name, email = newUser.email, password = newUser.password;
    if (typeof newUser === "object" &&
        newUser.hasOwnProperty("username") &&
        newUser.hasOwnProperty("name") &&
        newUser.hasOwnProperty("email") &&
        newUser.hasOwnProperty("password")) {
        return db.query("SELECT * FROM users WHERE username=$1;", [username])
            .then(function (_a) {
            var rows = _a.rows;
            if (rows.length != 0) {
                return Promise.reject({ status: 409, msg: 'The username is already taken! Choose a different username please.' });
            }
            else {
                return db.query("SELECT * FROM users WHERE email=$1;", [email])
                    .then(function (_a) {
                    var rows = _a.rows;
                    if (rows.length != 0) {
                        return Promise.reject({ status: 409, msg: "Email address already in use! Choose a different email or LOG_IN." });
                    }
                    else {
                        return db.query("INSERT INTO users(username, name, email, password) VALUES ($1,$2,$3,$4) RETURNING *;", [username, name, email, password])
                            .then(function (_a) {
                            var rows = _a.rows;
                            return rows[0];
                        });
                    }
                });
            }
        });
    }
    else {
        return Promise.reject({ status: 400, msg: "BAD REQUEST!" });
    }
};
exports.updateUser = function (username, userUpdate) {
    var nameUpdate = userUpdate.nameUpdate, emailUpdate = userUpdate.emailUpdate, passwordUpdate = userUpdate.passwordUpdate, avatar_urlUpdate = userUpdate.avatar_urlUpdate, locationUpdate = userUpdate.locationUpdate;
    return db.query("SELECT * FROM users WHERE username=$1;", [username]).then(function (_a) {
        var rows = _a.rows;
        var user = rows[0];
        if (!user) {
            return Promise.reject({ status: 404, msg: 'User not found!' });
        }
        var updateValues = [];
        var queryParams = [username];
        if (nameUpdate) {
            updateValues.push("name = $".concat(queryParams.length + 1));
            queryParams.push(nameUpdate);
        }
        if (emailUpdate) {
            updateValues.push("email = $".concat(queryParams.length + 1));
            queryParams.push(emailUpdate);
        }
        if (passwordUpdate) {
            updateValues.push("password = $".concat(queryParams.length + 1));
            queryParams.push(passwordUpdate);
        }
        if (avatar_urlUpdate) {
            updateValues.push("avatar_url = $".concat(queryParams.length + 1));
            queryParams.push(avatar_urlUpdate);
        }
        if (locationUpdate) {
            updateValues.push("location = $".concat(queryParams.length + 1));
            queryParams.push(locationUpdate);
        }
        var updateQuery = "UPDATE users SET ".concat(updateValues.join(', '), " WHERE username = $1 RETURNING *;");
        return db.query(updateQuery, queryParams).then(function (_a) {
            var updatedRows = _a.rows;
            return updatedRows[0];
        });
    });
};
exports.delUser = function (userName) {
    return db.query('DELETE FROM sales WHERE username = $1 ;', [userName])
        .then(function () {
        return db.query('DELETE FROM ptsreview WHERE username = $1;', [userName]);
    })
        // Before deleting a PT we should delete all of Pt's reviews (All reviews have been posted for that PT)
        .then(function () {
        //First we should find pt_id
        return db.query("SELECT * FROM personaltrainers WHERE username = $1;", [userName]);
    })
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length !== 0) {
            var ptID = rows[0].pt_id;
            return db.query('DELETE FROM ptsreview WHERE pt_id = $1;', [ptID]);
        }
    })
        .then(function () { return db.query('DELETE FROM personaltrainers WHERE username = $1 ;', [userName]); })
        .then(function () { return db.query('DELETE FROM businessesreview WHERE username = $1;', [userName]); })
        // Before deleting a business we should delete all of businesses's reviews 
        .then(function () {
        //we should find business_id
        return db.query("SELECT * FROM businesses WHERE username = $1;", [userName]);
    })
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length !== 0) {
            var businessId = rows[0].business_id;
            return db.query('DELETE FROM businessesreview WHERE business_id = $1;', [businessId]);
        }
    })
        .then(function () { return db.query('DELETE FROM businesses WHERE username = $1 ;', [userName]); })
        .then(function () { return db.query('DELETE FROM comments WHERE username = $1;', [userName]); })
        // Before deleting a land we should delete all of land's reviews 
        .then(function () {
        //we should find land_id
        return db.query("SELECT * FROM lands WHERE username = $1;", [userName]);
    })
        .then(function (_a) {
        var rows = _a.rows;
        if (rows.length !== 0) {
            var landId = rows[0].land_id;
            return db.query('DELETE FROM comments WHERE land_id = $1;', [landId]);
        }
    })
        .then(function () { return db.query('DELETE FROM lands WHERE username = $1 ;', [userName]); })
        .then(function () { return db.query('DELETE FROM users WHERE username = $1 ;', [userName]); });
};
