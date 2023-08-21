var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var format = require('pg-format');
var db = require('../connection');
var formatComments = require('./utils').formatComments;
function seed(landData, commentData, userData) {
    return __awaiter(this, void 0, void 0, function () {
        var insertUsersQueryStr, insertLandsQueryStr, result, formatedCommentsData, insertCommentsQueryStr, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS comments;")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS lands;")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS users;")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.query("CREATE TABLE users (\n            username VARCHAR PRIMARY KEY,\n            name VARCHAR NOT NULL,\n            avatar_url VARCHAR,\n            email VARCHAR,\n            password VARCHAR NOT NULL,\n            location VARCHAR\n        );")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE lands(\n            land_id SERIAL PRIMARY KEY,\n            landname VARCHAR NOT NULL,\n            city VARCHAR NOT NULL,\n            country VARCHAR NOT NULL,\n            postcode  VARCHAR NOT NULL,\n            description VARCHAR NOT NULL,\n            created_at TIMESTAMP DEFAULT NOW(),\n            vote INT DEFAULT 0 NOT NULL,\n            safety_rating INT,\n            suitability_rating INT,\n            cost VARCHAR,\n            is_public BOOL,\n            has_rink BOOL,\n            suitabile_for VARCHAR NOT NULL,\n            land_img_url VARCHAR DEFAULT 'https://tse2.mm.bing.net/th?id=OIP.0G5ekV-kpF__IG0wQRRDGQHaFj&pid=Api&P=0&h=180',\n            username VARCHAR REFERENCES users(username) NOT NULL\n            );\n        ")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE comments (\n            comment_id SERIAL PRIMARY KEY,\n            body VARCHAR NOT NULL,\n            land_id INTEGER REFERENCES lands(land_id) NOT NULL,\n            username VARCHAR REFERENCES users(username) NOT NULL,\n            created_at TIMESTAMP DEFAULT NOW()\n            );\n        ")];
                case 6:
                    _a.sent();
                    insertUsersQueryStr = format("INSERT INTO users (username, name, avatar_url, email, password, location) VALUES %L;", userData.map(function (_a) {
                        var username = _a.username, name = _a.name, avatar_url = _a.avatar_url, email = _a.email, password = _a.password, location = _a.location;
                        return [username, name, avatar_url, email, password, location];
                    }));
                    return [4 /*yield*/, db.query(insertUsersQueryStr)];
                case 7:
                    _a.sent();
                    insertLandsQueryStr = format("INSERT INTO lands (landname, city, country, postcode, description, vote, safety_rating, suitability_rating, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username) VALUES %L RETURNING *;", landData.map(function (_a) {
                        var landname = _a.landname, city = _a.city, country = _a.country, postcode = _a.postcode, description = _a.description, vote = _a.vote, safety_rating = _a.safety_rating, suitability_rating = _a.suitability_rating, cost = _a.cost, is_public = _a.is_public, has_rink = _a.has_rink, created_at = _a.created_at, suitabile_for = _a.suitabile_for, land_img_url = _a.land_img_url, username = _a.username;
                        return [landname, city, country, postcode, description, vote, safety_rating, suitability_rating, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username];
                    }));
                    return [4 /*yield*/, db.query(insertLandsQueryStr)];
                case 8:
                    result = _a.sent();
                    formatedCommentsData = formatComments(commentData, result.rows);
                    insertCommentsQueryStr = format("INSERT INTO comments (body, land_id, username, created_at) VALUES %L;", formatedCommentsData.map(function (formatedComment) { return [formatedComment.body, formatedComment.land_id, formatedComment.username, formatedComment.created_at]; }));
                    return [4 /*yield*/, db.query(insertCommentsQueryStr)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _a.sent();
                    console.error('Error executing queries:', error_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
module.exports = seed;
