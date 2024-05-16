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
const routeOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            }
        }
    }
};
//place holder
const getUsers = () => {
    return [
        { id: 1, username: 'User1', email: 'user1@email.com', password: 'pass1', savedProblems: [] },
        { id: 1, username: 'User2', email: 'user2@email.com', password: 'pass2', savedProblems: [] },
        { id: 1, username: 'User3', email: 'user3@email.com', password: 'pass3', savedProblems: [] },
    ];
};
const getUsersHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const Users = getUsers();
    return Users;
});
const getUserByIDHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.params;
    const UserId = params.id;
    const User = getUsers().find((User) => User.id === UserId);
    return User;
});
const getUserByNameHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.params;
    const UserName = params.username;
    const User = getUsers().find((User) => User.username === UserName);
    return User;
});
const userRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.get('/users', routeOptions, getUsersHandler);
    fastify.get('/user/id/:id', routeOptions, getUserByIDHandler);
    fastify.get('/user/name/:username', routeOptions, getUserByNameHandler);
});
exports.default = userRoutes;
