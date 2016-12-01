'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
	// Directors
    {
        method: 'GET',
        path: '/api/directors/{id}',
        handler: handlers.directors.get,
		config: {
			tags: ['api'],
			description: 'Get one director by id',
			notes: 'Get one director by id',
			validate: {
				params: {
					id: Joi.number().required()
				}
			},
			cors: {
				origin: ['*']
			}
		}
    },
    {
        method: 'GET',
        path: '/api/directors',
        handler: handlers.directors.getAll,
		config: {
            tags: ['api'],
            description: 'Get all directors',
            notes: 'Get all directors',
            cors: {
                origin: ['*']
            }
        },
    },
    {
        method: 'POST',
        path: '/api/directors',
        handler: handlers.directors.create,
		config: {
            tags: ['api'],
            description: 'Add a new director',
            notes: 'Add a new director',
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    bio: Joi.string().required()
                }
            },
			auth: {
				strategy: 'jsonWebToken',
				scope: ['directorAdmin', 'siteAdmin']
			},
            cors: {
                origin: ['*']
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/directors/{id}',
        handler: handlers.directors.update,
		config: {
            tags: ['api'],
            description: 'Update a director by id',
            notes: 'Update a director by id',
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    bio: Joi.string().required()
                }
            },
			auth: {
				strategy: 'jsonWebToken',
				scope: ['directorAdmin', 'siteAdmin']
			},
            cors: {
                origin: ['*']
            }
        },
    },
    {
        method: 'DELETE',
        path: '/api/directors/{id}',
        handler: handlers.directors.delete,
		config: {
            tags: ['api'],
            description: 'Delete a director by id',
            notes: 'Delete a director by id',
            validate: {
                params: {
                    id: Joi.number().required()
                }
            },
			auth: {
				strategy: 'jsonWebToken',
				scope: ['directorAdmin', 'siteAdmin']
			},
            cors: {
                origin: ['*']
            }
        }
    }
];
