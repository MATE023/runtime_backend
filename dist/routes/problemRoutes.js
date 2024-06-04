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
const schemas_1 = require("../schemas");
const crypto_1 = require("crypto");
//let problems: Problem[] = [
//    { id: 1, title: 'Two Sum', num: 1, description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', difficulty: 'easy', url: new URL('https://leetcode.com/problems/two-sum'), topics: ["hashmap, arrays"], createdAt:  da.getDate(), subQuestions: []},
//    { id: 2, title: 'Add Two Numbers', num: 2, description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list', difficulty: 'medium', url: new URL("https://leetcode.com/problems/add-two-numbers"), topics: ["arrays"], createdAt:  da.getDate(), subQuestions: [] },
//    { id: 3, title: 'Longest Substring Without Repeating Characters', num: 3, description: 'Given a string s, find the length of the longest substring without repeating characters', difficulty: 'medium', url: new URL("https://leetcode.com/problems/longest-substring-without-repeating-characters"), topics: ["strings, arrays"], createdAt:  da.getDate(), subQuestions: [] }
//]
/*
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

const routePostOptions: RouteShorthandOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            }
        }
    }
};
*/
//place holder
const getProblems = () => {
    var da = new Date();
    return [
        { id: 1, title: 'Two Sum', num: 1, description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', difficulty: 'easy', url: new URL('https://leetcode.com/problems/two-sum'), topics: ["hashmap, arrays"], createdAt: da.getDate(), subQuestions: [] },
        { id: 2, title: 'Add Two Numbers', num: 2, description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list', difficulty: 'medium', url: new URL("https://leetcode.com/problems/add-two-numbers"), topics: ["arrays"], createdAt: da.getDate(), subQuestions: [] },
        { id: 3, title: 'Longest Substring Without Repeating Characters', num: 3, description: 'Given a string s, find the length of the longest substring without repeating characters', difficulty: 'medium', url: new URL("https://leetcode.com/problems/longest-substring-without-repeating-characters"), topics: ["strings, arrays"], createdAt: da.getDate(), subQuestions: [] }
    ];
};
/*
const getProblemsHandler: RouteHandlerMethod = async (request, reply): Promise<Problem[] | undefined> => {
    const problems: Problem[] = getProblems();
    return problems;
}

const getProblemHandler: RouteHandlerMethod = async (request, reply): Promise<Problem | undefined> => {
    const params = request.params as { id: number};
    const problemId: number = params.id;
    const problem: Problem | undefined = getProblems().find((problem) => problem.id === problemId);
    return problem;
};

const createProblemHandler: RouteHandlerMethod = async (request: FastifyRequest<CreateProblemRequest>, reply: FastifyReply) => {
    const {title, num, description, difficulty, url, topics} = request.body
    createdAt = new Date().toISOString()
    id = uuidv4();
    subQuestions = []
    const query = {
            text: `INSERT INTO todos (id, title, description, difficulty, url, topics, "createdAt", subQuestions)
                            VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`,
            values: [id, title, num, description, difficulty, url, topics, createdAt, subQuestions],
            }
    try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            reply.code(201)
            return {created: true}
    } catch (err) {
            throw new Error(err)
    }
};


const problemRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/problems', routeOptions, getProblemsHandler);
    fastify.get('/problem/:id', routeOptions, getProblemHandler);
    fastify.post('/', {schema: addProblem}, createProblemHandler);
}
*/
const problemRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    const client = fastify.db;
    fastify.get('/problems', function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            /*reply.send({
                success: true,
                data: getProblems()
            })*/
            try {
                const { rows } = yield client.query('SELECT * FROM problems');
                console.log(rows);
                reply.send(rows);
            }
            catch (e) {
                console.log(e);
            }
        });
    });
    fastify.get('/problem/:id', function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            console.log(id);
            const problem = getProblems().find((prob) => prob.id === parseInt(id));
            if (!problem) {
                reply.status(404).send({ error: 'Problem not found' });
                return;
            }
            reply.send({
                success: true,
                data: problem
            });
        });
    });
    fastify.get('/problem/num/:num', function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { num } = request.params;
            console.log(num);
            const problem = getProblems().find((prob) => prob.num === parseInt(num));
            if (!problem) {
                reply.status(404).send({ error: 'Problem not found' });
                return;
            }
            reply.send({
                success: true,
                data: problem
            });
        });
    });
    //fastify.get('/problem/:id', routeOptions, getProblemHandler);
    //fastify.post('/', {schema: addProblem}, createProblemHandler);
    fastify.post('/', { schema: schemas_1.addProblem }, function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, num, description, difficulty, url, topics } = request.body;
            const createdAt = new Date().toISOString();
            const id = (0, crypto_1.randomUUID)();
            const subQuestions = [];
            const query = {
                text: `INSERT INTO todos (id, title, description, difficulty, url, topics, "createdAt", subQuestions)
                                VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`,
                values: [id, title, num, description, difficulty, url, topics, createdAt, subQuestions],
            };
            //client = fastify.pg.connect()
            try {
                //const {rows} = await client.query(query)
                const { rows } = yield client.query(query); // => Promise<Result>
                console.log(rows[0]);
                reply.code(201);
                return { created: true };
            }
            catch (err) {
                //throw new Error(err)
            }
        });
    });
});
exports.default = problemRoutes;
