import fastify, { FastifyInstance, RouteHandlerMethod, RouteShorthandOptions } from "fastify";
import { Problem } from "../entities/Problem";

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
const getProblems = (): Problem[] => {
    var da = new Date();
    return [
        { id: 1, title: 'Two Sum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', difficulty: 'easy', url: new URL('https://leetcode.com/problems/two-sum'), topics: ["hashmap, arrays"], createdAt:  da.getDate(), subQuestions: []},
        { id: 2, title: 'Add Two Numbers', description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list', difficulty: 'medium', url: new URL("https://leetcode.com/problems/add-two-numbers"), topics: ["arrays"], createdAt:  da.getDate(), subQuestions: [] },
        { id: 3, title: 'Longest Substring Without Repeating Characters', description: 'Given a string s, find the length of the longest substring without repeating characters', difficulty: 'medium', url: new URL("https://leetcode.com/problems/longest-substring-without-repeating-characters"), topics: ["strings, arrays"], createdAt:  da.getDate(), subQuestions: [] }
    ]; 
}

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

const problemRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/problems', routeOptions, getProblemsHandler);
    fastify.get('/problem/:id', routeOptions, getProblemHandler);
}

export default problemRoutes;
