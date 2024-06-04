import fastify, { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions, FastifyRequest, FastifyReply } from "fastify";
//const { v4: uuidv4 } = require('uuid');

import { Problem, CreateProblemRequest,  GetProblemRequestByID, GetProblemRequestByNum } from "../entities/Problem";
import { Question } from "../entities/Questions";
import { addProblem } from "../schemas"; 
import { randomUUID } from "crypto";

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
const getProblems = (): Problem[] => {
    var da = new Date();
    return [
        { id: 1, title: 'Two Sum', num: 1, description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', difficulty: 'easy', url: new URL('https://leetcode.com/problems/two-sum'), topics: ["hashmap, arrays"], createdAt:  da.getDate(), subQuestions: []},
        { id: 2, title: 'Add Two Numbers', num: 2, description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list', difficulty: 'medium', url: new URL("https://leetcode.com/problems/add-two-numbers"), topics: ["arrays"], createdAt:  da.getDate(), subQuestions: [] },
        { id: 3, title: 'Longest Substring Without Repeating Characters', num: 3, description: 'Given a string s, find the length of the longest substring without repeating characters', difficulty: 'medium', url: new URL("https://leetcode.com/problems/longest-substring-without-repeating-characters"), topics: ["strings, arrays"], createdAt:  da.getDate(), subQuestions: [] }
    ]; 
}
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
const problemRoutes = async (fastify: FastifyInstance) => {
    const client = fastify.db;
    fastify.get('/problems', async function (request:FastifyRequest, reply:FastifyReply) {
        /*reply.send({
            success: true,
            data: getProblems()
        })*/
        try { 
            const {rows} = await client.query('SELECT * FROM problems') 
            console.log(rows) 
            reply.send(rows) 
        } catch(e: unknown) { 
            console.log(e) 
        }         
    }
    );
    fastify.get('/problem/:id', async function (request:FastifyRequest<GetProblemRequestByID>, reply:FastifyReply) {
        const { id } = request.params;
        console.log(id)
        const problem: Problem | undefined = getProblems().find((prob) => prob.id === parseInt(id));
        
        if (!problem) {
            reply.status(404).send({ error: 'Problem not found' });
            return;
          }

        reply.send({
            success: true,
            data: problem
        })
    })
    
    fastify.get('/problem/num/:num', async function (request:FastifyRequest<GetProblemRequestByNum>, reply:FastifyReply) {
        const { num } = request.params;
        console.log(num)
        const problem: Problem | undefined = getProblems().find((prob) => prob.num === parseInt(num));
        
        if (!problem) {
            reply.status(404).send({ error: 'Problem not found' });
            return;
          }

        reply.send({
            success: true,
            data: problem
        })
    })
    //fastify.get('/problem/:id', routeOptions, getProblemHandler);
    //fastify.post('/', {schema: addProblem}, createProblemHandler);
    fastify.post('/', {schema: addProblem}, async function(request:FastifyRequest<CreateProblemRequest>, reply:FastifyReply) {
        const {title, num, description, difficulty, url, topics} = request.body
        const createdAt = new Date().toISOString()
        const id = randomUUID();
        const subQuestions: Question[] = []
        const query = {
                text: `INSERT INTO todos (id, title, description, difficulty, url, topics, "createdAt", subQuestions)
                                VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`,
                values: [id, title, num, description, difficulty, url, topics, createdAt, subQuestions],
                }
        //client = fastify.pg.connect()
        try {
                //const {rows} = await client.query(query)
                const {rows} = await client.query(query) // => Promise<Result>
                console.log(rows[0])
                reply.code(201)
                return {created: true}
        } catch (err) {
                //throw new Error(err)
        }
    })
}

export default problemRoutes;
