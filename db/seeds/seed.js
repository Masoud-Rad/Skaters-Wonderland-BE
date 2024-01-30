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
function seed(salesData, ptsreviewData, personaltrainersData, businessesreviewData, businessesData, landData, commentData, userData) {
    return __awaiter(this, void 0, void 0, function () {
        var insertUsersQueryStr, insertLandsQueryStr, result, formatedCommentsData, insertCommentsQueryStr, insertBusinessesQueryStr, insertBusinessesreviewQueryStr, insertPersonaltrainersQueryStr, insertPtsreviewQueryStr, insertSalesQueryStr, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 25, , 26]);
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS sales;")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS ptsreview;")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS personaltrainers;")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS businessesreview;")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS businesses;")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS comments;")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS lands;")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, db.query("DROP TABLE IF EXISTS users;")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, db.query("CREATE TABLE users (\n            username VARCHAR PRIMARY KEY,\n            name VARCHAR NOT NULL,\n            avatar_url VARCHAR  DEFAULT 'https://vectorified.com/images/unknown-avatar-icon-7.jpg',\n            email VARCHAR NOT NULL,\n            password VARCHAR NOT NULL,\n            location VARCHAR\n        );")];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE lands(\n            land_id SERIAL PRIMARY KEY,\n            landname VARCHAR NOT NULL,\n            city VARCHAR NOT NULL,\n            country VARCHAR NOT NULL,\n            postcode  VARCHAR NOT NULL,\n            description VARCHAR NOT NULL,\n            created_at TIMESTAMP DEFAULT NOW(),\n            vote INT DEFAULT 0,\n            safety_rating_total INT DEFAULT 0,\n            safety_rating_count INT DEFAULT 0,\n            safety_rating_ave NUMERIC GENERATED ALWAYS AS (\n                CASE\n                  WHEN safety_rating_count > 0 THEN (safety_rating_total::NUMERIC / safety_rating_count)::NUMERIC(10, 2)\n                  ELSE 0\n                END\n            ) STORED,\n            suitability_rating_total INT DEFAULT 0,\n            suitability_rating_count INT DEFAULT 0,\n            suitability_rating_ave NUMERIC GENERATED ALWAYS AS (\n                CASE\n                  WHEN suitability_rating_count > 0 THEN (suitability_rating_total::NUMERIC / suitability_rating_count)::NUMERIC(10, 2)\n                  ELSE 0\n                END\n            ) STORED,\n            cost VARCHAR NOT NULL,\n            is_public BOOL NOT NULL,\n            has_rink BOOL NOT NULL,\n            suitabile_for VARCHAR NOT NULL,\n            land_img_url VARCHAR DEFAULT './images/defaultWL.avif',\n            username VARCHAR REFERENCES users(username) NOT NULL\n            );\n        ")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE comments (\n            comment_id SERIAL PRIMARY KEY,\n            body VARCHAR NOT NULL,\n            land_id INTEGER REFERENCES lands(land_id) NOT NULL,\n            username VARCHAR REFERENCES users(username) NOT NULL,\n            created_at TIMESTAMP DEFAULT NOW()\n            );\n        ")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE businesses (\n                business_id SERIAL PRIMARY KEY, \n                username VARCHAR REFERENCES users(username) NOT NULL,\n                businessname VARCHAR NOT NULL,\n                city VARCHAR NOT NULL,\n                country VARCHAR NOT NULL,\n                postcode  VARCHAR NOT NULL,\n                description VARCHAR NOT NULL,\n                created_at TIMESTAMP DEFAULT NOW(),\n                website VARCHAR,\n                business_img_url VARCHAR DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzc33XS9klYYR7JzdNkT2ryvg22j79wh4rxfIJciN-WQ&s',\n                contact_number VARCHAR\n            );\n        ")];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE businessesreview (\n                review_id SERIAL PRIMARY KEY,\n                username VARCHAR REFERENCES users(username) NOT NULL,\n                business_id INTEGER REFERENCES businesses(business_id) NOT NULL,\n                body VARCHAR NOT NULL,\n                rating INT DEFAULT 0,\n                created_at TIMESTAMP DEFAULT NOW()\n            );\n        ")];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n                CREATE TABLE personaltrainers(\n                    pt_id SERIAL PRIMARY KEY,\n                    username VARCHAR REFERENCES users(username) NOT NULL,\n                    ptname VARCHAR NOT NULL,\n                    city VARCHAR NOT NULL,\n                    country VARCHAR NOT NULL,\n                    postcode VARCHAR NOT NULL,\n                    description VARCHAR NOT NULL,\n                    created_at TIMESTAMP DEFAULT NOW(),\n                    website VARCHAR,\n                    email VARCHAR NOT NULL,\n                    instagram VARCHAR,\n                    facebook VARCHAR,\n                    contact_number VARCHAR,\n                    avatar_url VARCHAR DEFAULT 'https://vectorified.com/images/unknown-avatar-icon-7.jpg'\n                );\n        ")];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE ptsreview (\n                review_id SERIAL PRIMARY KEY,\n                username VARCHAR REFERENCES users(username) NOT NULL,\n                pt_id INTEGER REFERENCES personaltrainers(pt_id) NOT NULL,\n                body VARCHAR NOT NULL,\n                rating INT DEFAULT 0,\n                created_at TIMESTAMP DEFAULT NOW()\n            );\n        ")];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, db.query("\n            CREATE TABLE sales (\n                item_id SERIAL PRIMARY KEY,\n                username VARCHAR REFERENCES users(username) NOT NULL,\n                itemname VARCHAR NOT NULL,\n                description VARCHAR NOT NULL,\n                price VARCHAR NOT NULL,\n                city VARCHAR NOT NULL,\n                country VARCHAR NOT NULL,\n                created_at TIMESTAMP DEFAULT NOW(),\n                email VARCHAR NOT NULL,\n                facebook VARCHAR,\n                contact_number VARCHAR,\n                availability VARCHAR NOT NULL,\n                gear_avatar_url VARCHAR  DEFAULT 'http://rlv.zcache.com/az_sunset_series_by_unknown_skateboards-r339c69a8681444aeb08080977bf89165_xw0k0_8byvr_324.jpg'\n            );\n        ")];
                case 16:
                    _a.sent();
                    insertUsersQueryStr = format("INSERT INTO users (username, name, avatar_url, email, password, location) VALUES %L;", userData.map(function (_a) {
                        var username = _a.username, name = _a.name, avatar_url = _a.avatar_url, email = _a.email, password = _a.password, location = _a.location;
                        return [username, name, avatar_url, email, password, location];
                    }));
                    return [4 /*yield*/, db.query(insertUsersQueryStr)];
                case 17:
                    _a.sent();
                    insertLandsQueryStr = format("INSERT INTO lands (landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username) VALUES %L RETURNING *;", landData.map(function (_a) {
                        var landname = _a.landname, city = _a.city, country = _a.country, postcode = _a.postcode, description = _a.description, vote = _a.vote, safety_rating_total = _a.safety_rating_total, safety_rating_count = _a.safety_rating_count, suitability_rating_total = _a.suitability_rating_total, suitability_rating_count = _a.suitability_rating_count, cost = _a.cost, is_public = _a.is_public, has_rink = _a.has_rink, created_at = _a.created_at, suitabile_for = _a.suitabile_for, land_img_url = _a.land_img_url, username = _a.username;
                        return [landname, city, country, postcode, description, vote, safety_rating_total, safety_rating_count, suitability_rating_total, suitability_rating_count, cost, is_public, has_rink, created_at, suitabile_for, land_img_url, username];
                    }));
                    return [4 /*yield*/, db.query(insertLandsQueryStr)];
                case 18:
                    result = _a.sent();
                    formatedCommentsData = formatComments(commentData, result.rows);
                    insertCommentsQueryStr = format("INSERT INTO comments (body, land_id, username, created_at) VALUES %L;", formatedCommentsData.map(function (formatedComment) { return [formatedComment.body, formatedComment.land_id, formatedComment.username, formatedComment.created_at]; }));
                    return [4 /*yield*/, db.query(insertCommentsQueryStr)];
                case 19:
                    _a.sent();
                    insertBusinessesQueryStr = format("INSERT INTO businesses (username, businessname, city, country, postcode, description, created_at, website, business_img_url, contact_number) VALUES %L;", businessesData.map(function (_a) {
                        var username = _a.username, businessname = _a.businessname, city = _a.city, country = _a.country, postcode = _a.postcode, description = _a.description, created_at = _a.created_at, website = _a.website, business_img_url = _a.business_img_url, contact_number = _a.contact_number;
                        return [username, businessname, city, country, postcode, description, created_at, website, business_img_url, contact_number];
                    }));
                    return [4 /*yield*/, db.query(insertBusinessesQueryStr)];
                case 20:
                    _a.sent();
                    insertBusinessesreviewQueryStr = format("INSERT INTO businessesreview (username, business_id, body, rating, created_at) VALUES %L;", businessesreviewData.map(function (_a) {
                        var username = _a.username, business_id = _a.business_id, body = _a.body, rating = _a.rating, created_at = _a.created_at;
                        return [username, business_id, body, rating, created_at];
                    }));
                    return [4 /*yield*/, db.query(insertBusinessesreviewQueryStr)];
                case 21:
                    _a.sent();
                    insertPersonaltrainersQueryStr = format("INSERT INTO personaltrainers (username, ptname, city, country, postcode, description, created_at, website, email, instagram, facebook, contact_number, avatar_url) VALUES %L;", personaltrainersData.map(function (_a) {
                        var username = _a.username, ptname = _a.ptname, city = _a.city, country = _a.country, postcode = _a.postcode, description = _a.description, created_at = _a.created_at, website = _a.website, email = _a.email, instagram = _a.instagram, facebook = _a.facebook, contact_number = _a.contact_number, avatar_url = _a.avatar_url;
                        return [username, ptname, city, country, postcode, description, created_at, website, email, instagram, facebook, contact_number, avatar_url];
                    }));
                    return [4 /*yield*/, db.query(insertPersonaltrainersQueryStr)];
                case 22:
                    _a.sent();
                    insertPtsreviewQueryStr = format("INSERT INTO ptsreview (username, pt_id, body, rating, created_at) VALUES %L;", ptsreviewData.map(function (_a) {
                        var username = _a.username, pt_id = _a.pt_id, body = _a.body, rating = _a.rating, created_at = _a.created_at;
                        return [username, pt_id, body, rating, created_at];
                    }));
                    return [4 /*yield*/, db.query(insertPtsreviewQueryStr)];
                case 23:
                    _a.sent();
                    insertSalesQueryStr = format("INSERT INTO sales (username, itemname, description, price, city, country, created_at, email, facebook, contact_number, availability, gear_avatar_url) VALUES %L;", salesData.map(function (_a) {
                        var username = _a.username, itemname = _a.itemname, description = _a.description, price = _a.price, city = _a.city, country = _a.country, created_at = _a.created_at, email = _a.email, facebook = _a.facebook, contact_number = _a.contact_number, availability = _a.availability, gear_avatar_url = _a.gear_avatar_url;
                        return [username, itemname, description, price, city, country, created_at, email, facebook, contact_number, availability, gear_avatar_url];
                    }));
                    return [4 /*yield*/, db.query(insertSalesQueryStr)];
                case 24:
                    _a.sent();
                    return [3 /*break*/, 26];
                case 25:
                    error_1 = _a.sent();
                    console.error('Error executing queries:', error_1);
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/];
            }
        });
    });
}
module.exports = seed;
