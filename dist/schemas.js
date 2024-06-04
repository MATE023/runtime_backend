"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProblem = void 0;
exports.addProblem = {
    body: {
        type: 'object',
        required: ['title', 'num', 'description', 'difficulty', 'url'],
        properties: {
            title: { type: 'string', },
            num: { type: 'number' },
            description: { type: 'string' },
            difficulty: { type: 'string' },
            url: { type: 'string' },
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                created: { type: 'boolean' }
            }
        }
    }
};
