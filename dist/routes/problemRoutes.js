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
const getProblems = () => {
    var da = new Date();
    return [
        { id: 1, title: 'Two Sum', description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', difficulty: 'easy', url: new URL('https://leetcode.com/problems/two-sum'), topics: ["hashmap, arrays"], createdAt: da.getDate(), subQuestions: [] },
        { id: 2, title: 'Add Two Numbers', description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list', difficulty: 'medium', url: new URL("https://leetcode.com/problems/add-two-numbers"), topics: ["arrays"], createdAt: da.getDate(), subQuestions: [] },
        { id: 3, title: 'Longest Substring Without Repeating Characters', description: 'Given a string s, find the length of the longest substring without repeating characters', difficulty: 'medium', url: new URL("https://leetcode.com/problems/longest-substring-without-repeating-characters"), topics: ["strings, arrays"], createdAt: da.getDate(), subQuestions: [] }
    ];
};
const getProblemsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const problems = getProblems();
    return problems;
});
const getProblemHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const params = request.params;
    const problemId = params.id;
    const problem = getProblems().find((problem) => problem.id === problemId);
    return problem;
});
const problemRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.get('/problems', routeOptions, getProblemsHandler);
    fastify.get('/problem/:id', routeOptions, getProblemHandler);
});
exports.default = problemRoutes;
