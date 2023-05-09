"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_PG_HOST,
    port: parseInt(process.env.DB_PG_PORT),
    username: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_DATABASE,
    entities: [__dirname + './../**/*.entity.{js,ts}'],
    synchronize: true,
};
//# sourceMappingURL=typeOrm.config.js.map