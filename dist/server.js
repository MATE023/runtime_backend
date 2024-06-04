"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const problemRoutes_1 = __importDefault(require("./routes/problemRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dbconnector = require('./db');
const server = (0, fastify_1.default)();
server.register(dbconnector);
server.register(problemRoutes_1.default);
server.register(userRoutes_1.default);
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
