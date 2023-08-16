"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: "".concat(__dirname, "/../.env.").concat(ENV),
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error('PGDATABASE not set');
}
var config = {};
if (ENV === 'production') {
    config.connectionString = process.env.DATABASE_URL;
    config.max = 2;
}
exports.default = new pg_1.Pool(config);
