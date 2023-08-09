"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`,
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error('PGDATABASE not set');
}
const config = {};
module.exports = new Pool(config);
//# sourceMappingURL=connection.js.map