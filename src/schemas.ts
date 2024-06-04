export const addProblem = {
    body: {
        type: 'object',
        required: ['title', 'num', 'description', 'difficulty', 'url'],
        properties: {
            title: {type: 'string',},
            num: {type: 'number'},
            description: {type: 'string'},
            difficulty: {type: 'string'},
            url: {type: 'string'},
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                created: {type: 'boolean'}
            }
        }
    }

}

