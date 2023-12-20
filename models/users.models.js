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
// username: string;
// name: string;
// email: string;
// password: string;
