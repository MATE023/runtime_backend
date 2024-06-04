"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastifyPlugin = require('fastify-plugin');
const { Client } = require('pg');
require('dotenv').config();
const client = new Client({
    user: 'rtdbuser',
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'runtimepg'
});
function dbconnector(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("db connected succesfully");
            fastify.decorate('db', client);
        }
        catch (err) {
            console.error(err);
        }
    });
}
module.exports = fastifyPlugin(dbconnector);
