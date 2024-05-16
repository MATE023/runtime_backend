import fastify, { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from "fastify";
import { User } from "../entities/User";

const routeOptions: RouteShorthandOptions = {
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
const getUsers = (): User[] => {
    return [
        { id: 1, username: 'User1', email: 'user1@email.com', password: 'pass1', savedProblems: [], attemptedProblems: [], solvedProblems: []},
        { id: 1, username: 'User2', email: 'user2@email.com', password: 'pass2', savedProblems: [], attemptedProblems: [], solvedProblems: []},
        { id: 1, username: 'User3', email: 'user3@email.com', password: 'pass3', savedProblems: [], attemptedProblems: [], solvedProblems: []},
    ]; 
}

const getUsersHandler: RouteHandlerMethod = async (request, reply): Promise<User[] | undefined> => {
    const Users: User[] = getUsers();
    return Users;
}

const getUserByIDHandler: RouteHandlerMethod = async (request, reply): Promise<User | undefined> => {
    const params = request.params as { id: number};
    const UserId: number = params.id;
    const User: User | undefined = getUsers().find((User) => User.id === UserId);
    return User;
};

const getUserByNameHandler: RouteHandlerMethod = async (request, reply): Promise<User | undefined> => {
    const params = request.params as { username: string};
    const UserName: string = params.username;
    const User: User | undefined = getUsers().find((User) => User.username === UserName);
    return User;
};


const userRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/users', routeOptions, getUsersHandler);
    fastify.get('/user/id/:id', routeOptions, getUserByIDHandler);
    fastify.get('/user/name/:username', routeOptions, getUserByNameHandler);
}

export default userRoutes;